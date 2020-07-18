
type JestTestOrSuite = jest.Describe | jest.It

enum Platform {
  win32 = 'win32',
  darwin = 'darwin',
  linux = 'linux'
}

interface Command {
  onWindows: [Platform.win32],
  onMac: [Platform.darwin],
  onLinux: [Platform.linux],
  skipWindows: [Platform.linux, Platform.darwin],
  skipMac: [Platform.linux, Platform.win32],
  skipLinux: [Platform.darwin, Platform.win32],
}

const AVAILABLE_PLATFORMS: Command = {
  onWindows: [Platform.win32],
  onMac: [Platform.darwin],
  onLinux: [Platform.linux],
  skipWindows: [Platform.linux, Platform.darwin],
  skipMac: [Platform.linux, Platform.win32],
  skipLinux: [Platform.darwin, Platform.win32],
}

type MethodOperation = 'skip' | 'only'

const methodOperations: MethodOperation[] = ['skip', 'only']

export function patch(currentPlatform: Platform) {
  function newDefinition<T>(method: T, expectedPlatform: keyof Command, fallbackImplem: T ) : T {
    if ((AVAILABLE_PLATFORMS[expectedPlatform] as Platform[] | undefined)?.indexOf(currentPlatform) !== -1) {
      return method
    } else {
      return fallbackImplem
    }
  }

  (Object.keys(AVAILABLE_PLATFORMS) as (keyof Command)[]).forEach(platform => {
    ;[describe, it, test].forEach(method => {
      method[platform] = newDefinition<JestTestOrSuite>(method, platform, method.skip)
      method[platform].each = newDefinition<jest.Each>(method.each, platform, method.skip.each)

      methodOperations.forEach((mode) => {
        method[platform][mode] = newDefinition<JestTestOrSuite>(method[mode], platform, method.skip)
        method[platform][mode].each = newDefinition<jest.Each>(method[mode].each, platform, method.skip.each)
      })
    })
  })
}
