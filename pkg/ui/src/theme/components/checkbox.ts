import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const baseStyle = definePartsStyle({
  control: {
    bg: 'white',
    border: '1px solid black !important',
    // outline: '1px solid',
  },
})

const Checkbox = defineMultiStyleConfig({ baseStyle });

export default Checkbox;