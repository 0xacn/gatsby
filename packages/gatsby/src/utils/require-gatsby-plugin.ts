import { requireResolve } from "./require-utils"

const pluginModuleCache = new Map<string, any>()

export function setGatsbyPluginCache(
  plugin: { name: string; resolve: string },
  module: string,
  moduleObject: any
) {
  const key = `${plugin.name}/${module}`
  pluginModuleCache.set(key, moduleObject)
}

export function requireGatsbyPlugin(
  plugin: { name: string; resolve: string },
  module: string
): any {
  const key = `${plugin.name}/${module}`

  let pluginModule = pluginModuleCache.get(key)
  if (!pluginModule) {
    pluginModule = require(requireResolve(`${plugin.resolve}/${module}`))
    pluginModuleCache.set(key, pluginModule)
  }
  return pluginModule
}
