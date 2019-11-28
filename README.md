# Jest OS detection

This module allows you to specify on which OS your tests should run.
A common use case would be to have a CI running on different OS
(say mac and windows) but you want to have all your tests in the same file.
Unfortunately, some of your tests should only run on a specific platform
due to OS specific features.

All tests that should not be run on the current
platform will be automatically skipped.

## Install

```bash
# with npm
npm install jest-os-detection

# with yarn
yarn add jest-os-detection
```

## Setup

In your package.json

```json
"jest": {
    "setupFilesAfterEnv": ["jest-os-detection"],
  }
```

## Usage

```js
describe.onWindows('this describe is only interpreted on Windows', () => {
  it.onMac('this test is only interpreted on Mac', () => {})
  test.onLinux('this test is only interpreted on Linux', () => {})
  it.onMac.skip('this test is only interpreted on Mac but skipped', () => {})
  test.onLinux.skip('this test is only interpreted on Linux but skipped', () => {})
  it.onMac.only('only this test is executed on Mac', () => {})
  test.onLinux.only('only this test is executed on Linux', () => {})
})

describe.onWindows.each([1, 2, 3])('several describe on windows', describeValue => {
  it.onMac.each([1, 2, 3, 4])('several tests on windows', testValue => {})
  test.onLinux.each([1, 2, 3, 4])('several tests on windows', testValue => {})
  it.onMac.each.skip([1, 2, 3, 4])('several tests skipped on windows', testValue => {})
  test.onLinux.each.skip([1, 2, 3, 4])('several tests skipped on windows', testValue => {})
  it.onMac.each.only([1, 2, 3, 4])('only these tests will be executed on windows', testValue => {})
  test.onLinux.each.only([1, 2, 3, 4])('only these tests will be executed on windows', testValue => {})
})
```

## Supported features

Supported commands:
* `describe()`
* `it()`
* `test()`

Supported platform:
* `<command>.onWindows()`
* `<command>.onMac()`
* `<command>.onLinux()`
* `<command>.skipWindows()`
* `<command>.skipMac()`
* `<command>.skipLinux()`

Supported sub-commands:
* `<command>.<platform>.each()`
* `<command>.<platform>.only()`
* `<command>.<platform>.skip()`
* `<command>.<platform>.skip.each()`
* `<command>.<platform>.only.each()`
