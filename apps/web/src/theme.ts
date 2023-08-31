import { extendTheme } from "@chakra-ui/react";
import "@fontsource/roboto";

const theme = extendTheme({
    colors: {
        brand: {
            300: "#E8E9E3", // CS Cream
            500: "#00E046", // CS Chaman
            900: "#003C00" // CS Wisdom
        }
    }, 
    fonts: {
        heading: "Roboto",
        body: "Roboto"
    }

});

export default theme;