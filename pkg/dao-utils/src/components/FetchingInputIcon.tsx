import { Spinner } from '@chakra-ui/react'
import { CheckCircleIcon, WarningTwoIcon } from '@chakra-ui/icons'

export default function FetchingInputIcon({ inputValue, inverted, isLoading, fetched, error, positiveIcon, negativeIcon, spinnerIcon }: {
    inputValue: string,
    inverted?: boolean,
    isLoading: boolean,
    fetched?: boolean,
    error: boolean,
    positiveIcon?: React.ReactElement,
    negativeIcon?: React.ReactElement,
    spinnerIcon?: React.ReactElement,
}) {
    return (
        !inputValue ? <></> :
            isLoading || fetched === undefined ? spinnerIcon ?? <Spinner size='xs' /> :
                !error && (!inverted && fetched || inverted && !fetched) ? positiveIcon ?? <CheckCircleIcon color="brand.500" /> :
                    negativeIcon ?? <WarningTwoIcon color="red.500" />
    )
}