import { Box, Button, InputGroup, Input, InputRightAddon, Text, VStack, HStack, IconButton, FormControl, FormLabel } from "@chakra-ui/react";
import { useState } from 'react'
import { CloseIcon } from "@chakra-ui/icons";

interface TokenHolder {
    address: string;
    balance: string;
}

interface TokenSettings {
    tokenName: string;
    tokenSymbol: string;
    tokenHolders: TokenHolder[];
}

interface TokenSettingProps {
    onTokenSettingsChanged: (data: TokenSettings) => void;
}

export default function TokenHoldersComponent({ onTokenSettingsChanged }: TokenSettingProps) {
    const [tokenSettings, setTokenSettings] = useState<TokenSettings>({
        tokenName: '',
        tokenSymbol: '',
        tokenHolders: []
    });

    function handleHolderChange(i: number, event: React.ChangeEvent<HTMLInputElement>, field: boolean) {
        const values = [...tokenSettings.tokenHolders];
        values[i] = { ...values[i], [field ? 'address' : 'balance']: event.target.value };
        setTokenSettings({ ...tokenSettings, tokenHolders: values });
        onTokenSettingsChanged({ ...tokenSettings, tokenHolders: values });
    }

    function handleRemoveHolder(i: number) {
        const values = [...tokenSettings.tokenHolders];
        if (values.length === 1) {
            values[i] = { address: '', balance: '' };
        } else {
            values.splice(i, 1);
        }
        setTokenSettings({ ...tokenSettings, tokenHolders: values });
        onTokenSettingsChanged({ ...tokenSettings, tokenHolders: values });
    }

    return (
        <Box borderWidth="1px" borderRadius="lg" padding="6" boxShadow="lg" width="50vw">
            <VStack spacing={4}>
                <Text fontSize="2xl" as="b" p="1rem" textAlign="center">Configure template</Text>
                <Text fontSize="xl" as="b" p="1rem" textAlign="center">Choose your token settings below</Text>
                <HStack width="90%">
                    <FormControl width="70%">
                        <FormLabel>Token name</FormLabel>
                        <Input
                            placeholder="My Organization Token"
                            value={tokenSettings.tokenName}
                            onChange={(e) => {
                                const newTokenSettings = {
                                    ...tokenSettings,
                                    tokenName: e.target.value,
                                };
                                setTokenSettings(newTokenSettings);
                                onTokenSettingsChanged(newTokenSettings);
                            }}
                        />
                    </FormControl>
                    <FormControl width="30%">
                        <FormLabel>Token symbol</FormLabel>
                        <Input
                            placeholder="MOT"
                            value={tokenSettings.tokenSymbol}
                            onChange={(e) => {
                                const newTokenSettings = {
                                    ...tokenSettings,
                                    tokenSymbol: e.target.value,
                                };
                                setTokenSettings(newTokenSettings);
                                onTokenSettingsChanged(newTokenSettings);
                            }}
                        />
                    </FormControl>
                </HStack>
                <HStack width="90%">
                    <FormControl width="70%">
                        <FormLabel>Token holders</FormLabel>
                        {tokenSettings.tokenHolders.map((holder, i) => (
                            <InputGroup key={i} p=".25rem">
                                <Input
                                    name="address"
                                    placeholder="Account address"
                                    value={holder.address}
                                    onChange={(event) =>
                                        handleHolderChange(i, event, true)
                                    }
                                />
                                <InputRightAddon>
                                    <IconButton
                                        aria-label="Delete"
                                        icon={<CloseIcon />}
                                        onClick={() => handleRemoveHolder(i)}
                                    />
                                </InputRightAddon>
                            </InputGroup>
                        ))}
                    </FormControl>
                    <FormControl width="30%">
                        <FormLabel>Balances</FormLabel>
                        {tokenSettings.tokenHolders.map((holder, i) => (
                            <InputGroup p=".25rem" key={i}>
                                <Input
                                    name="balance"
                                    value={holder.balance}
                                    onChange={(event) =>
                                        handleHolderChange(i, event, false)
                                    }
                                    type="number"
                                />
                            </InputGroup>
                        ))}
                    </FormControl>
                </HStack>
                <Button
                    onClick={() => {
                        const newHolders = [
                            ...tokenSettings.tokenHolders,
                            { address: '', balance: '' },
                        ];
                        const newTokenSettings = {
                            ...tokenSettings,
                            tokenHolders: newHolders,
                        };
                        setTokenSettings(newTokenSettings);
                        onTokenSettingsChanged(newTokenSettings);
                    }}
                >
                    Add holder
                </Button>
            </VStack>
        </Box>

    )
}

