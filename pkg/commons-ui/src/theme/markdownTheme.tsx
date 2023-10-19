import { Text, Heading, UnorderedList, ListItem, OrderedList } from '@chakra-ui/react';

export default {
    p: (props: any) => <Text {...props} />,
    h1: (props: any) => <Heading as="h1" {...props} />,
    h2: (props: any) => <Heading as="h2" {...props} />,
    h3: (props: any) => <Heading as="h3" {...props} />,
    ul: (props: any) => <UnorderedList {...props} />,
    li: (props: any) => <ListItem {...props} />,
    ol: (props: any) => <OrderedList {...props} />,
}
