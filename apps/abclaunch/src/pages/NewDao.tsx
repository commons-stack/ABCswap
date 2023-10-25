import { useNavigate } from 'react-router-dom';
import ConfigureAbc from '../components/dao-steps/ConfigureAbc';
import ConfigureToken from '../components/dao-steps/ConfigureToken';
import ConfigureVoting from '../components/dao-steps/ConfigureVoting';
import OrganizationName from '../components/dao-steps/OrganizationName';
import Summary from '../components/dao-steps/Summary';
import Wizard from '../components/Wizard';
import NewDaoStepper from '../components/NewDaoStepper';
import useIsValid from '../hooks/useIsValid';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { newDaoCreatedIsValid, newDaoCreatedState, newDaoNameState } from '../recoil';
import { useProcessTransactions } from 'transactions-modal';
import useLaunchSteps from '../hooks/useLaunchSteps';
import DaoLaunched from '../components/dao-steps/DaoLaunched';

export default function NewDao() {

    const navigate = useNavigate();
    const isValid = useIsValid();
    const txSteps = useLaunchSteps();

    const setNewDaoCreated = useSetRecoilState(newDaoCreatedState)
    const daoName = useRecoilValue(newDaoNameState)
    const newDaoHasBeenCreated = useRecoilValue(newDaoCreatedIsValid);

    const { processTransactions } = useProcessTransactions()

    const steps = [
        { title: 'Name your DAO', component: <OrganizationName /> },
        { title: 'Configure voting', component: <ConfigureVoting /> },
        { title: 'Configure token', component: <ConfigureToken /> },
        { title: 'Configure ABC', component: <ConfigureAbc /> },
        { title: 'Launch your DAO', component: <Summary /> },
    ];

    const stepsInfo = [
        { image: '/launchpad/DAOName.svg', description: ['Name your', 'DAO'] },
        { image: '/launchpad/ConfigureVoting.svg', description: ['Configure', 'voting'] },
        { image: '/launchpad/ConfigureToken.svg', description: ['Configure', 'token'] },
        { image: '/launchpad/ConfigureABC.svg', description: ['Configure', 'ABC'] },
        { image: '/launchpad/LaunchDAO.svg', description: ['Launch', 'your DAO'] },
    ];

    return (
        <>
            <Wizard
                type="new-dao"
                title={['Create a new DAO and', 'launch your ABC']}
                subtitle={['... in just a few steps']}
                stepsInfo={stepsInfo}
                onButtonClick={() => navigate('/new-dao/wizard')}
                stepper={<NewDaoStepper
                    steps={steps}
                    isValid={isValid}
                    onComplete={() => processTransactions("Launch your DAO", undefined, txSteps, true, undefined, () => {
                        setNewDaoCreated({ name: daoName.name })
                    })}
                    blockingComponent={newDaoHasBeenCreated ? <DaoLaunched /> : undefined}
                />}
            />
        </>
    )
}