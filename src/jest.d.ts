
declare module jest {
  interface Describe {
    onWindows: jest.Describe | jest.It,
    onMac: jest.Describe | jest.It,
    onLinux: jest.Describe | jest.It,
    skipWindows: jest.Describe | jest.It,
    skipMac: jest.Describe | jest.It,
    skipLinux: jest.Describe | jest.It
  }

  interface It {
    onWindows: jest.Describe | jest.It,
    onMac: jest.Describe | jest.It,
    onLinux: jest.Describe | jest.It,
    skipWindows: jest.Describe | jest.It,
    skipMac: jest.Describe | jest.It,
    skipLinux: jest.Describe | jest.It
  }

  // interface Each {
  //   each: jest.Describe | jest.It | jest.Each
  // }
}
