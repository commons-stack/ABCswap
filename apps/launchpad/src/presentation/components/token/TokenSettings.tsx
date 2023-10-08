import { Divider, Button, FormControl, FormLabel, HStack, InputGroup, Text, VStack, Image, Tooltip } from "@chakra-ui/react";
import React from 'react';
import { DAOCreationRepository } from "../../../domain/repository/DAOCreationRepository";
import CustomInput from "../../../../../shared/src/presentation/components/CustomInput";
import CustomInputRightAddon from "../../../../../shared/src/presentation/components//CustomInputRightAddon";
import { useTokenSettingsModelController } from "./TokenSettingsModelController";
import "../../../styles.css";

interface TokenSettingProps {
    onStepCompletionChanged: (completed: boolean) => void;
    daoCreationRepository: DAOCreationRepository;
}

export default function TokenHoldersComponent({ onStepCompletionChanged, daoCreationRepository }: TokenSettingProps) {

    const {
        tokenSettings,
        initialTotalSupply,
        handleHolderChange,
        handleRemoveHolder,
        handleAddEmptyHolder,
        handleChangeTokenName,
        handleChangeTokenSymbol
    } = useTokenSettingsModelController(daoCreationRepository, onStepCompletionChanged);

    return (
        <VStack spacing={4} pt="130px" className="abcs-newdao-step-content">
            <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Tokens</Text>
            <Text fontSize="24px" color="brand.900" pt="32px">Choose your Tokens settings below</Text>
            <Divider paddingTop="24px"
                borderColor="brand.900"
                borderBottomWidth="1px"
                width="100%"
                margin="0 auto"
            />
            <VStack width="90%">
                <HStack width="100%">
                    <FormControl width="65%">
                        <FormLabel>
                            <HStack>
                                <Text fontSize="16px" color="brand.900">TOKEN NAME</Text>
                                <Tooltip label="Token Name is the name you can assign to the token that will be minted when creating this organization.">
                                    <Image src="../../../../public/InformationIcon.svg" boxSize="16px" />
                                </Tooltip>
                            </HStack>
                        </FormLabel>
                        <CustomInput
                            placeholder="My Organization Token"
                            value={tokenSettings.tokenName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChangeTokenName(e.target.value);
                            }}
                        />
                    </FormControl>
                    <FormControl width="35%">
                        <FormLabel>
                            <HStack>
                                <Text fontSize="16px" color="brand.900">TOKEN SYMBOL</Text>
                                <Tooltip label="Token symbol or ticker is a shortened name (typically in capital letters) that refers to a token or coin on a trading platform. For example: ANT.">
                                    <Image src="../../../../public/InformationIcon.svg" boxSize="16px" />
                                </Tooltip>
                            </HStack>
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
                    <FormControl width="65%">
                        <FormLabel>
                            <HStack>
                                <Text fontSize="16px" color="brand.900">TOKEN HOLDERS</Text>
                                <Tooltip label="Token holders are the individuals who will receive the initial token distribution.">
                                    <Image src="../../../../public/InformationIcon.svg" boxSize="16px" />
                                </Tooltip>
                            </HStack>
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
                                    <Image src="../../../../public/Delete.svg" boxSize="16px" />
                                </CustomInputRightAddon>
                            </InputGroup>
                        ))}
                    </FormControl>
                    <FormControl width="35%">
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
                    {/*<Button>
                        Import xls
                    </Button>*/}
                </HStack>
            </VStack>
            <Divider paddingTop="24px"
                borderColor="brand.900"
                borderBottomWidth="1px"
                width="100%"
                margin="0 auto"
            />
            <HStack justifyContent="space-between" w="90%">
                <Text fontSize="16px" color="brand.900">INITIAL SUPPLY</Text>
                <Text mr="10px" as="b" color="brand.900">{initialTotalSupply}</Text>
            </HStack>
            <Divider paddingTop="0px"
                borderColor="brand.900"
                borderBottomWidth="1px"
                width="100%"
                margin="0 auto"
            />
            <VStack pt="32px" spacing={-1}>
                <Text fontSize="16px" color="black">Attention! The token name and symbol cannot easily be changed later.</Text>
                <Text fontSize="16px" color="black">Also, the above addresses will receive the initial token distribution, </Text>
                <Text fontSize="16px" color="black">the sum of which determines  the initial supply for the token.</Text>
            </VStack>
        </VStack>
    );
}

