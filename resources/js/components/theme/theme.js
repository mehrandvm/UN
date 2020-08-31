import {createMuiTheme} from '@material-ui/core/styles';
import deepOrange from "@material-ui/core/colors/deepOrange";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#388e3c',
        },
        secondary: deepOrange,
    },
});

export default theme
