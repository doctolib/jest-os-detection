interface Command {
  onWindows: ['win32']
  onMac: ['darwin']
  onLinux: ['linux']
  skipWindows: ['linux', 'darwin']
  skipMac: ['linux', 'win32']
  skipLinux: ['darwin', 'win32']
}

const AVAILABLE_PLATFORMS: Command = {
  onWindows: ['win32'],
  onMac: ['darwin'],
  onLinux: ['linux'],
  skipWindows: ['linux', 'darwin'],
  skipMac: ['linux', 'win32'],
  skipLinux: ['darwin', 'win32'],
}

type MethodOperation = 'skip' | 'only'

const methodOperations: MethodOperation[] = ['skip', 'only']

export function patch(currentPlatform: NodeJS.Platform) {
  function newDefinition<T>(method: T, expectedPlatform: keyof Command, fallbackImplem: T): T {
    if ((AVAILABLE_PLATFORMS[expectedPlatform] as NodeJS.Platform[] | undefined)?.indexOf(currentPlatform) !== -1) {
      return method
    } else {
      return fallbackImplem
    }
  }

  ;(Object.keys(AVAILABLE_PLATFORMS) as (keyof Command)[]).forEach((platform) => {
    ;[describe, it, test].forEach((method) => {
      method[platform] = newDefinition<typeof method>(method, platform, method.skip)
      method[platform].each = newDefinition<jest.Each>(method.each, platform, method.skip.each)

      methodOperations.forEach((mode) => {
        method[platform][mode] = newDefinition<typeof method>(method[mode], platform, method.skip)
        method[platform][mode].each = newDefinition<jest.Each>(method[mode].each, platform, method.skip.each)
      })
    })
  })
}
