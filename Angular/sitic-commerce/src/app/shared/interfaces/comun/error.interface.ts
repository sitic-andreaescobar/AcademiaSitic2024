import { eErrorType } from "./enums.interface"

export interface Error {
    message: string;
    errorType: eErrorType;
}