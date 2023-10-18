import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
    createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
    group: {
        backgroundColor: 'white',
        borderColor: 'brand.900',
        borderRadius: '8px',
    },
    field: {
        color: 'brand.900',
    },
    element: {
        color: 'brand.900',
    }
})

const variants = {
    textRTL: definePartsStyle({
        group: {
            backgroundColor: 'white',
            border: "1px solid",
            borderColor: 'brand.900',
            borderRadius: '8px',
        },
        field: {
            color: 'brand.900',
        },
        element: {
            color: 'brand.900',
            direction: 'rtl',
            width: '35%',
        }
    }),
};

export const Input = defineMultiStyleConfig({ baseStyle, variants })