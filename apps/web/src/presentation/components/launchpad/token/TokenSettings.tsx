import { CloseIcon } from "@chakra-ui/icons";
import { Button, FormControl, FormLabel, HStack, InputGroup, Text, VStack } from "@chakra-ui/react";
import React from 'react';
import { DAOCreationRepository } from "../../../../domain/repository/DAOCreationRepository";
import CustomInput from "../../shared/CustomInput";
import CustomInputRightAddon from "../../shared/CustomInputRightAddon";
import { useTokenSettingsModelController } from "./TokenSettingsModelController";

interface TokenSettingProps {
    onStepCompletionChanged: (completed: boolean) => void;
    daoCreationRepository : DAOCreationRepository;
}

export default function TokenHoldersComponent({ onStepCompletionChanged, daoCreationRepository }: TokenSettingProps) {
    
    const { 
        tokenSettings,
        handleHolderChange,
        handleRemoveHolder,
        handleAddEmptyHolder,
        handleChangeTokenName,
        handleChangeTokenSymbol
    } = useTokenSettingsModelController(daoCreationRepository, onStepCompletionChanged);

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
                            handleChangeTokenName(e.target.value);
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
                            handleChangeTokenSymbol(e.target.value)
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
                        handleAddEmptyHolder();
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

