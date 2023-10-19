import { defineStyleConfig } from '@chakra-ui/react';

const Heading = defineStyleConfig({
  variants: {
    "solid": {
      color: "brand.900",
      marginBottom: "1rem",
    },
  },
  defaultProps: {
    variant: "solid",
  },
});

export default Heading;
