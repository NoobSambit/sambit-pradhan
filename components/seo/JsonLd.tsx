type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/**
 * Minimal JSON-LD renderer with safe serialization.
 * Escapes "<" so inline structured data can never break out of the
 * script tag or enable markup injection.
 */
export function JsonLd({ data }: { data: JsonValue }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
