import { HIDE_LOADING, SHOW_LOADING } from "./types/LoadingType"

export const LoadingShowAction = () =>{
    return {
        type: SHOW_LOADING,
    }
}
export const LoadingHideAction = () =>{
    return {
        type: HIDE_LOADING,
    }
}