<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Keep mission facts and character dialogue in a browser-safe data module so each explorer can have an independent, accessible information dialog.

- Store uploaded equipment illustrations as CDN asset pointers and reference their URLs in browser-safe explorer data so chapter lineups, cards, and dialogs share the same image.

- Keep optional explorer GLB URLs in browser-safe explorer data and lazy-load the R3F viewer behind ClientOnly inside dialogs; this avoids server rendering WebGL and downloading 3D code before a rover is opened.

- Prepare rover instances in the shared model helper: apply and pause all final animation keyframes, hide only inspected helper meshes, and normalize visible bounds on a wrapper; this preserves cached assets and animated equipment pivots.

- Keep chapter backdrops decorative and isolated within their own sections, with non-interactive sticky images behind story content; this preserves readable text and accessible explorer dialogs.

- Keep fictional story beats and age-inspired family roles separate from preserved explorer mission facts; this lets story scenes evolve without changing the factual dialogs.
- Drive decorative scrolling scenes through a shared sticky scene wrapper and CSS progress variable, respecting reduced motion and leaving native scrolling and dialogs accessible.
