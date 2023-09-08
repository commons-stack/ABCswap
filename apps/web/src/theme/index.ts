import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import fonts from "./fonts";

import Button from "./components/button";

const theme = extendTheme({ 
    colors,
    fonts,
    components: {
        Button,
    },
});

export default theme;