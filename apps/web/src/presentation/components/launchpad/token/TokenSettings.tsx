import { Button, InputGroup, Text, VStack, HStack, FormControl, FormLabel } from "@chakra-ui/react";
import React, { useEffect, useState } from 'react'
import { CloseIcon } from "@chakra-ui/icons";
import CustomInput from "../../shared/CustomInput";
import CustomInputRightAddon from "../../shared/CustomInputRightAddon";

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
    onStepCompletionChanged: (completed: boolean) => void;
}

export default function TokenHoldersComponent({ onStepCompletionChanged }: TokenSettingProps) {
    const [tokenSettings, setTokenSettings] = useState<TokenSettings>({
        tokenName: '',
        tokenSymbol: '',
        tokenHolders: [{address: '', balance: ''}]
    });

    function handleHolderChange(i: number, event: React.ChangeEvent<HTMLInputElement>, field: boolean) {
        const values = [...tokenSettings.tokenHolders];
        values[i] = { ...values[i], [field ? 'address' : 'balance']: event.target.value };
        setTokenSettings({ ...tokenSettings, tokenHolders: values });
        localStorage.setItem('tokenSettings', JSON.stringify(tokenSettings));
    }

    function handleRemoveHolder(i: number) {
        const values = [...tokenSettings.tokenHolders];
        if (values.length === 1) {
            values[i] = { address: '', balance: '' };
        } else {
            values.splice(i, 1);
        }
        setTokenSettings({ ...tokenSettings, tokenHolders: values });
        localStorage.setItem('tokenSettings', JSON.stringify(tokenSettings));
    }

    useEffect(() => {
        const isCompleted = !!(tokenSettings.tokenName && tokenSettings.tokenSymbol && tokenSettings.tokenHolders.length > 0);
        if (onStepCompletionChanged) {
            onStepCompletionChanged(isCompleted);
        }
    }, [tokenSettings]);

    useEffect(() => {
        localStorage.getItem('tokenSettings') && setTokenSettings(JSON.parse(localStorage.getItem('tokenSettings')!));
    }, []);

    return (
        <VStack spacing={4} pt="130px">
            <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Tokens</Text>
            <Text fontSize="24px" color="brand.900" pt="32px">Choose your Tokens settings below</Text>
            {/* ADD DIVIDER */}
            <HStack width="100%">
                <FormControl width="70%">
                    <FormLabel>
                        <Text fontSize="16px" color="brand.900">TOKEN NAME</Text>
                    </FormLabel>
                    <CustomInput
                        placeholder="My Organization Token"
                        value={tokenSettings.tokenName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const newTokenSettings = {
                                ...tokenSettings,
                                tokenName: e.target.value,
                            };
                            setTokenSettings(newTokenSettings);
                        }}
                    />
                </FormControl>
                <FormControl width="30%">
                    <FormLabel>
                        <Text fontSize="16px" color="brand.900">TOKEN SYMBOL</Text>
                    </FormLabel>
                    <CustomInput
                        placeholder="MOT"
                        value={tokenSettings.tokenSymbol}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const newTokenSettings = {
                                ...tokenSettings,
                                tokenSymbol: e.target.value,
                            };
                            setTokenSettings(newTokenSettings);
                        }}
                    />
                </FormControl>
            </HStack>
            <HStack width="100%">
                <FormControl width="70%">
                    <FormLabel>
                        <Text fontSize="16px" color="brand.900">TOKEN HOLDERS</Text>
                    </FormLabel>
                    {tokenSettings.tokenHolders.map((holder, i) => (
                        <InputGroup key={i} mb="17px">
                            <CustomInput
                                rightAddon={true}
                                name="address"
                                placeholder="Account address"
                                value={holder.address}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleHolderChange(i, e, true)
                                }
                            />
                            <CustomInputRightAddon onClick={() => handleRemoveHolder(i)} >
                                <CloseIcon />
                            </CustomInputRightAddon>
                        </InputGroup>
                    ))}
                </FormControl>
                <FormControl width="30%">
                    <FormLabel>
                        <Text fontSize="16px" color="brand.900">BALANCES</Text>
                    </FormLabel>
                    {tokenSettings.tokenHolders.map((holder, i) => (
                        <InputGroup mb="17px" key={i}>
                            <CustomInput
                                name="balance"
                                value={holder.balance}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    handleHolderChange(i, e, false)
                                }
                                type="number"
                            />
                        </InputGroup>
                    ))}
                </FormControl>
            </HStack>
            <HStack w="45%" alignSelf="start" spacing={3}>
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
                    }}
                >
                    + Add more
                </Button>
                <Button>
                    Import xls
                </Button>
            </HStack>
        </VStack>
    )
}

