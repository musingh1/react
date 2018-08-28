import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as _ from 'lodash'
import CSSProperties = React.CSSProperties

import {
  childrenExist,
  customPropTypes,
  UIComponent,
  IRenderResultConfig,
  isBrowser,
} from '../../lib'
import { ComponentVariablesInput, IComponentPartStylesInput } from '../../../types/theme'
import { ItemShorthand, Extendable } from '../../../types/utils'
import Portal from '../Portal'
import PopupContent from './PopupContent'

type PopupPosition =
  | 'top start'
  | 'top end'
  | 'bottom start'
  | 'bottom end'
  | 'start center'
  | 'end center'
  | 'top center'
  | 'bottom center'

const POSITIONS: PopupPosition[] = [
  'top start',
  'top end',
  'bottom start',
  'bottom end',
  'start center',
  'end center',
  'top center',
  'bottom center',
]

export interface IPopupProps {
  as?: any
  basic?: boolean
  className?: string
  content?: ItemShorthand | ItemShorthand[]
  position?: PopupPosition
  styles?: IComponentPartStylesInput
  trigger: JSX.Element
  variables?: ComponentVariablesInput
}

export interface IPopupState {
  styles?: CSSProperties
}

/**
 * A Popup displays additional information on top of a page.
 * @accessibility This is example usage of the accessibility tag.
 * This should be replaced with the actual description after the PR is merged
 */
export default class Popup extends UIComponent<Extendable<IPopupProps>, IPopupState> {
  private popupOffset = 8
  private triggerRef: HTMLElement
  private popupCoords: ClientRect | DOMRect | undefined

  public static displayName = 'Popup'
  public static className = 'ui-popup'
  public static Content = PopupContent

  public static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Basic CSS styling for the popup */
    basic: PropTypes.bool,

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Simple text content for the popover. */
    content: customPropTypes.itemShorthand,

    /** Position for the popup. */
    position: PropTypes.oneOf(POSITIONS),

    /** Element to be rendered in-place where the popup is defined. */
    trigger: PropTypes.node.isRequired,

    /** Custom styles to be applied for component. */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

    /** Custom variables to be applied for component. */
    variables: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  public static handledProps = [
    'as',
    'basic',
    'children',
    'className',
    'content',
    'position',
    'styles',
    'trigger',
    'variables',
  ]

  public static defaultProps = {
    position: 'top start',
  }

  public state = { styles: {} }

  public renderComponent({ classes, rest }: IRenderResultConfig<IPopupProps>): React.ReactNode {
    const { basic, children, content, trigger } = this.props
    const { styles } = this.state

    return (
      <Portal
        className={classes.root}
        onMount={this.handlePortalMount}
        trigger={trigger}
        triggerRef={this.handleTriggerRef}
        {...rest}
      >
        <Popup.Content basic={basic} triggerRef={this.handlePopupRef} styles={{ root: styles }}>
          {childrenExist(children) ? children : content}
        </Popup.Content>
      </Portal>
    )
  }

  private computePopupStyle(): CSSProperties {
    const style: CSSProperties = {}
    const popupCoords = this.popupCoords

    if (!isBrowser() || !popupCoords) {
      return style
    }

    const context = this.getContext()
    const coords = context && context.getBoundingClientRect()

    if (!coords) {
      return style
    }

    const { pageYOffset, pageXOffset } = window
    const { clientWidth, clientHeight } = document.documentElement
    const { position } = this.props
    const popupOffset = this.props.basic ? 0 : this.popupOffset

    if (_.includes(position, 'end')) {
      style.right = Math.round(clientWidth - (coords.right + pageXOffset))
    } else if (_.includes(position, 'start')) {
      style.left = Math.round(coords.left + pageXOffset)
    } else {
      // if not start nor end, we are horizontally centering the element
      const xOffset = (coords.width - popupCoords.width) / 2
      style.left = Math.round(coords.left + xOffset + pageXOffset)
    }

    if (_.includes(position, 'top')) {
      style.bottom = Math.round(clientHeight - (coords.top + pageYOffset)) + popupOffset
    } else if (_.includes(position, 'bottom')) {
      style.top = Math.round(coords.bottom + pageYOffset) + popupOffset
    } else {
      // if not top nor bottom, we are vertically centering the element
      const yOffset = (coords.height + popupCoords.height) / 2
      style.top = Math.round(coords.bottom + pageYOffset - yOffset)

      const xOffset = popupCoords.width + popupOffset
      if (_.includes(position, 'end')) {
         (style.right as number) -= xOffset
      } else {
         (style.left as number) -= xOffset
      }
    }

    // Append 'px' to every numerical values in the styles
    return _.mapValues(style, value => (_.isNumber(value) ? `${value}px` : value))
  }

  private setPopupStyle() {
    const styles = this.computePopupStyle()

    if (!_.isEmpty(styles)) {
      this.setState({ styles })
    }
  }

  private handlePortalMount = () => {
    this.setPopupStyle()
  }

  private handlePopupRef = (popupRef: HTMLElement) => {
    this.popupCoords = popupRef && popupRef.getBoundingClientRect()
    this.setPopupStyle()
  }

  private handleTriggerRef = (triggerRef: HTMLElement) => {
    this.triggerRef = triggerRef
  }

  private getContext = (): HTMLElement => this.triggerRef
}
