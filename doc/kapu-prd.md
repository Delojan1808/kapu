# Kapu — Product Requirements Document
### A voice-enabled, trilingual gift concierge for the Kapruka Agent Challenge 2026

*Working name: **Kapu** — your gift kapuwa. (In Sri Lankan tradition a* kapuwa *is the trusted go-between who brings two parties together. Kapu is the go-between who connects you to the perfect gift.) Rename freely.*

**Stack:** Next.js (App Router) on Vercel · Gemini (agent + voice) · Kapruka MCP
**Deadline:** 30 June 2026, end of day · **Builder:** solo · **Prize target:** the M4 Mac Mini

---

## 1. The one-liner

A full-screen, beautiful chat experience where a warm Sri Lankan gift concierge — Kapu — helps anyone discover the right gift and walks them all the way to a working pay link, speaking naturally in **English, Tanglish, Sinhala, and Tamil**, by voice or text, grounded entirely in Kapruka's live catalog.

---

## 2. Win condition — map every hour to the rubric

This is a contest with a published rubric. The PRD's job is to point effort where the marks are. **50 of 100 points are look-and-feel.** Build accordingly.

| Rubric line | Pts | How Kapu earns it |
|---|---|---|
| Experience & polish | 30 | Immersive full-screen chat, streamed replies, snappy, mobile-first, zero jank |
| Visual richness | 20 | Image-forward product **cards & carousels**, cart panel, gift-wrap success moment — never a wall of text |
| Personality | 15 | "Kapu the kapuwa" — warm, witty, local context, light Tanglish, never pushy |
| Usefulness | 15 | Real gift-discovery: "I'm not sure" → guided questions → confident "add to cart" |
| End-to-end completeness | 15 | Delivery city + date → gift message → `create_order` → **live pay link** |
| Creativity | 5 | The kapuwa concept + trilingual voice; a delight nobody else ships |
| **Bonus** | — | Multi-item carts · delivery-date constraints · gift messaging · **Tanglish** · **Sinhala** |

> The bonus list is where you separate from the field. Sinhala especially — the brief says almost no one will attempt it. Kapu treats Sinhala/Tanglish as a first-class default, not an afterthought.

---

## 3. Goals & non-goals

**Goals**
- A live, public URL that *just works* on a fresh phone or laptop, no setup.
- The complete loop: discover → compare → cart → delivery → gift message → pay link → track.
- A personality and language experience that feels unmistakably Sri Lankan.
- Voice as a genuine, working differentiator — within a scope that can't break the core.

**Non-goals (explicit cuts — do not spend time here)**
- ❌ Trust/neutrality attestation, injection-resistant quarantine, knowledge graphs, AP2 mandates — *zero rubric points.* (These mattered in the research brief; they do not matter for this contest.)
- ❌ User accounts / login — guest checkout only; the MCP needs no auth.
- ❌ Multi-merchant — this is Kapruka only.
- ❌ Payment handling — `create_order` returns a click-to-pay link; the browser handles payment. Never touch card data.
- ❌ Anything that fans out dozens of MCP calls per turn (rate limits — see §11).

---

## 4. Target user & primary scenario

**Primary user:** a Sri Lankan buying a gift for someone, often under mild time pressure, often unsure exactly what to get. Gifting is Kapruka's heart (cakes, flowers, hampers, electronics, combos), so the gift-buyer is both the most common real user *and* the scenario that touches the most rubric lines at once.

**Hero scenario (rehearse this for the demo):**
> "Amma-ge birthday Saturday, need to send something nice to Kandy — maybe a cake and flowers, around 8000."
Kapu asks one or two smart questions, shows a beautiful cake + flower carousel, confirms Kandy delivery on Saturday (handling the perishable-cake warning gracefully), adds a gift message, and produces a working pay link — in Tanglish.

This single flow exercises: discovery, visual cards, personality, usefulness, end-to-end checkout, **and** four bonus items (multi-item cart, delivery-date, gift message, Tanglish).

---

## 5. The concept & personality

**Kapu — the gift kapuwa.** Warm, a little cheeky, genuinely useful. The matchmaker metaphor is the creative spine: Kapu's job is to *understand* who the gift is for and *connect* you to the right thing.

**Voice & character**
- Friendly and human, lightly playful, never corporate. Greets warmly, celebrates good choices ("Ah, lovely pick!").
- Naturally code-switches into Tanglish when the user does ("machan", "no?", "shall we?") — mirrors the user, never forces it.
- Knows local context: Avurudu, Vesak, Christmas, weddings, exam results, anniversaries.
- **Never pushy.** Suggests, doesn't hard-sell. At most one gentle add-on suggestion ("a card with that?").
- **Never invents** products, prices, stock, or delivery facts — every concrete claim comes from an MCP tool result. If unsure, Kapu asks or says it doesn't know.
- Honest about constraints: if a cake can't reach Kandy by Saturday, Kapu says so kindly and offers an alternative.

**Personality micro-moments (cheap, high-impact)**
- A warm hero greeting with the user's likely intent surfaced as tappable prompt chips.
- A typing indicator with character ("Kapu is hunting for something nice…").
- A small gift-wrap / confetti animation on a successful order.

---

## 6. Language & voice spec

**Languages:** English · Tanglish (Latin-script English mixed with Sinhala/Tamil) · Sinhala (සිංහල) · Tamil (தமிழ்).

**Behaviour**
- Auto-detect language and register from the user's message; reply in the same blend. Mirror code-switching turn by turn — this mixing is the headline differentiator.
- Catalog data (product names) will mostly be in English; that's fine — Kapu speaks Sinhala/Tamil *around* the English product names naturally.
- **Render Sinhala and Tamil correctly:** load **Noto Sans Sinhala** and **Noto Sans Tamil** web fonts. Broken glyphs will read as a bug to local judges.
- Provide 2–3 suggested prompts in mixed language on the hero screen.

**Voice (Gemini Live API)** — *current capabilities as of the Live API docs; confirm exact model IDs in AI Studio before building:*
- The Live API gives real-time speech-to-speech with **barge-in**, **function calling**, **audio transcription**, and native-audio models that switch languages mid-conversation.
- **English and Tamil voice are safe.** **Sinhala voice is the risk** — it may not be in the supported voice set at production quality. **Test Sinhala voice in the first hour you touch voice.** If quality is poor: keep **Sinhala as text**, use English/Tamil for voice. Don't gamble the demo on unproven Sinhala TTS.
- Show live transcripts of both user and Kapu speech in the chat (free with `outputAudioTranscription` / `inputAudioTranscription`) so voice still looks great on screen.

---

## 7. Functional requirements (mapped to the 7 MCP tools)

Endpoint: `https://mcp.kapruka.com/mcp` · Streamable HTTP · no auth · 60 req/min/IP · 30 orders/hr/IP.

| # | Capability | MCP tool | Key params | UI surface |
|---|---|---|---|---|
| F1 | Search catalog | `kapruka_search_products` | `q, category, min_price, max_price, in_stock_only, sort, limit, currency` | Product carousel/grid |
| F2 | Product detail | `kapruka_get_product` | `product_id, currency` | Expanded card / detail view |
| F3 | Browse categories | `kapruka_list_categories` | `depth` | Category chips on hero / "browse" |
| F4 | Resolve delivery city | `kapruka_list_delivery_cities` | `query, limit` | City autocomplete in checkout |
| F5 | Check delivery + price | `kapruka_check_delivery` | `city, delivery_date, product_id` | Delivery confirmation; perishable note |
| F6 | Create order → pay link | `kapruka_create_order` | `cart, recipient, delivery, sender, gift_message, currency` | Checkout summary + **Pay** button |
| F7 | Track order | `kapruka_track_order` | `order_number` | Status timeline card |

**Cross-cutting requirements**
- **Multi-item cart** (bonus): persistent cart state in the client; `create_order` receives the full `cart` array.
- **Delivery-date constraint** (bonus): always capture a date; pass to `check_delivery`; surface the flat LKR rate and any perishable warning as a friendly line, not a raw error.
- **Gift message** (bonus): offer it before checkout; pass `gift_message` to `create_order`.
- **Grounding:** product/price/stock/delivery text shown to the user must come from tool results, never from the model's imagination.

---

## 8. Key user flows

**A. Gift discovery → checkout (the hero flow)**
1. User states intent (text or voice), possibly vague.
2. Kapu asks ≤2 clarifying questions (recipient, occasion, budget) only if needed.
3. `search_products` (+ `list_categories` if helpful) → render a **carousel of cards**.
4. User adds one or more items → cart updates with a little animation.
5. Kapu asks delivery city + date → `list_delivery_cities` autocomplete → `check_delivery` per item.
6. Kapu surfaces delivery cost + perishable note; offers a **gift message**.
7. Collect recipient + sender details → `create_order` → render **pay link** prominently.
8. Success moment (gift-wrap animation) + "track your order" hint.

**B. Quick buy** — user names a product → `search` → card → add → straight to checkout.

**C. Track order** — user pastes an order number → `track_order` → status timeline card.

Each flow must work by **voice and text**, and must degrade gracefully if a tool returns nothing ("Hmm, I couldn't find that — want me to try [alternative]?").

---

## 9. Tech architecture

**Shape:** Next.js App Router on Vercel. All model calls and **all MCP calls happen server-side** in API routes — never expose the MCP or API keys to the browser.

### 9.1 Text agent loop (the core — build this first)
- Connect to the Kapruka MCP with the official **MCP TypeScript SDK** (`@modelcontextprotocol/sdk`) using the **`StreamableHTTPClientTransport`** (matches Kapruka's "Streamable HTTP" transport — don't assume SSE).
- On server start / first request: `listTools()` → convert each MCP tool into a **Gemini `functionDeclaration`** (name, description, JSON schema params).
- Use the **`@google/genai`** SDK. Per user turn: `generateContent` with the function declarations + system prompt (Kapu persona, §5/§6) → if the model emits a function call, execute it against the MCP, feed the result back, loop until a final answer → **stream** to the client.
- Suggested model for reasoning + tool calling: a current **Gemini Flash** (e.g. `gemini-2.5-flash` or `gemini-3.1-flash` — confirm latest in AI Studio). Flash is fast and cheap, which protects the "polish/latency" score.

### 9.2 Voice path (Gemini Live) — scoped so it can't break the core
The Live API is a **stateful WebSocket, server-to-server, ~10-min sessions** — awkward on Vercel serverless. Two options:

- **Recommended (stretch): ephemeral-token, client-direct.** A Vercel route mints a short-lived Live API token; the browser opens the Live WebSocket directly with `@google/genai`; give the Live session the same function declarations; when Live requests a tool call, the browser posts it to a Vercel route that proxies to the Kapruka MCP and returns the result. Show transcripts in the chat.
- **Safe fallback (do this if time is tight): push-to-talk.** Mic → capture audio → Vercel route → Gemini transcription (or browser Web Speech API for STT) → run the **existing text agent** → reply as text + optional TTS playback. 80% of the "wow" for 30% of the risk, and it reuses the loop you already built.

> Rule: **voice is the last thing built.** Checkout (15 pts) and visual polish (50 pts) ship first. If the clock runs out, voice is what drops — not the pay link.

### 9.3 Deploy
- Vercel project on a stable subdomain. **Deploy a hello-world on day one** to de-risk hosting before any feature work.
- Env: `GEMINI_API_KEY`, `KAPRUKA_MCP_URL=https://mcp.kapruka.com/mcp`.

---

## 10. Visual / UX design direction (this is 50% of the score — invest here)

**Aesthetic:** warm, premium "Ceylon gifting," not generic-chatbot. Modern and clean, with restrained Sri Lankan warmth — avoid kitsch.

- **Palette (suggested):** warm off-white paper `#FBF7F0`; deep peacock teal `#0E5A57` (primary); marigold/saffron `#E8A13A` (accent); warm near-black `#1C1A17` (text); a soft success green. Consider an optional dark mode for the immersive feel.
- **Typography:** a characterful display face for Kapu's name/headers (e.g. *Fraunces* or *Bricolage Grotesque*) + a clean sans for body (*Inter*). **Plus Noto Sans Sinhala / Noto Sans Tamil** for native scripts. Get script rendering right — it's a credibility signal to these judges.
- **Layout:** one immersive, centered full-screen column. Generous whitespace. Minimal chat chrome. Not a corner widget.
- **Hero / empty state:** Kapu introduces itself warmly in Tanglish with 2–3 tappable prompt chips ("Amma-ge birthday gift", "Anniversary flowers to Kandy", "Under Rs. 5000 for a colleague") and a mic button.
- **Product card:** image-forward; name; price in **LKR**; stock/delivery hint; `Add to cart` + `Details`. Multiple results → horizontal **snap carousel**.
- **Cart:** persistent slide-in panel or pinned summary with item count and total.
- **Motion:** streamed text; cards fade+rise with a slight stagger; a personality-rich typing indicator; a gift-wrap/confetti flourish on order success. Subtle, never janky.
- **Mobile-first & responsive** — assume a judge opens it on a phone first.

*(When you build the UI, follow the project's frontend-design skill for tokens and constraints.)*

---

## 11. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Voice/WebSocket awkward on Vercel serverless | Ephemeral-token client-direct, or push-to-talk fallback; voice built last |
| Sinhala **voice** quality unproven | Test in first voice hour; fall back to Sinhala text + English/Tamil voice |
| MCP transport mismatch | Use MCP TS SDK **StreamableHTTPClientTransport**, not an SSE assumption |
| Rate limits (60 req/min, 30 orders/hr per IP) | Keep tool calls minimal per turn; server-side only; cache reads in-session; don't spam `create_order` while testing |
| Respect live order tools (contest rule) | Use realistic test data; create only the orders you need; no abuse |
| Latency hurting the polish score | Use Flash; stream tokens; show "Kapu is finding…" states; pre-warm the MCP connection |
| Sinhala/Tamil glyphs render broken | Load Noto fonts; test on a real device |
| Hosting fails at judging time | Deploy early; test the full flow in a fresh incognito session before submitting |

---

## 12. Definition of done

A first-time visitor, in **incognito on both phone and desktop**, can:
- ✅ Be greeted by Kapu and shown suggested prompts.
- ✅ Ask for a gift in **Tanglish** (and Sinhala) and get a relevant, beautiful **card/carousel**.
- ✅ Add **multiple items** to a cart.
- ✅ Set a delivery **city + date**, see the cost and any perishable note.
- ✅ Add a **gift message**.
- ✅ Receive a **working click-to-pay link** from a real `create_order`.
- ✅ Optionally **track** an order and **use voice** for at least the discovery step.
- ✅ No crashes; fast load; correct Sinhala/Tamil rendering.

**Demo script to rehearse:** the Amma's-Kandy-birthday hero flow (§4) end to end, by voice, in Tanglish, finishing on a live pay link and the gift-wrap moment.

---

## 13. Build plan — final ~24–36 hours, in priority order

Build so that **whatever you finish, the thing that works is the thing that scores.**

- **Phase 0 · Skeleton & de-risk (1–2h)** — Next.js repo; deploy hello-world to Vercel (stable URL live *now*); env vars; connect MCP TS SDK, `listTools()`, log the 7 tools; confirm a basic Gemini `generateContent` call.
- **Phase 1 · Core agent loop (4–6h)** — server route: text → Gemini + Kapruka tools → tool loop → streamed reply. Get search → results rendering in a plain UI. *The product is "alive" by end of this phase.*
- **Phase 2 · Visual richness (5–7h)** — full-screen chat, product **cards & carousels**, cart panel, hero/empty state, fonts, palette, motion. *Half the score lives here.*
- **Phase 3 · End-to-end checkout (3–4h)** — city lookup + `check_delivery` (date + perishable) + `create_order` → render pay link; do one real test order. *15 pts many will skip.*
- **Phase 4 · Personality & language (2–3h)** — Kapu system prompt; Tanglish/Sinhala/Tamil mirroring; suggested prompts; Noto fonts; success animation. *Bonus + personality points.*
- **Phase 5 · Voice (stretch, 3–5h)** — push-to-talk fallback first; Live API if time allows; test Sinhala voice early.
- **Phase 6 · Polish & reliability (2–3h)** — error/empty states, mobile pass, loading states, final deploy, full incognito run-through of the demo script.

---

## Appendix A — MCP tool reference

```
kapruka_search_products(q, category, min_price, max_price, in_stock_only, sort, limit, cursor, currency)  // search; ≤3 pages
kapruka_get_product(product_id, currency)                                                                  // full detail + images + URL
kapruka_list_categories(depth)                                                                             // top-level names + browse URLs
kapruka_list_delivery_cities(query, limit)                                                                 // ≤50 matches; vernacular aliases ok
kapruka_check_delivery(city, delivery_date, product_id)                                                    // flat LKR rate + perishable warning
kapruka_create_order(cart, recipient, delivery, sender, gift_message, currency)                            // guest order → 60-min pay link
kapruka_track_order(order_number)                                                                          // status + items + timeline
```
Limits: 60 req/min/IP · 30 `create_order`/hr/IP · reads cached ≤30 min · prices locked 60 min · streamable HTTP · no auth.

## Appendix B — Config

```jsonc
// .env (server only)
GEMINI_API_KEY=...                       // from Google AI Studio
KAPRUKA_MCP_URL=https://mcp.kapruka.com/mcp

// Model IDs to confirm in AI Studio (these move fast):
//   agent/tool-calling : a current Gemini Flash (e.g. gemini-2.5-flash / gemini-3.1-flash)
//   voice (Live API)   : a current Live model (e.g. gemini-3.1-flash-live-preview /
//                        gemini-2.5-flash-native-audio)
```

## Appendix C — Kapu system-prompt seed (starting point)

> You are **Kapu**, a warm, witty Sri Lankan gift concierge for Kapruka — a *kapuwa* who connects people to the perfect gift. Mirror the user's language and register, including Tanglish, Sinhala (සිංහල), and Tamil (தமிழ்); switch naturally mid-conversation as they do. Be genuinely helpful: ask at most one or two short questions to understand the recipient, occasion, and budget, then suggest. Never invent products, prices, stock, or delivery details — use only the Kapruka tools, and if you're unsure, say so or ask. Be honest and kind about constraints like perishable cakes and delivery dates. Never be pushy; at most one gentle add-on suggestion. Keep replies short, warm, and human.
