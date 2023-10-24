import { InputGroup, InputRightElement } from '@chakra-ui/react';
import { useIsBalanceEnough } from '../..';
import { useEffect } from 'react';
import FetchingInputIcon from './FetchingInputIcon';
import { Input } from 'commons-ui/src/components/Input';

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
  const { isEnough, isLoading } = useIsBalanceEnough({value, token, decimals});

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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e.target.value)}
        errorBorderColor='red.500'
        isInvalid={isEnough === false}
        {...props}
      />
      <InputRightElement>
        <FetchingInputIcon isLoading={isLoading} isInvalid={value.length !== 0 && isEnough === false} positiveIcon={<></>} spinnerIcon={<></>} />
      </InputRightElement>
    </InputGroup>
  )
}
