
// TODO handle each platform + group of platform
// 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos', and 'win32'

const AVAILABLE_PLATFORMS = {
  onWindows: ['win32'],
  onMac: ['darwin'],
  onLinux: ['linux'],
}

export function patch(currentPlatform) {
  function newDefinition(method, expectedPlatform, fallbackImplem = () => {}) {
    if (AVAILABLE_PLATFORMS[expectedPlatform] && AVAILABLE_PLATFORMS[expectedPlatform].includes(currentPlatform)) {
      return method
    } else {
      return fallbackImplem
    }
  }

  Object.keys(AVAILABLE_PLATFORMS).forEach(platform => {
    ;[describe, it, test].forEach(method => {
      method[platform] = newDefinition((...args) => method(...args), platform)
      method[platform].each = newDefinition(method.each, platform, method.skip.each)
      ;['skip', 'only'].forEach(mode => {
        method[platform][mode] = newDefinition(method[mode], platform, method.skip)
        method[platform][mode] = newDefinition(method[mode], platform, method.skip.each)
      })
    })
  })
}
