import os from 'os'
import { patch } from './patch-jest'

const currentPlatform = os.platform()
patch(currentPlatform)
