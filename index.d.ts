declare module jest {
  export interface Describe {
    onWindows: jest.Describe
    onMac: jest.Describe
    onLinux: jest.Describe
    skipWindows: jest.Describe
    skipMac: jest.Describe
    skipLinux: jest.Describe
  }

  export interface It {
    onWindows: jest.It
    onMac: jest.It
    onLinux: jest.It
    skipWindows: jest.It
    skipMac: jest.It
    skipLinux: jest.It
  }
}
