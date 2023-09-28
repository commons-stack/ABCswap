import { useEffect, useContext } from 'react';
import { prepareWriteContract, waitForTransaction, writeContract } from '@wagmi/core';
import { TransactionContext } from '../providers/TransactionProvider';

function useProcessTransactions() {
    const { isOpen, steps, activeStep, processTransactions, onTransactionSent, onTransactionSuccess, onTransactionError, onClose } = useContext(TransactionContext);
  
    useEffect(() => {
      let isCancelled = false;
  
      (async () => {
        if (activeStep >= steps.length || isCancelled) {
          return;
        }
        try {
          const config = await prepareWriteContract(steps[activeStep].data);
          const tx = await writeContract(config);
          onTransactionSent();
          const data = await waitForTransaction({...tx, confirmations: 1});
          if (data.status === 'success') {
            onTransactionSuccess();
          } else {
            onTransactionError();
          }
        } catch (error) {
          console.error(error);
          onTransactionError();
        }
      })();
  
      return () => {
        isCancelled = true;
      };
    }, [activeStep, steps, onTransactionSent, onTransactionSuccess, onTransactionError, onClose]);
  
    return { isOpen, processTransactions, onClose, activeStep, steps };
  }
  
export default useProcessTransactions;
