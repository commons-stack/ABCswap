import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useIsRegisteredDaoWithApp } from '../..';
import { useEffect } from 'react';
import FetchingInputIcon from './FetchingInputIcon';

export default function DaoNameInput({
  daoName,
  debounceDelay = 500,
  setDaoName,
  inverted = false,
  requiredApp,
}: {
  daoName: string;
  debounceDelay?: number;
  setDaoName: (daoName: {name: string, isRegistered: boolean | undefined}) => void;
  inverted?: boolean;
  requiredApp?: string;
}) {

  // Remove all non-alphanumeric characters from the DAO name
  daoName = daoName.replaceAll(/[^a-z0-9]+/g, '');

  // TODO: use useIsRegisteredDao instead of useIsRegisteredDaoWithApp when requiredApp is undefined
  const { isRegistered: isDaoRegistered, error, isLoading } = useIsRegisteredDaoWithApp(daoName, requiredApp, debounceDelay);

  function handleNameChange(name: string) {
    setDaoName({name, isRegistered: undefined});
  }

  useEffect(() => {
    setDaoName({ name: daoName, isRegistered: isDaoRegistered });
  }, [isDaoRegistered, daoName, setDaoName]);

  return (
    <InputGroup mt="0" w="408px">
      <Input
        placeholder="Enter the DAO's name or contract address"
        value={daoName ?? ''}
        autoFocus={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value)}
        backgroundColor={'white'}
        errorBorderColor='red.500'
        borderColor={'black'}
        isInvalid={!inverted && !isDaoRegistered || inverted && isDaoRegistered}
        borderRadius="8px"
        _hover={{ 'color': 'black' }}
      />
      <InputRightElement>
        <FetchingInputIcon inputValue={daoName} inverted={inverted} isLoading={isLoading} fetched={!!isDaoRegistered} error={!!error} />
      </InputRightElement>
    </InputGroup>
  )
}
