import { Input, InputGroup, InputRightElement, Spinner } from '@chakra-ui/react';
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { useIsRegisteredDao } from '../..';
import { useEffect } from 'react';

function DaoNameInputIcon ({ daoName, inverted, isLoading, isDaoRegistered, error }: { daoName: string, inverted: boolean, isLoading: boolean, isDaoRegistered: boolean, error: boolean}) {
    return (
        daoName.length == 0 ? <></> :
        isLoading || isDaoRegistered === undefined ? <Spinner size='xs' /> :
        !error && (!inverted && isDaoRegistered || inverted && !isDaoRegistered) ? <CheckCircleIcon color="brand.500" /> :
        <WarningTwoIcon color="red.500" />
    )
}

export default function DaoNameInput({
  daoName,
  debounceDelay = 500,
  setDaoName,
  inverted = false
}: {
  daoName: string;
  debounceDelay?: number;
  setDaoName: (daoName: {name: string, isRegistered: boolean | undefined}) => void;
  inverted?: boolean;
}) {

  const { isRegistered: isDaoRegistered, error, isLoading } = useIsRegisteredDao(daoName, debounceDelay);

  useEffect(() => {
    setDaoName({ name: daoName, isRegistered: isDaoRegistered });
  }, [isDaoRegistered, setDaoName]);

  return (
    <InputGroup mt="0" w="408px">
      <Input
        placeholder="Enter the DAO's name or contract address"
        value={daoName ?? ''}
        autoFocus={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          /[a-z0-9]*/.test(e.target.value) && setDaoName({name: e.target.value, isRegistered: undefined});
        }}
        backgroundColor={'white'}
        errorBorderColor='red.500'
        borderColor={'black'}
        isInvalid={!inverted && !isDaoRegistered || inverted && isDaoRegistered}
        borderRadius="8px"
        _hover={{ 'color': 'black' }}
      />
      <InputRightElement>
        <DaoNameInputIcon daoName={daoName} inverted={inverted} isLoading={isLoading} isDaoRegistered={!!isDaoRegistered} error={!!error} />
      </InputRightElement>
    </InputGroup>
  )
}
