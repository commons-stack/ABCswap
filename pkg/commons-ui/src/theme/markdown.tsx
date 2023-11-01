import { List, UnorderedList, OrderedList, ListItem, ListProps, ListItemProps, TextProps, Text } from '@chakra-ui/react';

interface MarkdownThemeProps extends TextProps {
    children?: React.ReactNode;
}

interface MarkdownListProps extends ListProps {
    children?: React.ReactNode;
}

interface MarkdownListItemProps extends ListItemProps {
    children?: React.ReactNode;

}

const MarkdownTheme = {
    h1: (props: MarkdownThemeProps) => {
        const { children, ...rest } = props;
        return (
            <Text as="h1" fontSize="72px" fontFamily="VictorSerifTrial" {...rest}>
                {children}
            </Text>
        );
    },
    h2: (props: MarkdownThemeProps) => {
        const { children, ...rest } = props;
        return (
            <Text as="h2" fontSize="36px" fontFamily="VictorSerifTrial" {...rest}>
                {children}
            </Text>
        );
    },
    h3: (props: MarkdownThemeProps) => {
        const { children, ...rest } = props;
        return (
            <Text as="h3" fontSize="24px" fontFamily="VictorSerifTrial" {...rest}>
                {children}
            </Text>
        );
    },
    ul: (props: MarkdownListProps) => {
        const { children, ...rest } = props;
        return (
            <List>
                <UnorderedList {...rest}>
                    {children}
                </UnorderedList>
            </List>
        );
    },
    ol: (props: MarkdownListProps) => {
        const { children, ...rest } = props;
        return (
            <List>
                <OrderedList {...rest}>
                    {children}
                </OrderedList>
            </List>
        );
    },
    li: (props: MarkdownListItemProps) => {
        const { children, ...rest } = props;
        return (
            <ListItem {...rest}>
                {children}
            </ListItem>
        );
    }
}

export default MarkdownTheme;