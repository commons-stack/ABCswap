import ReactMarkdown from "react-markdown"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import MarkdownTheme from "../theme/markdown"
import { useEffect, useState } from "react";

interface MarkdownTextProps {
    src: string;
}

export default function MarkdownText({ src }: MarkdownTextProps) {
    const [markdown, setMarkdown] = useState('Loading...');

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        (async () => {
            try {
                const response = await fetch(src, { signal });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const markdown = await response.text();
                setMarkdown(markdown);
            } catch (error) {
                if ((error as Error).name !== "AbortError") {
                    console.error(error);
                    setMarkdown("Error loading legal information");
                }
            }
        })();

        return () => {
            controller.abort();
        };
    }, [src]);

    return (
        <ReactMarkdown
            children={markdown}
            components={ChakraUIRenderer(MarkdownTheme)}
            skipHtml
        />
    )
}
