
// TODO handle each platform + group of platform
// 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'

const AVAILABLE_PLATFORMS = {
  onWindows: 'win32',
  onMac: 'darwin',
  onLinux: 'linux',
}

export function patch(currentPlatform) {
  function wololo(method, expectedPlatform, fallbackImplem = () => {}) {
    if (currentPlatform === AVAILABLE_PLATFORMS[expectedPlatform]) {
      return method
    } else {
      return fallbackImplem
    }
  }
  function newDefinition(method, expectedPlatform, ...args) {
    if (currentPlatform === AVAILABLE_PLATFORMS[expectedPlatform]) {
      return method(...args)
    } else {
      return () => {}
    }
  }

  Object.keys(AVAILABLE_PLATFORMS).forEach(platform => {
    ;[describe, it, test].forEach(method => {
      method[platform] = wololo((...args) => method(...args), platform)
      method[platform].each = wololo(method.each, platform, method.skip.each)
      ;['skip', 'only'].forEach(mode => {
        method[platform][mode] = wololo(method[mode], platform, method.skip)
        method[platform][mode] = wololo(method[mode], platform, method.skip.each)
      })
    })
  })
}
