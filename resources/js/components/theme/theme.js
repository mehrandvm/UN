import {createMuiTheme} from '@material-ui/core/styles';
import deepOrange from "@material-ui/core/colors/deepOrange";
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: deepOrange,
    },
});

export default theme
