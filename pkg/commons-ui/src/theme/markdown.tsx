import { UnorderedList, OrderedList, ListItem, Code, Text, Divider, Link, Heading, Table, Thead, Tbody, Tr, Td, Th, Image } from '@chakra-ui/react';
import type {
    ListProps,
    ListItemProps,
    TextProps,
    CodeProps,
    HeadingProps,
    TableProps,
    TableHeadProps,
    TableBodyProps,
    LinkProps,
    ImageProps,
    TableRowProps,
    TableCellProps,
    TableColumnHeaderProps
} from '@chakra-ui/react';
import type { Components } from 'react-markdown';

const MarkdownTheme: Components = {
    p: (props: TextProps) => <Text mb={2}>{props.children}</Text>,
    em: (props: TextProps) => <Text as="em">{props.children}</Text>,
    blockquote: (props: CodeProps) => <Code as="blockquote" p={2}>{props.children}</Code>,
    code: (props: CodeProps) => <Code
        whiteSpace="break-spaces"
        display="block"
        w="full"
        p={2}
        {...props}
    />,
    del: (props) => <Text as="del">{props.children}</Text>,
    hr: () => <Divider />,
    a: (props : LinkProps) => <Link {...props} />,
    img: (props: ImageProps) => <Image {...props} />,
    text: (props) => <Text as="span">{props.children}</Text>,
    ul: (props: ListProps) => <UnorderedList {...props} />,
    ol: (props: ListProps) => <OrderedList {...props} />,
    li: (props: ListItemProps) => <ListItem {...props} />,
    h1: (props: HeadingProps) => <Heading as="h1" fontSize="72px" fontFamily="VictorSerifTrial" {...props} />,
    h2: (props: HeadingProps) => <Heading as="h2" fontSize="36px" fontFamily="VictorSerifTrial" {...props} />,
    h3: (props: HeadingProps) => <Heading as="h3" fontSize="24px" fontFamily="VictorSerifTrial" {...props} />,
    table: (props: TableProps) => <Table>{props.children}</Table>,
    thead: (props: TableHeadProps) => <Thead>{props.children}</Thead>,
    tbody: (props: TableBodyProps) => <Tbody>{props.children}</Tbody>,
    tr: (props: TableRowProps) => <Tr>{props.children}</Tr>,
    td: (props: TableCellProps) => <Td>{props.children}</Td>,
    th: (props: TableColumnHeaderProps) => <Th>{props.children}</Th>,
}

export default MarkdownTheme;