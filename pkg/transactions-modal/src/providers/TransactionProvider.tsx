import React, { ReactNode, FC, useState, useCallback } from "react";
import { Step } from "../types";
import TransactionModal from "../components/TransactionModal";


interface TransactionContextData {
    isOpen: boolean;
    steps: Step[];
    stepStatus: ("notsigned" | "pending" | "success" | "error")[];
    activeStep: number;
    processTransactions: (newSteps: Step[]) => void;
    onTransactionSuccess: () => void;
    onTransactionSent: () => void;
    onTransactionError: () => void;
    onClose: () => void;
}

const TransactionContext = React.createContext<TransactionContextData>({
    isOpen: false,
    steps: [],
    stepStatus: [],
    activeStep: 0,
    processTransactions: () => {},
    onTransactionSuccess: () => {},
    onTransactionSent: () => {},
    onTransactionError: () => {},
    onClose: () => {}
});

interface Props {
    children: ReactNode;
}

const TransactionProvider: FC<Props> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [steps, setSteps] = useState<Step[]>([]);
    const [stepStatus, setStepStatus] = useState<("notsigned" | "pending" | "success" | "error")[]>([]);
    const [activeStep, setActiveStep] = useState(0);

    const processTransactions = useCallback((newSteps: Step[]) => {
        setSteps(newSteps);
        setStepStatus([]);
        setActiveStep(0);
        setIsOpen(true);
    }, [setSteps, setStepStatus, setActiveStep, setIsOpen]);

    const onTransactionSent = useCallback(() => {
        setStepStatus(prevStepStatus => [...prevStepStatus, "pending"]);
    }, [setStepStatus]);

    const onTransactionSuccess = useCallback(() => {
        setStepStatus(prevStepStatus => {
            const status = [...prevStepStatus]
            status[status.length - 1] = "success"
            return status
        });
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }, [setStepStatus, setActiveStep]);

    const onTransactionError = useCallback(() => {
        setStepStatus(prevStepStatus => [...prevStepStatus, "error"]);
    }, [setStepStatus]);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    return (
        <TransactionContext.Provider value={{
            isOpen,
            steps,
            activeStep,
            stepStatus,
            processTransactions,
            onTransactionSent,
            onTransactionSuccess,
            onTransactionError,
            onClose
        }}>
            {children}
            <TransactionModal />
        </TransactionContext.Provider>
    );
};

export { TransactionProvider, TransactionContext };