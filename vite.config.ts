import { defineConfig } from 'vite'

// Export an async config so we can dynamically import ESM-only plugins without using require.
export default defineConfig(async () => {
  const plugins = [] as any[]
  try {
    const mod = await import('@vitejs/plugin-react')
    // the imported module may export the plugin factory as default (the usual case)
    // or as the module itself. Normalize to a factory and call it if necessary.
    const factory = (mod as any).default ?? (mod as any)
    const plugin = typeof factory === 'function' ? factory() : factory
    if (plugin) plugins.push(plugin)
  } catch (e) {
    // plugin not installed — warn and continue without it
    // eslint-disable-next-line no-console
    console.warn('[vite] @vitejs/plugin-react not found or failed to load — running without React plugin')
  }

  return {
    plugins,
  }
})
