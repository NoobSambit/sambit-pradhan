# Kirana Corner — Product Creative Blueprint

## Source basis and creative premise

This strategy is based on the original Vite/React application, Firebase services, customer and merchant routes, cart/order code, nearby-geography helpers, and the current server-side recipe-cart suggestion feature. The recipe feature is included because it exists in the repository, not treated as an aspirational concept.

**Product thesis:** Kirana Corner makes local grocery shopping feel as immediate as a modern app while preserving the nearby shop, its stock, its owner, and its fulfilment relationship.

**Poster count:** 4. The product has one strong local-commerce loop plus one differentiated AI-assisted intent loop.

## Complete capability inventory

| Capability | Purpose | Inputs | Outputs | Connected systems | User / agent value | Maturity |
| --- | --- | --- | --- | --- | --- | --- |
| Customer and merchant identity | Let a person enter and operate as customer or shop owner | Signup/login, role choice, protected route state | Role-appropriate account and dashboard path | Firebase Auth, protected routes, role switcher | Serves both sides of a local marketplace | Implemented |
| Shop creation and profile management | Give an owner a digital storefront | Shop name, contact, location, profile data | Shop profile and discoverable storefront | Firebase shops collection, profile editor | Lets a local shop be found and represented | Implemented |
| Nearby shop discovery | Find shops near a customer and visualize their location | User location, shop coordinates, radius | Nearby shop list, distance, map bounds | Haversine helpers, MapSection, shop service | Keeps discovery local rather than marketplace-wide | Implemented; client-side radius filtering |
| Shop and catalog browsing | Explore a specific shop and its product assortment | Shop ID, category/search/filter state | Shop detail and product grid | Shop/product services, catalog | Supports confident browsing before a cart decision | Implemented |
| Merchant inventory operations | Create, edit, remove, and monitor in-stock products | Product name, category, price, stock, image, shop ID | Catalog records and inventory state | Product form, inventory modal, Firebase | Gives a merchant control over what is sellable | Implemented |
| Search, filters, and catalog taxonomy | Narrow groceries to what a customer needs | Search text, category/filter state | Filtered product discovery | Search context, filter bar, catalog data | Makes a local catalog usable | Implemented |
| Cart and quantity management | Assemble a shopping order | Product, quantity, shop context | Cart total and items | Cart context, product cards | Turns discovery into a clear purchase candidate | Implemented |
| Address management | Choose or maintain delivery address data | Saved/new/edited address | Selected address for checkout | User address subcollection, address selector | Makes checkout personally usable | Implemented |
| Test checkout and stock decrement | Persist an order and update product availability | Cart, address, test payment state | Pending order, status timeline, stock decrement | Orders collection, CartDrawer, product service | Demonstrates transaction and fulfilment flow | Implemented with TEST Razorpay payment state |
| Customer and merchant order views | Track orders after checkout and update fulfilment state | Customer/shop ID, order status actions | Order history and progress | Order utilities, MyOrders, merchant dashboard | Connects shopping to delivery follow-through | Implemented |
| Recipe-to-cart assistant | Transform cooking intent into nearby, in-stock ingredient candidates | Recipe request, servings, user location, radius | Recipe, ingredient intents, matches, substitutions, confidence, editable cart proposal | Vercel API, deterministic matching, client recipe UI | Bridges a meal idea to purchasable local products | Implemented |
| Ingredient-match review | Keep AI matching controllable before cart mutation | Suggested products, alternatives, quantities, user selection | Selected items added to cart | Recipe Assistant, cart context | Prevents opaque AI checkout decisions | Implemented |
| Product data normalization work | Improve ingredient matching and cross-surface catalog reliability | Product metadata, aliases, unit/pack data, canonical collection decision | Better matching and consistent inventory reads | Recipe expansion audit, product services | Active improvement path for reliable AI commerce | Active WIP / documented technical debt |
| Multi-shop order handling | Resolve recipe/cart items that span different shops | Mixed-shop cart | Grouped or separate fulfilment orders | Cart and order model | Needed for full marketplace-scale ingredient coverage | Planned; current checkout selects first cart item’s shop |

## Capability clusters

| Cluster | One thing it must communicate | Recommended treatment | Why |
| --- | --- | --- | --- |
| Local discovery | The nearest real shop is the centre of the experience | Full poster | Geography and familiarity are the brand promise |
| Local shelf to order | A shop’s live catalog becomes a simple order with delivery progress | Full poster | Proves end-to-end utility for customer and merchant |
| Merchant digital counter | A shop owner controls profile, catalog, stock, and order state | Supporting poster | Essential two-sided-market proof, but visually simpler |
| Meal intent to editable cart | The AI understands ingredients, then matches only nearby in-stock products and asks the customer to decide | Full poster | The distinctive feature and clearest technical story |

## Poster roadmap

### 1. Your neighborhood, on the map

- **Subtitle:** Discover nearby kirana shops, see the distance, and enter a storefront that still feels local.
- **Core emotion:** Familiarity.
- **Visual metaphor / hero object:** A single neighborhood map with a customer pin and a small constellation of real shop cards.
- **Supporting UI:** Radius selector, distance label, map/list toggle, shop card, open/shop status, route into shop details.
- **Primary focus:** Location-aware discovery.
- **Secondary focus:** Search and category filtering.
- **Callout labels:** Nearby Shops, 3 km Radius, Distance, Open Now, Browse Store.
- **Animation opportunities:** Search radius expands; nearby shop cards become visible in distance order.
- **Complexity:** Low. **Marketing value:** 10/10. **Technical depth:** 7/10.

### 2. From a local shelf to your door

- **Subtitle:** Browse the shop’s actual catalog, adjust quantities, choose an address, and watch the order move forward.
- **Core emotion:** Ease.
- **Visual metaphor / hero object:** One elegant product shelf flowing into a compact order timeline.
- **Supporting UI:** Product card, filter chips, cart drawer, quantity controls, address selector, bill breakdown, Pending → Delivered status.
- **Primary focus:** Customer order loop.
- **Secondary focus:** Stock decrement and order history.
- **Callout labels:** In Stock, Add to Cart, Delivery Address, Order Total, Pending, Delivered.
- **Animation opportunities:** Product moves to cart; order timeline advances one stage at a time.
- **Complexity:** Medium. **Marketing value:** 9/10. **Technical depth:** 8/10.

### 3. A digital counter for every local shop

- **Subtitle:** Owners can manage the storefront, inventory, stock, and incoming orders without becoming a marketplace operations team.
- **Core emotion:** Empowerment.
- **Visual metaphor / hero object:** A merchant counter where product cards, stock level, and order state meet in one calm workspace.
- **Supporting UI:** Shop profile, product form, inventory modal, low-stock state, order status control, role switcher.
- **Primary focus:** Merchant operations.
- **Secondary focus:** Authentication and storefront discovery.
- **Callout labels:** Edit Shop, Add Product, Stock, Inventory, New Order, Update Status.
- **Animation opportunities:** New product joins shelf; stock update refreshes the customer-facing availability.
- **Complexity:** Low. **Marketing value:** 8/10. **Technical depth:** 8/10.

### 4. Ask for dinner. Review the local cart.

- **Subtitle:** Describe what you want to cook; Kirana Corner turns ingredients into nearby, in-stock suggestions with confidence and substitutions before anything is added.
- **Core emotion:** Helpful intelligence.
- **Visual metaphor / hero object:** A single recipe request opening into a structured ingredient-to-product match rail.
- **Supporting UI:** Cooking prompt, serving count, recipe card, ingredient list, matched / possible match / not found states, shop distance, confidence, substitutions, editable cart review.
- **Primary focus:** Recipe-to-cart matching.
- **Secondary focus:** Deterministic product matching and user confirmation.
- **Callout labels:** What are you cooking?, Matched Nearby, Possible Match, Substitute, In Stock, Confidence, Add Selected to Cart.
- **Animation opportunities:** Recipe ingredients fan into candidate products; the user switches an alternative before cart confirmation.
- **Complexity:** Medium. **Marketing value:** 10/10. **Technical depth:** 10/10.

## Landing sequence and coverage

1. Your neighborhood, on the map
2. From a local shelf to your door
3. A digital counter for every local shop
4. Ask for dinner. Review the local cart.

| Capability area | Poster coverage |
| --- | --- |
| Roles, shop profiles, nearby map, catalog discovery, search/filtering | 1, 3 |
| Product CRUD, inventory and stock state | 2, 3 |
| Cart, address, test checkout, order history/status | 2 |
| Recipe API, ingredient intent, match confidence, substitutions, editable proposal | 4 |
| Canonical catalog migration and multi-shop checkout | Clearly marked adjacent WIP in 4 / technical roadmap |

## Creative guardrails

- Do not claim real payment processing; the current checkout stores a captured **TEST** Razorpay state.
- Do not imply recipe AI directly purchases anything. It returns structured suggestions, and the user reviews selections before cart addition.
- Do not hide the current single-shop checkout constraint when showing multi-ingredient recipes. The poster can show one-shop-first matching or a clearly grouped proposal.
- The local map, not an anonymous endless marketplace grid, should establish the product’s personality.
