
import { extendTheme, theme } from '@chakra-ui/react'
import { APP_INFO } from './app/constants'

export default extendTheme({
    colors: {
        primary: theme.colors[APP_INFO.color],
    },
})