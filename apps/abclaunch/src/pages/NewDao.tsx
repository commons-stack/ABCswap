import { Text, VStack } from '@chakra-ui/react';
import ConfigureAbc from '../components/dao-steps/ConfigureAbc';
import ConfigureToken from '../components/dao-steps/ConfigureToken';
import ConfigureVoting from '../components/dao-steps/ConfigureVoting';
import OrganizationName from '../components/dao-steps/OrganizationName';
import Summary, { StepType } from '../components/dao-steps/Summary';
import { Provider } from 'jotai';
import Page from '../components/Page';

function ABCHelper(): JSX.Element {
    return (
        <>
            <VStack spacing={-1}>
                <Text fontSize="16px" color="black">When you launch this ABC, that amount specified in the Initial Reserve Balance will be transferred</Text>
                <Text fontSize="16px" color="black">from your wallet to the Reserve Pool. You can only proceed if your wallet contains funds equal to or</Text>
                <Text fontSize="16px" color="black">exceeding the specified Initial Reserve Balance.</Text>
            </VStack>
            <Text fontSize="16px" color="black" pt="16px">The Reserve Ratio is fixed for the life of the ABC and cannot be changed.</Text>
        </>
    )
}

export default function NewDao({ store }: { store: any }) {

    const steps = [
        { title: 'Name your DAO', component: <OrganizationName title="Name your DAO" isNew /> },
        { title: 'Configure voting', component: <ConfigureVoting /> },
        { title: 'Configure token', component: <ConfigureToken /> },
        { title: 'Configure ABC', component: <ConfigureAbc abcHelper={ABCHelper} /> },
        { title: 'Launch your DAO', component: <Summary steps={[StepType.ORGANIZATION_SETTINGS, StepType.VOTING_SETTINGS, StepType.TOKEN_SETTINGS, StepType.ABC_SETTINGS]} /> },
    ];

    const stepsInfo = [
        { image: '/launchpad/DAOName.svg', description: ['Name your', 'DAO'] },
        { image: '/launchpad/ConfigureVoting.svg', description: ['Configure', 'voting'] },
        { image: '/launchpad/ConfigureToken.svg', description: ['Configure', 'token'] },
        { image: '/launchpad/ConfigureABC.svg', description: ['Configure', 'ABC'] },
        { image: '/launchpad/LaunchDAO.svg', description: ['Launch', 'your DAO'] },
    ];

    const title = ['Create a new DAO and', 'launch your ABC'];
    const subtitle = ['... in just a few steps'];
    const clickUrl = '/new-dao/wizard';
    const txTitle = "Launch your DAO";

    return (
        <Provider store={store}>
            <Page
                type="new-dao"
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
