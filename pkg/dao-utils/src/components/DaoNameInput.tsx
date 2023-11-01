import { InputGroup, InputRightElement } from '@chakra-ui/react';
import { Input } from 'commons-ui/src/components/Input';
import { useIsRegisteredDaoWithApp } from '../..';
import { useEffect } from 'react';
import FetchingInputIcon from './FetchingInputIcon';

export default function DaoNameInput({
  daoName,
  debounceDelay = 500,
  setDaoName,
  isInvalid = false,
  requiredApp,
}: {
  daoName: string;
  debounceDelay?: number;
  setDaoName: (daoName: {name: string, daoExists: boolean | undefined, appIsInstalled: boolean | undefined}) => void;
  isInvalid?: boolean;
  requiredApp?: string;
}) {

  // Remove all non-alphanumeric characters from the DAO name
  daoName = daoName.replaceAll(/[^a-z0-9]+/g, '');

  const { isLoading, daoExists, appIsInstalled } = useIsRegisteredDaoWithApp(daoName, requiredApp, debounceDelay);

  function handleNameChange(name: string) {
    setDaoName({name, daoExists: undefined, appIsInstalled: undefined});
  }

  useEffect(() => {
    setDaoName({ name: daoName, daoExists, appIsInstalled });
  }, [daoName, daoExists, appIsInstalled, setDaoName]);

  const _isInvalid = !!daoName && !isLoading && isInvalid;

  return (
    <InputGroup mt="0" w="408px">
      <Input
        placeholder="Enter DAO name"
        value={daoName}
        autoFocus={true}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNameChange(e.target.value)}
        errorBorderColor='red.500'
        isInvalid={_isInvalid}
        borderRadius="8px"
      />
      <InputRightElement>
        <FetchingInputIcon isLoading={isLoading} isInvalid={daoName ? _isInvalid : undefined} />
      </InputRightElement>
    </InputGroup>
  )
}
