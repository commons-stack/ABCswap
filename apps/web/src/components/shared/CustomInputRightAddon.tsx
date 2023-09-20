import { InputRightAddon } from "@chakra-ui/react";
import "./CustomInput.css";

export default function CustomInputRightAddon(props: any) {
    return (
        <InputRightAddon
            className="custom-input"
            bg="white"
            color="black"
            border="1px solid"
            borderRadius="15px"
            borderLeft="none !important"
            borderTopLeftRadius="0 !important"
            borderBottomLeftRadius="0 !important"
            paddingY="12px"
            paddingX="24px"
            fontWeight="bold"
            {...props}
        >
            {props.children}
        </InputRightAddon>
    );
}
