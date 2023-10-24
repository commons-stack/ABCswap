import { InputGroup, InputRightElement } from '@chakra-ui/react';
import { Input } from 'commons-ui/src/components/Input';
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
  const { isRegistered: isDaoRegistered, isLoading } = useIsRegisteredDaoWithApp(daoName, requiredApp, debounceDelay);

  function handleNameChange(name: string) {
    setDaoName({name, isRegistered: undefined});
  }

  useEffect(() => {
    setDaoName({ name: daoName, isRegistered: isDaoRegistered });
  }, [isDaoRegistered, daoName, setDaoName]);

  const isInvalid = !!daoName && !isLoading && (!inverted && !isDaoRegistered || inverted && isDaoRegistered);

  return (
    <InputGroup mt="0" w="408px">
      <Input
        placeholder="Enter the DAO's name or contract address"
        value={daoName}
        autoFocus={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value)}
        errorBorderColor='red.500'
        isInvalid={isInvalid}
        borderRadius="8px"
      />
      <InputRightElement>
        <FetchingInputIcon isLoading={isLoading} isInvalid={daoName ? isInvalid : undefined} />
      </InputRightElement>
    </InputGroup>
  )
}
