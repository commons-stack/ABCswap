import { Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ConfigureAbc from '../components/dao-steps/ConfigureAbc';
import ConfigureToken from '../components/dao-steps/ConfigureToken';
import ConfigureVoting from '../components/dao-steps/ConfigureVoting';
import OrganizationName from '../components/dao-steps/OrganizationName';
import Summary, { StepType } from '../components/dao-steps/Summary';
import WizardHome from '../components/WizardHome';
import DaoStepper from '../components/DaoStepper';
import useIsValid from '../hooks/useIsValid';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { newDaoCreatedIsValid, newDaoCreatedState, newDaoNameState } from '../recoil';
import { useProcessTransactions } from 'transactions-modal';
import useLaunchSteps from '../hooks/useLaunchSteps';
import DaoLaunched from '../components/dao-steps/DaoLaunched';

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

interface NewDaoProps {
    isInsideWizard: boolean;
}

export default function NewDao({ isInsideWizard }: NewDaoProps) {

    const navigate = useNavigate();
    const isValid = useIsValid();
    const txSteps = useLaunchSteps();

    const setNewDaoCreated = useSetRecoilState(newDaoCreatedState)
    const daoName = useRecoilValue(newDaoNameState)
    const newDaoHasBeenCreated = useRecoilValue(newDaoCreatedIsValid);

    const { processTransactions } = useProcessTransactions()

    const steps = [
        { title: 'Name your DAO', component: <OrganizationName title="Name your DAO" /> },
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

    if (!isInsideWizard) {
        return <WizardHome
            title={['Create a new DAO and', 'launch your ABC']}
            subtitle={['... in just a few steps']}
            stepsInfo={stepsInfo}
            onButtonClick={() => navigate('/new-dao/wizard')}
        />
    }

    return (
        <DaoStepper
            steps={steps}
            isValid={isValid}
            onComplete={() => processTransactions("Launch your DAO", undefined, txSteps, true, undefined, () => {
                setNewDaoCreated({ name: daoName.name })
            })}
            blockingComponent={newDaoHasBeenCreated ? <DaoLaunched /> : undefined}
        />
    )
}