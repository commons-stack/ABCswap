import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import fonts from "./fonts";

import Button from "./components/button";
import Input from "./components/input";
import Slider from "./components/slider";

const theme = extendTheme({ 
    colors,
    fonts,
    components: {
        Button,
        Input,
        Slider,
    },
});

export default theme;