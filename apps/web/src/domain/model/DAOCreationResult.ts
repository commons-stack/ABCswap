export enum DAOCreationResultStatus {
    SUCCESS,
    NOT_STARTED_INVALID_DATA,
    ERROR
}

export type DAOCreationResult = {
    status?: DAOCreationResultStatus;
    data?: any;
    error?: any;
}