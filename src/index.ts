import { platform } from 'os'
import { patch } from './patch-jest'

const currentPlatform = platform()
patch(currentPlatform)
