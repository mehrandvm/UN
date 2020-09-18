import {createMuiTheme} from '@material-ui/core/styles';
import deepOrange from "@material-ui/core/colors/deepOrange";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
    direction: 'ltr',
    palette: {
        primary: blue,
        secondary: deepOrange,
    },
});

export const themeRTL = createMuiTheme({
    direction: 'rtl',
    typography: {
        fontFamily: '"IRANSans", serif',
    },
    palette: {
        primary: blue,
        secondary: deepOrange,
    },
});

export default theme
