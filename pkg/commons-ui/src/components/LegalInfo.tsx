import ReactMarkdown from "react-markdown"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import legalTheme from "../theme/legalTheme"

interface LegalInfoProps {
    legalMarkdown: string;
}

export default function LegalInfo({ legalMarkdown }: LegalInfoProps) {
    return (
        <ReactMarkdown
            children={legalMarkdown}
            components={ChakraUIRenderer(legalTheme)}
            skipHtml
        />
    )
}