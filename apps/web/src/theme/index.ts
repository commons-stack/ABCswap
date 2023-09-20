import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import fonts from "./fonts";

import Button from "./components/button";
import Slider from "./components/slider";

const theme = extendTheme({ 
    colors,
    fonts,
    components: {
        Button,
        Slider,
    },
});

export default theme;