import { OrderedList, Text, VStack, ListItem } from '@chakra-ui/layout';
import ConfigureAbc from '../components/dao-steps/ConfigureAbc';
import OrganizationName from '../components/dao-steps/OrganizationName';
import Summary from '../components/dao-steps/Summary';
import { StepType } from '../components/dao-steps/Summary';
import { Provider } from 'jotai';
import Page from '../components/Page';

function ABCHelper() {
    return (
        <>
            <VStack spacing={-1} alignItems="flex-start" maxW="813px">
                <Text>This is how the Initial Reserve Balance will be transferred:</Text>
                <OrderedList>
                    <ListItem>In order to submit this vote, you must approve that the DAO can remove the amount specified in the Initial Reserve Balance from your wallet. These funds will not be moved unless the vote passes.</ListItem>
                    <ListItem>When the DAO vote passes, the DAO will retrieve this amount from your wallet to send to the Reserve Pool.</ListItem>
                    <ListItem>If the amount specified is no longer in your wallet, then the execution of the vote will fail and the ABC will not launch.</ListItem>
                </OrderedList>
                <Text mt="16px">The Reserve Ratio is fixed for the life of the ABC and cannot be changed.</Text>
            </VStack>
        </>
    )
}

export default function ExistingDao({ store }: { store: any }) {

    const steps = [
        { title: 'Select DAO', component: <OrganizationName title="Select your DAO" /> },
        { title: 'Configure ABC', component: <ConfigureAbc abcHelper={ABCHelper} /> },
        { title: 'Sumbit DAO Vote', component: <Summary steps={[StepType.ORGANIZATION_SETTINGS, StepType.ABC_SETTINGS]} /> },
    ];

    const stepsInfo = [
        { image: '/launchpad/DAOName.svg', description: ['Select your', 'DAO'] },
        { image: '/launchpad/ConfigureABC.svg', description: ['Configure', 'ABC'] },
        { image: '/launchpad/LaunchDAO.svg', description: ['Submit', 'DAO Vote'] },
    ];

    const title=['Launch an ABC', 'on an existing DAO'];
    const subtitle=['Configure the ABC and submit a', 'DAO vote to launch it!'];
    const clickUrl = '/existing-dao/wizard';
    const txTitle = "Create vote on your DAO.";

    return (
        <Provider store={store}>
            <Page
                type="existing-dao"
                steps={steps}
                stepsInfo={stepsInfo}
                title={title}
                subtitle={subtitle}
                clickUrl={clickUrl}
                txTitle={txTitle}
            />
        </Provider>
    )
}