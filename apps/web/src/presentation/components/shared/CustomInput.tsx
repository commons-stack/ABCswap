import { Input } from "@chakra-ui/react";
import "./CustomInput.css";


type CustomInputProps = {
    rightAddon?: boolean;
    children?: React.ReactNode;
    [x: string]: any; 
};

export default function CustomInput({ rightAddon, ...props }: CustomInputProps) {

    if(!rightAddon) {
        return (
            <Input
                className="custom-input"
                bg="white"
                color="black"
                border="1px solid"
                borderColor="brand.900"
                borderRadius="15px"
                paddingY="12px"
                paddingX="12px"
                fontWeight="bold"
                _hover={{
                    border: "1px solid",
                    borderRight: "none",
                }}
                min={0}
                {...props}
            >
                {props.children}
            </Input>
        );
    } else {
        return (
            <Input
                className="custom-input"
                bg="white"
                color="black"
                border="1px solid"
                borderColor="brand.900"
                borderRight="none"
                borderRadius="15px"
                borderTopRightRadius="0"
                borderBottomRightRadius="0"
                paddingY="12px"
                paddingX="12px"
                fontWeight="bold"
                _hover={{
                    border: "1px solid",
                    borderRight: "none",
                }}
                min={0}
                {...props}
            >
                {props.children}
            </Input>
        );
    }
}

