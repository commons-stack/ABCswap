import { useEffect, useState } from "react";
import { DAOCreationRepository } from "../../../../domain/repository/DAOCreationRepository";
import { setDAOName } from "../../../../domain/use-case/DAOCreationUseCases";

export function useDAONameModelController(daoCreationRepository: DAOCreationRepository) {
    const [organizationName, setOrganizationName] = useState<string>('');
    const [userInteracted, setUserInteracted] = useState<boolean>(false);

    useEffect(() => {
        async function init() {
            if(daoCreationRepository.isUsingDefaultData()){
                await daoCreationRepository.load();
            }
            if (daoCreationRepository.getDAOInfo().name) {
                setOrganizationName(daoCreationRepository.getDAOInfo().name!);
                setUserInteracted(true);
            }
        }
        init();
    }, []);

    const handleChangeName = (value: string):void => {
        setOrganizationName(value);
        setUserInteracted(true);
        setDAOName(value, daoCreationRepository);
    }

    return {
        organizationName,
        handleChangeName,
        userInteracted
    };
}