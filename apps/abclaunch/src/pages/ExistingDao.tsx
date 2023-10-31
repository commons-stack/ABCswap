import { OrderedList, Text, VStack, ListItem } from '@chakra-ui/layout';
import { useNavigate } from 'react-router-dom';
import ConfigureAbc from '../components/dao-steps/ConfigureAbc';
import OrganizationName from '../components/dao-steps/OrganizationName';
import Summary from '../components/dao-steps/Summary';
import WizardHome from '../components/WizardHome';
import DaoStepper from '../components/DaoStepper';
import useIsValid from '../hooks/useIsValid';
import { useProcessTransactions } from 'transactions-modal';
import useLaunchSteps from '../hooks/useLaunchSteps';
import DaoLaunched from '../components/dao-steps/DaoLaunched';
import { StepType } from '../components/dao-steps/Summary';
import { useDaoCreatedAtom } from '../store';

function ABCHelper() {
    return (
        <>
            <VStack spacing={-1} alignItems="flex-start" maxW="813px">
                <Text>This is how the Initial Reserve Balance will be transferred:</Text>
                <OrderedList>
                    <ListItem>In order to submit this vote, you must approve that the DAO can remove the amount specified in the Initial Reserve Balance from your wallet. These funds will not be moved unless the vote passes.</ListItem>
                    <ListItem>When the DAO vote passes, the DAO will retrieve this amount from your wallet to sens to the Reserve Pool.</ListItem>
                    <ListItem>If the amount specified is no longer in your wallet, then the execution of the vote will fail and the ABC will not launch.</ListItem>
                </OrderedList>
                <Text mt="16px">The Reserve Ratio is fixed for the life of the ABC and cannot be changed.</Text>
            </VStack>
            
        </>
    )
}

interface AddAbcProps {
    isInsideWizard: boolean;
}

export default function ExistingDao({isInsideWizard}: AddAbcProps){
    const navigate = useNavigate();
    const isValid = useIsValid('existing-dao');
    const txSteps = useLaunchSteps();

    const [newDaoIsCreated, setNewDaoIsCreated] = useDaoCreatedAtom();

    const { processTransactions } = useProcessTransactions()

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

    if (!isInsideWizard) {
        return <WizardHome
        title={['Launch an ABC', 'on an existing DAO']}
        subtitle={['Configure the ABC and submit a', 'DAO vote to launch it!']}
            stepsInfo={stepsInfo}
            onButtonClick={() => navigate('/existing-dao/wizard')}
        />
    }

    return (
        <DaoStepper
            steps={steps}
            isValid={isValid}
            onComplete={() => processTransactions("Submit for vote", undefined, txSteps, true, undefined, () => {
                setNewDaoIsCreated(true)
            })}
            blockingComponent={newDaoIsCreated ? <DaoLaunched /> : undefined}
        />
    )
}