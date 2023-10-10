import { useEffect, useState } from "react";
import { DAOCreationRepository } from "../../../domain/repository/DAOCreationRepository";
import { setDAOName } from "../../../domain/use-case/DAOCreationUseCases";

export function useDAONameModelController(daoCreationRepository: DAOCreationRepository) {
    const [organizationName, setOrganizationName] = useState<string>('');
    const [userInteracted, setUserInteracted] = useState<boolean>(false);

    useEffect(() => {
        async function init() {
            if (daoCreationRepository.isUsingDefaultData()) {
                await daoCreationRepository.loadDAOInfo();
            }
            if (daoCreationRepository.getDAOInfo().getName()) {
                setOrganizationName(daoCreationRepository.getDAOInfo().getName()!);
                setUserInteracted(true);
            }
        }
        init();
    }, []);

    const handleChangeName = (value: string): void => {
        const validChars = /^[a-z0-9-]*$/.test(value);

        if (!validChars) {
            setUserInteracted(true);
        } else {
            setOrganizationName(value);
            setUserInteracted(true);
            setDAOName(value, daoCreationRepository);
        }
    }

    return {
        organizationName,
        handleChangeName,
        userInteracted
    };
}