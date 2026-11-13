# Portfolio Design System

## Purpose

Use this system for every new or updated portfolio page, component, and case-study feature. The Finike Lithium case study is intentionally exempt: it uses its own client-led identity.

## Design character

The portfolio is an expressive dark-mode studio space: confident, warm, tactile, and playful without becoming busy. It should make each piece of work feel curated and easy to explore.

- Start dark. Use `--ink` / `--bg` for the page ground and retain the existing light-mode toggle.
- Use lime (`--green`) as the primary navigation, action, and emphasis colour.
- Use pink, orange, teal, purple, and amber only as controlled supporting accents — never all at once in one component.
- Keep the slowly moving, blurred blob background behind page content. Do not add visual noise that competes with it.

## Typography

- `Unbounded`: very short, high-impact moments only — the VK mark, hero name, or display emphasis.
- `Bricolage Grotesque`: every main heading and project title.
- `Caveat`: a single playful supporting label adjacent to a heading; never use for body copy.
- `Inter`: navigation, metadata, body copy, descriptions, and interface labels.
- Use sentence case for headings and regular sentence punctuation for copy. Keep body copy concise and specific to the work.

## Layout and spacing

- Use the existing page gutters: `6%` on standard pages, with a 7–8rem top rhythm for full sections.
- Keep reading measures around 500–600px for descriptive text.
- Prefer 16px rounded project cards, 24px rounded skill cards, and fully rounded pills/buttons.
- Use 1.5–2rem gaps in card grids. Shift to a single column below 768px.
- Every secondary page should preserve the shared navigation, `page-header`, Back to Portfolio link, shared footer, and `script.js`.

## Reusable patterns

- **Section header:** uppercase lime eyebrow, Bricolage heading, optional Caveat label.
- **Project card:** image first, then concise title, short description, and an optional pill tag.
- **Case study:** two-column story plus visual; alternate visual direction only on large screens.
- **Tags/features:** small, quiet outline pills. They describe scope; do not use them as decoration.
- **Interactions:** subtle 4–6px hover lift; respect the existing reduced-motion support. Never use autoplay video, aggressive movement, or heavy parallax.

## Image and content rules

- Use real work in `assets/png/` whenever available; do not create placeholder-looking visuals when an approved asset exists.
- Preserve exact filename casing in HTML so pages work on Linux hosting.
- Give every meaningful image descriptive alt text; decorative visuals use `aria-hidden="true"`.
- Use `object-fit: cover` for project imagery and `contain` for logo marks.
- Do not use generic portfolio claims. State the deliverable, medium, and intended result.

## Quality checks before delivery

- Confirm every local image path exists with exact casing.
- Check that new pages work at desktop and mobile widths.
- Retain semantic hierarchy: one `h1`, sequential headings, useful link labels, and labelled controls.
- Keep body text at a readable contrast against both dark and light themes.
- Run an HTML/CSS structural check after edits.
