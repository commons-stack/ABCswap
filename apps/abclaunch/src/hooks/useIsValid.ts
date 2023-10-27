import {
  useIsValidAbcValue,
  useIsValidIsCheckedValue,
  useIsValidNameValue,
  useIsValidTokenValue,
  useIsValidVotingValue,
} from "../store";

export default function useIsValid() {
  return (step: number) => {
    switch (step) {
      case 0:
        return useIsValidNameValue();
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
}
