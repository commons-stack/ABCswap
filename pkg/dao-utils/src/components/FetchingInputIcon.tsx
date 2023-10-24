import { Spinner } from '@chakra-ui/react'
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons'

export default function FetchingInputIcon({ isInvalid, isLoading, positiveIcon, negativeIcon, spinnerIcon }: {
    isInvalid?: boolean,
    isLoading: boolean,
    positiveIcon?: React.ReactElement,
    negativeIcon?: React.ReactElement,
    spinnerIcon?: React.ReactElement,
}) {
    return (
        isInvalid === undefined ? <></> :
        isLoading ? spinnerIcon ?? <Spinner size='xs' /> :
        isInvalid === false ? positiveIcon ?? <CheckCircleIcon color="brand.500" /> :
        negativeIcon ?? <WarningTwoIcon color="red.500" />
    )
}