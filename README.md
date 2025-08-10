Dynamic Interface Compiler (Frontend R&D Intern Assignment)

A mini no-code-like React app that allows editing a JSON schema for UI blocks and rendering them live.

## Features
- JSON editor (simple textarea) to define UI blocks
- Live renderer that interprets schema into React components
- Built-in blocks: `form`, `text`, `image`
- Form state handled by `react-hook-form` with validation
- Sandbox-style logic injection on form submit (`onSubmit` as a string) executed via `Function` constructor
- Schema persisted to `localStorage` and exportable as JSON

## How to run
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173`

## Files of interest
- `src/components/SchemaEditor.jsx` — JSON editor UI
- `src/components/LiveRenderer.jsx` — interprets blocks and renders
- `src/components/blocks/*` — block implementations
- `src/utils/sandbox.js` — runs user logic on submit

## Security note
This demo uses the `Function` constructor to run user-supplied logic for convenience. This is NOT safe for untrusted input in production. For production-ready dynamic logic you'd use a server-side sandbox, WebAssembly VM, or a strict AST-based evaluator.

## Extensions and bonus ideas
- Add Monaco editor for visual JSON editing
- Add dnd-kit for drag-and-drop block reordering
- Use WebWorker to evaluate user logic with timeouts
- Export & import schema via shareable links

## Challenges & what I'd optimize
- Secure sandboxing of user logic (current approach is unsafe)
- Better editor UX (visual form builder + field configuration UI)
- Adding a robust component factory to support plugins
- Save history / versioning for schemas


Enjoy — modify the schema JSON and press Apply to see live changes.
```
