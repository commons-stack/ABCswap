import { TokenHolder } from "../../../../domain/model/TokenHolder";

export function tokenHolderIsValid(tokenHolder: TokenHolder) : boolean {
    return tokenHolder.address !== "" && tokenHolder.balance !== "";
}