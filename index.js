import os from 'os'
import { patch } from './src/patch-jest'

const currentPlatform = os.platform()
patch(currentPlatform)
