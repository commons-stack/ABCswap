import { VStack } from "@chakra-ui/react";
import MarkdownText from "commons-ui/src/components/MarkdownText"

interface LegalPageProps {
    src: string;
}

export default function LegalPage({ src }: LegalPageProps) {

    return (
        <VStack px="5%" pb="5%" color="brand.900" spacing={5} alignItems="flex-start" backgroundColor="brand.100">
            <MarkdownText src={src} />
        </VStack>
    )
}