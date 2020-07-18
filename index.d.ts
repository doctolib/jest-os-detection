declare module jest {
  export interface Describe {
    onWindows: jest.Describe | jest.It
    onMac: jest.Describe | jest.It
    onLinux: jest.Describe | jest.It
    skipWindows: jest.Describe | jest.It
    skipMac: jest.Describe | jest.It
    skipLinux: jest.Describe | jest.It
  }

  export interface It {
    onWindows: jest.Describe | jest.It
    onMac: jest.Describe | jest.It
    onLinux: jest.Describe | jest.It
    skipWindows: jest.Describe | jest.It
    skipMac: jest.Describe | jest.It
    skipLinux: jest.Describe | jest.It
  }
}
