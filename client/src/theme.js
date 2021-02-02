import { createMuiTheme } from '@material-ui/core/styles'
import { cyan } from '@material-ui/core/colors'
import { teal } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[400],
    },
    secondary: {
      main: teal[500],
    },
    background: {
      default: teal[100],
    },
  },
})

export default theme


