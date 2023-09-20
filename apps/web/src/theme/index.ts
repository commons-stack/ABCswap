import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import fonts from "./fonts";

import Button from "./components/button";
import Select from "./components/select";
import Slider from "./components/slider";

const theme = extendTheme({ 
    colors,
    fonts,
    components: {
        Button,
        Select,
        Slider,
    },
});

export default theme;