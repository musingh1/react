import { ICSSInJSStyle } from '../../../../../types/theme'
import { IChatMessageProps } from '../../../../components/Chat/ChatMessage'

const chatMessageStyles = {
  root: ({ props, variables }: { props: IChatMessageProps; variables: any }): ICSSInJSStyle => ({
    position: 'relative',
    padding: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    ...(props.mine
      ? {
          marginLeft: 'auto',
        }
      : {
          marginRight: 'auto',
        }),
    maxWidth: variables.messageWidth,
    color: 'rgb(64, 64, 64)',
    backgroundColor: props.mine ? variables.messageColorMine : variables.messageColor,
    borderRadius: '0.3rem',
  }),
}

export default chatMessageStyles
