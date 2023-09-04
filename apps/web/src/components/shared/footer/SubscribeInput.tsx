import { Input } from "@chakra-ui/react";
import "./SubscribeInput.css";

export default function SubscribeInput(props: any) {
    return (
        <Input
            className="subscribe-input"
            bg="brand.900"
            color="brand.500"
            border="1px solid"
            borderRadius="none"
            paddingY="12px"
            paddingX="24px"
            fontWeight="bold"
            _hover={{
                bg: "brand.700",
            }}
            {...props}
        >
            {props.children}
        </Input>
    );
}
