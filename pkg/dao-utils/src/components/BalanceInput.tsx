import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useIsBalanceEnough } from '../..';
import { useEffect } from 'react';
import FetchingInputIcon from './FetchingInputIcon';

export default function BalanceInput({
  value,
  token,
  decimals,
  setValue,
  ...props
}: {
  value: string;
  token: `0x${string}`;
  decimals: number;
  setValue: (value: {value: string, isEnough: boolean | undefined}) => void;
} & Omit<React.ComponentProps<typeof Input>, 'onChange'>) {
  const { isEnough, error, isLoading } = useIsBalanceEnough({value, token, decimals});

  function handleValueChange(value: string) {
    setValue({value: value, isEnough: undefined});
  }

  useEffect(() => {
    setValue({ value, isEnough });
  }, [isEnough, value, setValue]);

  return (
    <InputGroup>
      <Input
        value={value}
        onChange={e => handleValueChange(e.target.value)}
        errorBorderColor='red.500'
        isInvalid={isEnough === false}
        {...props}
      />
      <InputRightElement>
        <FetchingInputIcon isLoading={isLoading} inputValue={value} fetched={isEnough} error={!!error} positiveIcon={<></>} spinnerIcon={<></>} />
      </InputRightElement>
    </InputGroup>
  )
}
