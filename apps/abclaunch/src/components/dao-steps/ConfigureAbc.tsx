import { Divider, Button, FormControl, FormLabel, HStack, InputGroup, Input, InputRightElement, Text, VStack, Image, Tooltip, Menu, MenuButton, MenuList, Flex, MenuItem } from "@chakra-ui/react";
import { InfoOutlineIcon, ChevronDownIcon, WarningTwoIcon } from '@chakra-ui/icons';
import React from 'react';
import { useRecoilState } from "recoil";
import { newDaoAbcState } from "../../recoil";
import { collateralTokenList, getCollateralTokenInfo } from "../../utils/token-info";
import { BalanceInput } from "dao-utils";

interface ConfigureABCProps {
    abcHelper: () => JSX.Element;
}

export default function ConfigureAbc({abcHelper}: ConfigureABCProps) {

    const [abcSettings, setAbcSettings] = useRecoilState(newDaoAbcState);

    const enoughBalance = abcSettings.reserveInitialBalanceIsEnough !== false;

    function handleReserveRatioChange(reserveRatio: string) {
        /^\d*\.?\d*$/.test(reserveRatio) && setAbcSettings(settings => ({ ...settings, reserveRatio }));
    }

    function handleCollateralTokenChange(collateralToken: string) {
        setAbcSettings(settings => ({ ...settings, collateralToken }));
    }

    function handleInitialReserveChange({ value, isEnough }: { value: string, isEnough: boolean | undefined }) {
        (value !== abcSettings.reserveInitialBalance || isEnough !== abcSettings.reserveInitialBalanceIsEnough) &&
            setAbcSettings(settings => ({ ...settings, reserveInitialBalance: value, reserveInitialBalanceIsEnough: isEnough }));
    }

    function handleEntryTributeChange(entryTribute: string) {
        /^\d*\.?\d*$/.test(entryTribute) && setAbcSettings(settings => ({ ...settings, entryTribute }));
    }

    function handleExitTributeChange(exitTribute: string) {
        /^\d*\.?\d*$/.test(exitTribute) && setAbcSettings(settings => ({ ...settings, exitTribute }));
    }

    return (
        <VStack spacing={4} pt="75px">
            <Text fontFamily="VictorSerifTrial" fontSize="72px" color="brand.900">Augmented Bonding Curve</Text>
            <Text fontSize="24px" color="brand.900" pt="16px">Configure the DAO's ABC parameters</Text>
            <HStack w="100%">
                <VStack spacing={3} minW="340px" maxW="400px" w="100%" justifyContent="center">
                    <HStack alignSelf="start" w="100%">
                        <FormControl w="100%">
                            <FormLabel>
                                <HStack>
                                    <Text fontSize="16px" color="brand.900">RESERVE RATIO</Text>
                                    <Tooltip label="The Reserve Ratio is a ratio between the market cap of the token (token supply x unit price) and the value of the Initial Reserve Balance that will be fixed for the life of the Augmented Bonding Curve.">
                                        <InfoOutlineIcon />
                                    </Tooltip>
                                </HStack>
                            </FormLabel>
                            <HStack justifyContent="space-between">
                                <Button
                                    w="70px"
                                    onClick={() => handleReserveRatioChange("20")}
                                    variant={abcSettings.reserveRatio === '20' ? 'solid' : 'outline'}
                                >
                                    20%
                                </Button>
                                <Button
                                    w="70px"
                                    onClick={() => handleReserveRatioChange("50")}
                                    variant={abcSettings.reserveRatio === '50' ? 'solid' : 'outline'}
                                >
                                    50%
                                </Button>
                                <Button
                                    w="70px"
                                    onClick={() => handleReserveRatioChange("80")}
                                    variant={abcSettings.reserveRatio === '80' ? 'solid' : 'outline'}
                                >
                                    80%
                                </Button>
                                <InputGroup w="91px" display="inline-flex">
                                    <Input value={abcSettings.reserveRatio} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleReserveRatioChange(e.target.value)} />
                                    <InputRightElement children="%" />
                                </InputGroup>
                            </HStack>
                        </FormControl>
                    </HStack>
                    <FormControl>
                        <FormLabel>
                            <HStack>
                                <Text fontSize="16px" color="brand.900">INITIAL RESERVE BALANCE</Text>
                                <Tooltip label="The Initial Reserve Balance refers to the amount of tokens deposited into the Reserve Pool when the ABC is initialized.">
                                    <InfoOutlineIcon />
                                </Tooltip>
                            </HStack>
                        </FormLabel>
                        <HStack spacing={0}>
                            <Menu>
                                <MenuButton as={Button}
                                    color="brand.900"
                                    backgroundColor="white"
                                    w="193px"
                                    h="40px"
                                    border="1px solid"
                                    borderRight="1px solid"
                                    borderColor="brand.900"
                                    borderRadius="0"
                                    borderTopLeftRadius="8px"
                                    borderBottomLeftRadius="8px"
                                    rightIcon={<ChevronDownIcon />}
                                >
                                    {getCollateralTokenInfo(abcSettings.collateralToken)?.tokenSymbol && (
                                        <HStack justifyContent="center">
                                            <Image w="24px" h="24px" src={getCollateralTokenInfo(abcSettings.collateralToken)?.tokenIcon}></Image>
                                            <Text>{getCollateralTokenInfo(abcSettings.collateralToken)?.tokenSymbol}</Text>
                                        </HStack>
                                    )}
                                    {!getCollateralTokenInfo(abcSettings.collateralToken)?.tokenSymbol && (
                                        <Text>Select token</Text>
                                    )}
                                </MenuButton>
                                <MenuList>
                                    {collateralTokenList.map((token) => (
                                        <MenuItem key={token.tokenAddress} name={token.tokenAddress} value={token.tokenSymbol} onClick={(e) => handleCollateralTokenChange(e.currentTarget.name)}>
                                            <HStack>
                                                <Image src={token.tokenIcon} boxSize="24px" />
                                                <Text>{token.tokenSymbol}</Text>
                                            </HStack>
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </Menu>
                            <Flex>
                                <BalanceInput
                                    placeholder="Enter value"
                                    borderLeft="0"
                                    borderTopLeftRadius="0"
                                    borderBottomLeftRadius="0"
                                    value={abcSettings.reserveInitialBalance}
                                    token={abcSettings.collateralToken as `0x${string}`}
                                    decimals={getCollateralTokenInfo(abcSettings.collateralToken)?.decimals || 18}
                                    setValue={handleInitialReserveChange}
                                />
                            </Flex>
                        </HStack>
                    </FormControl>
                    <HStack spacing={8}>
                        <FormControl>
                            <FormLabel>
                                <HStack>
                                    <Text fontSize="16px" color="brand.900">ENTRY TRIBUTE</Text>
                                    <Tooltip label="The Entry Tribute (%) is the percentage of reserve currency that is sent to the Common Pool during any single minting event.">
                                        <InfoOutlineIcon />
                                    </Tooltip>
                                </HStack>
                            </FormLabel>
                            <InputGroup>
                                <Input value={abcSettings.entryTribute} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEntryTributeChange(e.target.value)} />
                                <InputRightElement children="%" />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel>
                                <HStack>
                                    <Text fontSize="16px" color="brand.900">EXIT TRIBUTE</Text>
                                    <Tooltip label="The Exit Tribute (%) is the percentage of reserve currency that is sent to the Common Pool during any single burning event.">
                                        <InfoOutlineIcon />
                                    </Tooltip>
                                </HStack>
                            </FormLabel>
                            <InputGroup>
                                <Input value={abcSettings.exitTribute} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleExitTributeChange(e.target.value)} />
                                <InputRightElement children="%" />
                            </InputGroup>
                        </FormControl>
                    </HStack>
                </VStack>
            </HStack>
            <Divider paddingTop="24px"
                borderColor="brand.900"
                borderBottomWidth="1px"
                width="100%"
                margin="0 auto"
            />
            {enoughBalance && <VStack mt="32px">
                {abcHelper()}
            </VStack>}
            {!enoughBalance &&
                <HStack mt="32px">
                    <WarningTwoIcon color="red.500" w="32px" h="32px" mr="8px" />
                    <VStack spacing={0} alignItems="start">
                        <Text fontSize="16px" color="brand.1200">You do not have the amount specified in Initial Reserve Balance in your wallet.</Text>
                        <Text fontSize="16px" color="brand.1200">You must have at least that much in your wallet in order to proceed.</Text>
                    </VStack>
                </HStack>
            }
        </VStack>
    )
}

