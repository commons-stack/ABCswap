import React from 'react';

import {
    Input as ChakraInput,
    NumberInput as ChakraNumberInput,
    NumberInputField as ChakraNumberInputField
} from '@chakra-ui/react'

export const Input = React.forwardRef(function Input({children, ...props}: any, ref: any) {
    return (
        <ChakraInput
            ref={ref}
            borderWidth="1px"
            _hover={{
                boxShadow: 'none',
                borderWidth: "1px",
            }}
            _focusVisible={{
                boxShadow: 'none',
            }}
            _invalid={{
                boxShadow: 'none',
                borderColor: 'red.500'
            }}
            {...props} >
            {children}
        </ChakraInput>
    );
});

export const NumberInput = React.forwardRef(function NumberInput({ children, ...props }: any, ref: any) {
    return (
        <ChakraNumberInput ref={ref} width="100%" {...props}>
            {children}
        </ChakraNumberInput>
    );
})

export const NumberInputField = React.forwardRef(function NumberInputField({children, ...props}: any, ref: any) {
    return (
        <ChakraNumberInputField
            ref={ref}
            borderWidth="1px"
            borderColor= 'brand.900'
            _hover={{
                boxShadow: 'none',
                borderWidth: "1px",
            }}
            _focusVisible={{
                boxShadow: 'none',
            }}
            _invalid={{
                boxShadow: 'none',
                borderColor: 'red.500'
            }}
            {...props}
        >
            {children}
        </ChakraNumberInputField>
    );
});

