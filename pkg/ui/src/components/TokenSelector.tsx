import { HStack, StackProps, Text } from '@chakra-ui/react';
export interface TokenSelectorProps extends StackProps {
    token: {
        address: `0x${string}`,
        symbol: string,
        decimals: number
    };
}

export const TokenSelector = ({ token, ...props }: TokenSelectorProps): JSX.Element => {
    return (
        <HStack w="106px" h="40px" border="1px solid black" borderRadius="30px" justifyContent="center" {...props}>
            {/* <img src={avatar ?? undefined} width="24px" height="24px" /> */}
            <Text color="brand.900">{token.symbol}</Text>
        </HStack>
    );
};