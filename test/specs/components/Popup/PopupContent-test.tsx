// import * as React from 'react'
import { isConformant } from 'test/specs/commonTests'

import { PopupContent } from 'src/components/Popup'
// import Button from 'src/components/Button'

// const requiredProps = { trigger: <Button icon="expand" />}

describe('PopupContent', () => {
  isConformant(PopupContent, { rendersPortal: true })
})
