
// TODO handle each platform + group of platform
// 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'

const AVAILABLE_PLATFORMS = {
  onWindows: 'win32',
  onMac: 'darwin',
  onLinux: 'linux',
}

export function patch(currentPlatform) {
  function newDefinition(method, expectedPlatform, ...args) {
    if (currentPlatform === AVAILABLE_PLATFORMS[expectedPlatform]) {
      return method(...args)
    } else {
      return () => {}
    }
  }

  Object.keys(AVAILABLE_PLATFORMS).forEach(platform => {
    ;[describe, it, test].forEach(method => {
      method[platform] = (...args) => {
        return newDefinition(method, platform, ...args)
      }
      method[platform].each = (...args) => {
        return newDefinition(method.each, platform, ...args)
      }
      ;['skip', 'only'].forEach(mode => {
        method[platform][mode] = (...args) => {
          return newDefinition(method[mode], platform, ...args)
        }
        method[platform][mode].each = (...args) => {
          return newDefinition(method[mode].each, platform, ...args)
        }
      })
    })
  })
}
