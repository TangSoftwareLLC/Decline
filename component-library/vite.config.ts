import { defineConfig } from 'vite'

// Export an async config so we can dynamically import ESM-only plugins without using require.
export default defineConfig(async () => {
  const plugins = [] as any[]
  try {
    const mod = await import('@vitejs/plugin-react')
    const plugin = mod && (mod.default ? mod.default() : mod())
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
