import { extendTheme } from "@chakra-ui/react";
import "@fontsource/roboto";

const theme = extendTheme({ 
    colors: {
        brand: {
            100: "#DFE0D7", // Background
            300: "#E8E9E3", // CS Cream
            500: "#00E046", // CS Chaman
            900: "#003C00" // CS Wisdom
        }
    }, 
    fonts: {
        heading: "VictorSerifTrial",
        body: "Roboto"
    }

});

export default theme;