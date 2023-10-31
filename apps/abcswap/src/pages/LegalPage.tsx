import { VStack } from "@chakra-ui/react";
import LegalInfo from "../../../../pkg/commons-ui/src/components/LegalInfo"

interface LegalPageProps {
    legalMarkdown: string;
}

export default function LegalPage({ legalMarkdown }: LegalPageProps) {

    return (
        <VStack px="5%" pb="5%" color="brand.900" spacing={5} alignItems="flex-start" backgroundColor="brand.100">
            <LegalInfo legalMarkdown={legalMarkdown} />
        </VStack>
    )
}