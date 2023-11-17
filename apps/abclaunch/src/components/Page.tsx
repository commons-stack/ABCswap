import { useLocation, useNavigate } from "react-router-dom";
import useIsValid from "../hooks/useIsValid";
import useLaunchSteps from "../hooks/useLaunchSteps";
import { useDaoCreatedAtom } from "../store";
import { useProcessTransactions } from "transactions-modal";
import WizardHome from "./WizardHome";
import DaoStepper from "./DaoStepper";
import DaoLaunched from "./dao-steps/DaoLaunched";

type PageProps = {
    type: 'new-dao' | 'existing-dao',
    steps: { title: string, component: JSX.Element }[],
    stepsInfo: { image: string, description: string[] }[],
    title: string[],
    subtitle: string[],
    clickUrl: string,
    txTitle: string,
}

export default function Page({type, steps, stepsInfo, title, subtitle, clickUrl, txTitle}: PageProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const isInsideWizard = location.pathname.includes('wizard');

    const isValid = useIsValid(type);
    const txSteps = useLaunchSteps();

    const [newDaoIsCreated, setNewDaoIsCreated] = useDaoCreatedAtom();

    const { processTransactions } = useProcessTransactions()

    return (
        <>
            {!isInsideWizard ? <WizardHome
                title={title}
                subtitle={subtitle}
                stepsInfo={stepsInfo}
                onButtonClick={() => navigate(clickUrl)}
            /> : <DaoStepper
                steps={steps}
                isValid={isValid}
                onComplete={() => processTransactions(txTitle, undefined, txSteps, true, undefined, () => {
                    setNewDaoIsCreated(true)
                })}
                blockingComponent={newDaoIsCreated ? <DaoLaunched /> : undefined}
            />}
        </>
    )
}
