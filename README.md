# Trion Labs

This repository is organised around one active product experience and one preserved archive of exploratory work.

## Active experience

The primary working project is:

- [experiences/trion-operations-experience](experiences/trion-operations-experience)

This is the live Trion Labs experience and is the default path for ongoing product, UX, and frontend work.

## Archive

The earlier prototype is retained only as reference material:

- [archive/fabric-line-simulator](archive/fabric-line-simulator)

This folder is intentionally separate from the active experience and should not be treated as the default project entry point.

## Repository structure

- [experiences/trion-operations-experience](experiences/trion-operations-experience) — active Trion operations experience
- [archive/fabric-line-simulator](archive/fabric-line-simulator) — historical prototype archive
- [prompts](prompts) — product and delivery prompts for the active repo direction
- [.github](.github) — repo instructions and skill definitions
- [theme.js](theme.js) — shared theme utility used by the active experience

## Run the active experience

From the repository root:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/experiences/trion-operations-experience/
```

## Working guidance

- Treat the Trion operations experience as the default product path.
- Keep the archive for historical reference and inspiration only.
- Prefer product language when describing the main experience.
- Use archive naming only when intentionally referring to the older prototype.
