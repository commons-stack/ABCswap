import { Box, Button, Checkbox, Flex, HStack, Icon, IconButton, Input, Link, NumberInput, NumberInputField, Text, Tooltip, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount, useBalance } from "wagmi";
import { RepeatIcon, InfoIcon, EditIcon } from '@chakra-ui/icons';
import { useProcessTransactions } from "transactions-modal";
import { useAbcInfo } from "../hooks/useAbcInfo";
import { formatUnits, parseUnits } from "viem";
import { useBondingCurvePrice } from "../hooks/useBondingCurvePrice";
import useSwapSteps from "../hooks/useSwapSteps";

export default function SimpleConvert() {

    const { dao } = useParams();
    const navigate = useNavigate();
    const { abcToken, reserveToken, bondingCurve } = {
        abcToken: {
            address: '0x571f2b23eb4666db617d9bae5725aedd72e2349f' as `0x${string}`,
            symbol: 'ABC',
            decimals: 18,
        },
        reserveToken: {
            address: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1' as `0x${string}`,
            symbol: 'DAI',
            decimals: 18,
        },
        bondingCurve: {
            address: '0xc36d0b658dc46fd6e9b5bd6bed7536aa3fa43dfd' as `0x${string}`,
        },
    };

    const { data: info } = useAbcInfo(bondingCurve.address)

    const entryTribute = info.buyFeePct || 0n;
    const exitTribute = info.sellFeePct || 0n;


    const [inverted, setInverted] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('');
    const [terms, setTerms] = useState<boolean>(false);

    const fromToken = inverted ? reserveToken : abcToken;
    const toToken = inverted ? abcToken : reserveToken;

    const { address } = useAccount();
    const { processTransactions } = useProcessTransactions();

    const steps = useSwapSteps(bondingCurve.address, reserveToken.address, inverted, parseUnits(amount, fromToken.decimals));

    const {data: fromTokenBalance} = useBalance({token: fromToken.address, address});
    const {data: toTokenBalance} = useBalance({token: toToken.address, address});

    const convertedAmount = useBondingCurvePrice(parseUnits(amount, fromToken.decimals), inverted, reserveToken.address, bondingCurve.address);
    const convertedAmountFormatted = convertedAmount ? formatUnits(convertedAmount, toToken.decimals) : '';
    const priceFirstUnit = useBondingCurvePrice(parseUnits("1", fromToken.decimals), inverted, reserveToken.address, bondingCurve.address);
    const unitaryPrice = convertedAmount ? convertedAmount * 10n ** BigInt(fromToken.decimals) / parseUnits(amount, fromToken.decimals) : priceFirstUnit;
    const invertedUnitaryPrice = unitaryPrice ? (10n ** BigInt(fromToken.decimals)) ** 2n / unitaryPrice : undefined;
    
    function invert() {
        setAmount((convertedAmount && formatUnits(convertedAmount, toToken.decimals) || '0'));
        setInverted(inverted => !inverted);
    }

    function handleSwap() {
        processTransactions(steps);
    }

    return (
        <VStack bg="brand.100" pb="100px">
            <HStack w="949px" h="97px" borderRadius="16px" bgColor="brand.300" mt="32px">
                <Box w="50%" ml="23px" border="1px solid" borderColor="brand.1000" bgColor="brand.1100" borderRadius="8px">
                    <HStack p="12px" justifyContent="space-between">
                        <Text>DAO</Text>
                        <HStack>
                            <Text fontWeight={'bold'}>{dao}</Text>
                            <IconButton onClick={() => navigate('/')} variant='icon' size="xs" colorScheme='brand' aria-label='Edit' icon={<Icon as={EditIcon} />} />
                        </HStack>
                    </HStack>
                </Box>
                <Box w="25%" border="1px solid" borderColor="brand.1000" bgColor="brand.1100" borderRadius="8px">
                    <HStack p="12px" justifyContent="space-between">
                        <HStack>
                            <Text>Entry Tribute</Text>
                            <Tooltip>
                                <InfoIcon />
                            </Tooltip>
                        </HStack>
                        <Text>{formatUnits(entryTribute, 16).toString()}%</Text>
                    </HStack>
                </Box>
                <Box w="25%" mr="23px" border="1px solid" borderColor="brand.1000" bgColor="brand.1100" borderRadius="8px">
                    <HStack p="12px" justifyContent="space-between">
                        <HStack>
                            <Text>Exit Tribute</Text>
                            <Tooltip>
                                <InfoIcon />
                            </Tooltip>
                        </HStack>
                        <Text>{formatUnits(exitTribute, 16).toString()}%</Text>
                    </HStack>
                </Box>
            </HStack>
            <VStack w="949px" h="446px" borderRadius="16px" bgColor="brand.300" mt="16px">
                <HStack>
                    <Box w="452px" h="268px" mt="31px" ml="19px" bgColor="white" borderRadius="16px">
                        <Text mt="24px" ml="31px">You Send</Text>
                        <HStack w="106px" h="40px" ml="26px" mt="16px" border="1px solid black" borderRadius="30px" justifyContent="center">
                            <Text color="brand.900">{fromToken.symbol}</Text>
                        </HStack>
                        <NumberInput mt='2' value={amount}>
                            <NumberInputField autoFocus onChange={(e) => /^\d*\.?\d*$/.test(e.target.value) && setAmount(e.target.value)} w="100%" ml="10px" mt="50px" fontSize="50px" border="none" placeholder='0' />
                        </NumberInput>
                        <VStack ml="26px" mt="8px" alignItems="initial">
                            <HStack>
                                <Text fontSize="14px">Balance: {fromTokenBalance?.formatted}</Text>
                                <Link as="b" fontSize="14px" onClick={() => setAmount(fromTokenBalance?.formatted || '0')}>Max</Link>
                            </HStack>
                            <Text as="b" fontSize="md" color="brand.900">1 {fromToken.symbol} = {formatUnits(unitaryPrice || 0n, toToken.decimals)} {toToken.symbol}</Text>
                        </VStack>
                    </Box>
                    <div style={{ width: '0px', position: 'relative' }}>
                        <IconButton
                            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                            onClick={invert}
                            isRound={true}
                            variant='icon'
                            colorScheme='brand'
                            aria-label='Invert'
                            fontSize='20px'
                            icon={<RepeatIcon
                                transition="transform .4s"
                                transform={inverted ? "rotate(180deg)" : undefined}
                            />}
                        />
                    </div>
                    <Box w="452px" h="268px" mt="31px" mr="19px" bgColor="white" borderRadius="16px">
                        <Text mt="24px" mr="31px" textAlign="right">You Receive</Text>
                        <HStack w="106px" h="40px" mr="26px" mt="16px" border="1px solid black" borderRadius="30px" justifyContent="center" marginLeft="auto">
                            <Text color="brand.900">{toToken.symbol}</Text>
                        </HStack>
                        <Flex direction="column" align="flex-end" mr="26px" mt="8px">
                            <Input w="100%" mt="50px" pr='0' value={convertedAmountFormatted} readOnly fontSize="50px" border="none" placeholder='0' textAlign="right" />
                            <VStack ml="26px" mt="8px" alignItems="end">
                                <Text fontSize="14px">Balance: {toTokenBalance?.formatted}</Text>
                                <Text as="b" fontSize="md" color="brand.900">1 {toToken.symbol} = {formatUnits(invertedUnitaryPrice || 0n, fromToken.decimals)} {fromToken.symbol}</Text>
                            </VStack>
                        </Flex>
                    </Box>
                </HStack>

                <Button w="912px" h="61px" borderRadius="8px" isActive={!Boolean(convertedAmount) || !terms} onClick={handleSwap}>
                    <Text as="b" color="white">Swap</Text>
                </Button>
                <HStack>
                    <Checkbox colorScheme="brand" isChecked={terms} onChange={(e) => setTerms(e.target.checked)}>
                        <Text mt="26px" as="b">By clicking on "Swap" you are accepting these terms</Text>
                    </Checkbox>
                </HStack>
            </VStack>
        </VStack>
    )
}
