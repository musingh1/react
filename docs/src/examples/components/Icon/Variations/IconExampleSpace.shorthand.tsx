import React from 'react'
import { Icon, Label } from '@stardust-ui/react'

const IconExampleSpace = () => (
  <div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="Default" />
      <Icon svg name="umbrella" size="big" />
      <Label content="Default" />
    </div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="Before" />
      <Icon svg name="umbrella" xSpacing="before" size="big" />
      <Label content="Before" />
    </div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="After" />
      <Icon svg name="umbrella" xSpacing="after" size="big" />
      <Label content="After" />
    </div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="Both" />
      <Icon svg name="umbrella" xSpacing="both" size="big" />
      <Label content="Both" />
    </div>
    <div style={{ marginBottom: '1.2rem' }}>
      <Label content="None" />
      <Icon svg name="umbrella" xSpacing="none" size="big" />
      <Label content="None" />
    </div>
  </div>
)

export default IconExampleSpace
