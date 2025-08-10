// A small sandbox runner. It uses Function constructor to evaluate user-supplied logic
// in a constrained environment. **This is not 100% secure** — for production you'd
// want a server-side sandbox or WebWorker + more restrictions.

export async function runUserLogic(codeStr, values = {}) {
  // We provide helpers to the user if needed.
  const helpers = {
    now: () => new Date().toISOString()
  }

  // Wrap user code so they can return values directly.
  // Example expected user code: "if (values.age < 21) return { _error: 'Too young' }; return { _ok: true }"
  const wrapped = `
    "use strict";
    try {
      ${codeStr}
    } catch (e) {
      throw e
    }
  `

  // Create function with limited args
  const fn = new Function('values', 'helpers', wrapped)

  const result = fn(values, helpers)
  // Support Promise
  if (result && typeof result.then === 'function') return await result
  return result
}