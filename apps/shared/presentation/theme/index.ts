import { extendTheme } from "@chakra-ui/react";

import colors from "./colors";
import fonts from "./fonts";

import Button from "./components/button";
import Select from "./components/select";
import Slider from "./components/slider";
import Tooltip from "./components/tooltip";

const theme = extendTheme({ 
    colors,
    fonts,
    components: {
        Button,
        Select,
        Slider,
        Tooltip
    },
});

export default theme;