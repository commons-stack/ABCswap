import {
  useIsValidAbcValue,
  useIsValidIsCheckedValue,
  useIsValidNameValue,
  useIsValidTokenValue,
  useIsValidVotingValue,
} from "../store";

export default function useIsValid(type: 'new-dao' | 'existing-dao') {
  if (type === 'new-dao') {
    return (step: number) => {
      switch (step) {
        case 0:
          return useIsValidNameValue('non-registered');
        case 1:
          return useIsValidVotingValue();
        case 2:
          return useIsValidTokenValue();
        case 3:
          return useIsValidAbcValue();
        case 4:
          return useIsValidIsCheckedValue();
        default:
          return false;
      }
    };
  } else {
    return (step: number) => {
      switch (step) {
        case 0:
          return useIsValidNameValue('registered-without-abc');
        case 1:
          return useIsValidAbcValue();
        case 2:
          return useIsValidIsCheckedValue();
        default:
          return false;
      }
    };
  }
}
