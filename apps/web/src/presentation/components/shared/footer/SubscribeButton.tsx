import { Button } from "@chakra-ui/react";

export default function SubscribeButton(props: any) {
  return (
    <Button
      bg="brand.900"
      color="brand.500"
      border="1px solid"
      borderRadius="none"
      padding="12px 24px"
      fontWeight="bold"
      _hover={{
        bg: "brand.700",
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}