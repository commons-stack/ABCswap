import { Input, InputGroup, InputRightElement, Spinner } from '@chakra-ui/react';
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { useIsRegisteredDao } from '../..';

export default function DaoNameInput({ daoName, debounceDelay = 500, setDaoName}: { daoName: string, debounceDelay?: number, setDaoName: (daoName: string) => void }) {

    const { isRegistered: isDaoRegistered, error, isLoading } = useIsRegisteredDao(daoName, debounceDelay);

    const getDaoNameInputIcon = (): JSX.Element => {
        if (daoName.length == 0) return (<></>);
        if (isLoading) return (<Spinner size='xs' />);
        if (error) return (<WarningTwoIcon color="red.500" />);
        if (isDaoRegistered) return (<CheckCircleIcon color="brand.500" />);
        if (isDaoRegistered == undefined) return (<Spinner size='xs'/>);
        return <WarningTwoIcon color="red.500" />;
    }

    return (
        <InputGroup mt="0" w="408px">
            <Input
                placeholder="Enter the DAO's name or contract address"
                value={daoName ?? ''}
                autoFocus={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDaoName(e.target.value);
                }}
                backgroundColor={'white'}
                errorBorderColor='red.500'
                borderColor={'black'}
                isInvalid={!isDaoRegistered}
                borderRadius="8px"
                _hover={{ 'color': 'black' }}
            />
            <InputRightElement>
                {
                    getDaoNameInputIcon()
                }
            </InputRightElement>
        </InputGroup>
    )
}