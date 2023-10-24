import {
    Input as ChakraInput,
    NumberInput as ChakraNumberInput,
    NumberInputField as ChakraNumberInputField
} from '@chakra-ui/react'

export function Input({children, ...props}: any) {
    return (
        <ChakraInput
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
}

export function NumberInput({ children, props }: any) {
    return (
        <ChakraNumberInput width="100%" {...props}>
            {children}
        </ChakraNumberInput>
    );
}

export function NumberInputField({children, ...props}: any) {
    return (
        <ChakraNumberInputField
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
}

