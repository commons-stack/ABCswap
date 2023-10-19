import { Divider, Button, FormControl, FormLabel, HStack, InputGroup, Input, InputRightElement, Text, VStack, Tooltip } from "@chakra-ui/react";
import { InfoOutlineIcon, DeleteIcon } from '@chakra-ui/icons';
import React from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { newDaoTokenState, newDaoTokenSupplyState } from "../../recoil";

export default function ConfigureToken() {

    const [tokenSettings, setTokenSettings] = useRecoilState(newDaoTokenState);
    const initialTotalSupply = useRecoilValue(newDaoTokenSupplyState);

    function handleChangeTokenName(tokenName: string) {
        setTokenSettings(settings => ({ ...settings, tokenName }));
    }

    function handleChangeTokenSymbol(tokenSymbol: string) {
        setTokenSettings(settings => ({ ...settings, tokenSymbol }));
    }

    function handleHolderChange(index: number, e: React.ChangeEvent<HTMLInputElement>, isAddress: boolean) {
        setTokenSettings(settings => {
            const tokenHolders = [...settings.tokenHolders];
            const holder: [string, string] = [tokenHolders[index][0], tokenHolders[index][1]];
            if (isAddress) {
                holder[0] = e.target.value;
            } else {
                holder[1] = e.target.value;
            }
            tokenHolders.splice(index, 1, holder);
            return { ...settings, tokenHolders };
        });
    }

    function handleAddEmptyHolder() {
        setTokenSettings(settings => ({ ...settings, tokenHolders: [...settings.tokenHolders, ['', '']] }));
    }

    function handleRemoveHolder(index: number) {
        setTokenSettings(settings => {
            const tokenHolders = [...settings.tokenHolders];
            tokenHolders.splice(index, 1);
            return { ...settings, tokenHolders };
        });
    }

    return (
        <VStack spacing={4} pt="75px" className="abcs-newdao-step-content" mx="100px">
            <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Token</Text>
            <Text fontSize="24px" color="brand.900" pt="16px">Configure the DAO's token parameters.</Text>
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
                                    <InfoOutlineIcon />
                                </Tooltip>
                            </HStack>
                        </FormLabel>
                        <InputGroup>
                            <Input
                                placeholder="Enter token name"
                                value={tokenSettings.tokenName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeTokenName(e.target.value);
                                }}
                            />
                        </InputGroup>
                    </FormControl>
                    <FormControl width="35%">
                        <FormLabel>
                            <HStack>
                                <Text fontSize="16px" color="brand.900">TOKEN SYMBOL</Text>
                                <Tooltip label="Token symbol or ticker is a shortened name (typically in capital letters) that refers to a token or coin on a trading platform. For example: ANT.">
                                    <InfoOutlineIcon />
                                </Tooltip>
                            </HStack>
                        </FormLabel>
                        <InputGroup>
                            <Input
                                placeholder="Enter symbol"
                                value={tokenSettings.tokenSymbol}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChangeTokenSymbol(e.target.value)
                                }}
                            />
                        </InputGroup>
                    </FormControl>
                </HStack>
                <HStack width="100%">
                    <FormControl width="65%">
                        <FormLabel>
                            <HStack>
                                <Text fontSize="16px" color="brand.900">TOKEN HOLDERS</Text>
                                <Tooltip label="Token holders are the individuals who will receive the initial token distribution.">
                                    <InfoOutlineIcon />
                                </Tooltip>
                            </HStack>
                        </FormLabel>
                        {tokenSettings.tokenHolders.map((holder, i) => (
                            <InputGroup key={i} mb="17px">
                                <Input
                                    name="address"
                                    placeholder="Enter address"
                                    value={holder[0]}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleHolderChange(i, e, true)
                                    }
                                />
                                <InputRightElement onClick={() => handleRemoveHolder(i)} >
                                    <DeleteIcon />
                                </InputRightElement>
                            </InputGroup>
                        ))}
                    </FormControl>
                    <FormControl width="35%">
                        <FormLabel>
                            <Text fontSize="16px" color="brand.900">BALANCES</Text>
                        </FormLabel>
                        {tokenSettings.tokenHolders.map((holder, i) => (
                            <InputGroup mb="17px" key={i}>
                                <Input
                                    name="balance"
                                    placeholder="Enter balance"
                                    value={holder[1]}
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
                <Text fontSize="16px" color="black">These settings will determine the name and symbol of the token that will be created for your organization.</Text>
                <Text fontSize="16px" color="black">Add members to define the initial distribution of this token.</Text>
            </VStack>
        </VStack >
    );
}

