import { Divider, Button, FormControl, FormLabel, HStack, InputGroup, InputRightElement, Text, VStack, Tooltip } from "@chakra-ui/react";
import { InfoOutlineIcon, DeleteIcon, AttachmentIcon, AddIcon } from '@chakra-ui/icons';
import React from 'react';
import ImportCSVButton from "../ImportCSVButton";
import { csvStringToArray } from "../../utils/csv-utils";
import { formatUnits, isAddress, parseUnits } from "viem";
import { Input, NumberInput, NumberInputField } from "commons-ui/src/components/Input";
import { useTokenHoldersAtom, useTokenNameAtom, useTokenSymbolAtom, useInitialTotalSupplyValue } from "../../store";

export default function ConfigureToken() {

    const [tokenName, setTokenName] = useTokenNameAtom();
    const [tokenSymbol, setTokenSymbol] = useTokenSymbolAtom();
    const [tokenHolders, setTokenHolders] = useTokenHoldersAtom();
    const initialTotalSupply = useInitialTotalSupplyValue();

    function handleChangeTokenName(tokenName: string) {
        setTokenName(tokenName);
    }

    function handleChangeTokenSymbol(tokenSymbol: string) {
        setTokenSymbol(tokenSymbol);
    }

    function handleHolderChange(index: number, value: string, isAddress: boolean) {

        setTokenHolders((tokenHolders: [string, string][]) => {
            const holders = [...tokenHolders];
            let [address, balance] = holders[index];
            if (isAddress) {
                address = value;
            } else {
                balance = value;
            }
            holders.splice(index, 1, [address, balance]);
            return holders;
        });
    }

    function handleAddEmptyHolder() {
        setTokenHolders(tokenHolders => [...tokenHolders, ['', '']]);
    }

    function handleRemoveHolder(index: number) {
        setTokenHolders(tokenHolders => {
            const holders = [...tokenHolders];
            holders.splice(index, 1);
            return holders;
        });
    }

    function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
        const isEmpty = tokenHolders.length === 1 && tokenHolders[0][0] === '' && tokenHolders[0][1] === ''
        if (isEmpty) { // Only paste a CSV on a blank state, otherwise paste normally
            e.preventDefault();
            handleImportCSV(e.clipboardData.getData('Text'));
        }
    }

    function handleImportCSV(csv: string) {
        if (!csv) return;
        const array = csvStringToArray(csv);
        const processAddress = (address: string) => address.trim() || '';
        const processBalance = (balance: string) => !isNaN(Number(balance)) && formatUnits(parseUnits(balance, 18), 18) || '';
        const tokenHolders: [string, string][] = array.map(([address, balance]) => [processAddress(address), processBalance(balance)]);
        setTokenHolders(tokenHolders);
    }

    function deleteAll() {
        setTokenHolders([['', '']]);
    }

    return (
        <VStack spacing={4} pt="75px" mx="100px">
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
                                value={tokenName}
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
                                value={tokenSymbol}
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
                        {tokenHolders.map(([address], i) => (
                            <InputGroup key={i} mb="17px">
                                <Input
                                    name="address"
                                    placeholder="Enter address"
                                    isInvalid={!!address && !isAddress(address)}
                                    errorBorderColor='red.500'
                                    value={address}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        handleHolderChange(i, e.target.value, true)
                                    }
                                    onPaste={handlePaste}
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
                        {tokenHolders.map(([, balance], i) => (
                            <InputGroup mb="17px" key={i}>
                                <NumberInput value={balance} width='100%'>
                                    <NumberInputField
                                        name="balance"
                                        placeholder="Enter balance"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleHolderChange(i, e.target.value, false)}
                                    />
                                </NumberInput>
                            </InputGroup>
                        ))}
                    </FormControl>
                </HStack>
                <HStack w="60%" alignSelf="start" spacing={3}>
                    <Button leftIcon={<AddIcon />} onClick={() => handleAddEmptyHolder()}>
                        Add more
                    </Button>
                    <ImportCSVButton leftIcon={<AttachmentIcon />} onImport={handleImportCSV}>
                        Import CSV
                    </ImportCSVButton>
                    <Button variant="outline" leftIcon={<DeleteIcon />} onClick={() => deleteAll()}>
                        Delete all
                    </Button>
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
                <Text mr="10px" as="b" color="brand.900">{initialTotalSupply} {tokenSymbol}</Text>
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

