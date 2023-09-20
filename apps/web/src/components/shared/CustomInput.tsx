import { Input } from "@chakra-ui/react";
import "./CustomInput.css";

export default function CustomInput(props: any) {
    return (
        <Input
            className="custom-input"
            bg="white"
            color="black"
            border="1px solid"
            borderRight="none"
            borderRadius="15px"
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            paddingY="12px"
            paddingX="24px"
            fontWeight="bold"
            _hover={{
                border: "1px solid",
                borderRight: "none",
            }}
            {...props}
        >
            {props.children}
        </Input>
    );
}
