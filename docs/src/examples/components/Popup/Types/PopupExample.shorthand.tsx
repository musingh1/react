import React from 'react'
import { Button, Popup } from '@stardust-ui/react'

const PopupExample = () => (
  <Popup trigger={<Button content="add" />} content="Add users to your feed" />
)

export default PopupExample
