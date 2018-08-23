import * as React from 'react'
import { isConformant } from 'test/specs/commonTests'

import Popup from 'src/components/Popup'

describe('Popup', () => {
  isConformant(Popup, { rendersPortal: true, requiredProps: { trigger: <button /> } })
})
