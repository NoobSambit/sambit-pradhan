import { NextResponse } from "next/server";

export const revalidate = 300;

const githubApiVersion = "2026-03-10";

type ContributionDay = { date: string; contributionCount: number };
// A contribution graph is read by week: retain a full 52-week window.
// The final (right-most) column therefore always contains the current week.
const displayedActivityDays = 364;

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

async function fetchLeetCodeActivity(username: string) {
  const query = `query userProfileCalendar($username: String!) {
    matchedUser(username: $username) {
      userCalendar { streak totalActiveDays submissionCalendar }
    }
  }`;

  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 900 },
    });
    if (!response.ok) return null;

    const payload = await response.json();
    const calendar = payload?.data?.matchedUser?.userCalendar;
    if (!calendar?.submissionCalendar) return null;

    const submissions = JSON.parse(calendar.submissionCalendar) as Record<
      string,
      number
    >;
    const end = new Date();
    const days = Array.from({ length: displayedActivityDays }, (_, index) => {
      const date = new Date(end);
      date.setUTCDate(end.getUTCDate() - (displayedActivityDays - 1 - index));
      const timestamp = Math.floor(date.getTime() / 1000).toString();
      return { date: toIsoDate(date), count: submissions[timestamp] ?? 0 };
    });

    return {
      days,
      streak: calendar.streak ?? 0,
      totalActiveDays: calendar.totalActiveDays ?? 0,
    };
  } catch {
    return null;
  }
}

async function fetchGitHubContributionTotal(
  token: string,
  username: string,
  createdAt: string,
  end: Date,
) {
  const query = `query ContributionTotal($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) { contributionsCollection(from: $from, to: $to) { contributionCalendar { totalContributions } } }
  }`;
  const ranges: { from: Date; to: Date }[] = [];
  let from = new Date(createdAt);
  while (from < end) {
    const to = new Date(from);
    to.setUTCDate(to.getUTCDate() + 364);
    ranges.push({ from, to: to > end ? end : to });
    from = new Date(to);
    from.setUTCDate(from.getUTCDate() + 1);
  }

  const totals = await Promise.all(
    ranges.map(async (range) => {
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
          "x-github-api-version": githubApiVersion,
        },
        body: JSON.stringify({
          query,
          variables: {
            login: username,
            from: range.from.toISOString(),
            to: range.to.toISOString(),
          },
        }),
        next: { revalidate: 900 },
      });
      if (!response.ok) return 0;
      const payload = await response.json();
      return (
        payload.data?.user?.contributionsCollection?.contributionCalendar
          ?.totalContributions ?? 0
      );
    }),
  );
  return totals.reduce((sum, total) => sum + total, 0);
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || "NoobSambit";
  const [owner = "NoobSambit", repository = "sambit-pradhan"] = (
    process.env.GITHUB_REPOSITORY || "NoobSambit/sambit-pradhan"
  ).split("/");

  if (!token) {
    return NextResponse.json(
      { error: "GitHub data is not configured." },
      { status: 503 },
    );
  }

  const end = new Date();
  const start = new Date(end);
  start.setUTCDate(end.getUTCDate() - (displayedActivityDays - 1));
  const contributionQuery = `query PortfolioData($login: String!, $from: DateTime!, $to: DateTime!, $owner: String!, $name: String!) {
    user(login: $login) {
      createdAt
      repositories(privacy: PUBLIC) { totalCount }
      followers { totalCount }
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
    repository(owner: $owner, name: $name) {
      defaultBranchRef { name }
      stargazerCount
      forkCount
      latestRelease { tagName publishedAt }
    }
  }`;

  try {
    const [graphqlResponse, commitsResponse, leetCode] = await Promise.all([
      fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
          accept: "application/vnd.github+json",
          "x-github-api-version": githubApiVersion,
        },
        body: JSON.stringify({
          query: contributionQuery,
          variables: {
            login: username,
            from: start.toISOString(),
            to: end.toISOString(),
            owner,
            name: repository,
          },
        }),
        next: { revalidate: 300 },
      }),
      fetch(
        `https://api.github.com/repos/${owner}/${repository}/commits?per_page=9`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            accept: "application/vnd.github+json",
            "x-github-api-version": githubApiVersion,
          },
          next: { revalidate: 300 },
        },
      ),
      fetchLeetCodeActivity(process.env.LEETCODE_USERNAME || "noobsambit"),
    ]);

    if (!graphqlResponse.ok || !commitsResponse.ok) {
      return NextResponse.json(
        { error: "GitHub did not return portfolio data." },
        { status: 502 },
      );
    }

    const graphql = await graphqlResponse.json();
    if (graphql.errors?.length)
      return NextResponse.json(
        { error: "GitHub contribution data is unavailable." },
        { status: 502 },
      );

    const github = graphql.data;
    const contributionDays = (
      github.user.contributionsCollection.contributionCalendar.weeks as {
        contributionDays: ContributionDay[];
      }[]
    )
      .flatMap((week) => week.contributionDays)
      .slice(-displayedActivityDays)
      .map((day) => ({ date: day.date, count: day.contributionCount }));
    const allTimeContributions = await fetchGitHubContributionTotal(
      token,
      username,
      github.user.createdAt,
      end,
    );
    const commits = (await commitsResponse.json()).map(
      (commit: {
        sha: string;
        commit: { message: string; author: { date: string } };
      }) => ({
        sha: commit.sha.slice(0, 7),
        message: commit.commit.message.split("\n")[0],
        date: commit.commit.author.date,
      }),
    );

    return NextResponse.json(
      {
        generatedAt: end.toISOString(),
        github: {
          contributionDays,
          totalContributions:
            github.user.contributionsCollection.contributionCalendar
              .totalContributions,
          allTimeContributions,
          publicRepositories: github.user.repositories.totalCount,
          followers: github.user.followers.totalCount,
          branch: github.repository.defaultBranchRef?.name ?? "main",
          stars: github.repository.stargazerCount,
          forks: github.repository.forkCount,
          latestRelease: github.repository.latestRelease,
          commits,
        },
        leetCode,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch {
    return NextResponse.json(
      { error: "Live portfolio data could not be loaded." },
      { status: 502 },
    );
  }
}
