
const AVAILABLE_PLATFORMS = {
  onWindows: ['win32'],
  onMac: ['darwin'],
  onLinux: ['linux'],
  skipWindows: ['linux', 'darwin'],
  skipMac: ['linux', 'win32'],
  skipLinux: ['darwin', 'win32'],
}

export function patch(currentPlatform) {
  function newDefinition(method, expectedPlatform, fallbackImplem) {
    if (AVAILABLE_PLATFORMS[expectedPlatform] && AVAILABLE_PLATFORMS[expectedPlatform].includes(currentPlatform)) {
      return method
    } else {
      return fallbackImplem
    }
  }

  Object.keys(AVAILABLE_PLATFORMS).forEach(platform => {
    ;[describe, it, test].forEach(method => {
      method[platform] = newDefinition(method, platform, method.skip)
      method[platform].each = newDefinition(method.each, platform, method.skip.each)
      ;['skip', 'only'].forEach(mode => {
        method[platform][mode] = newDefinition(method[mode], platform, method.skip)
        method[platform][mode] = newDefinition(method[mode], platform, method.skip.each)
      })
    })
  })
}
