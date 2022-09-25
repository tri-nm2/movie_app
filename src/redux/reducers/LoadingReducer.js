import { HIDE_LOADING, HIDE_MODAL, HIDE_MODAL_ALERT, SHOW_LOADING, SHOW_MODAL, SHOW_MODAL_ALERT } from "redux/actions/types/LoadingType";

const initState = {
    isLoading: false,
    isModal: false,
    isModalAlert: {
        status:  false,
        thongbao: "",
    },
}

export const LoadingReducer = (state = initState, action) => {
    switch (action.type) {
        case SHOW_LOADING:
            state.isLoading = true;
            return { ...state }
        case HIDE_LOADING:
            state.isLoading = false;
            return { ...state }
        case SHOW_MODAL:
                state.isModal = true;
        return { ...state }
        case HIDE_MODAL:
                state.isModal = false;
        return { ...state }
        case SHOW_MODAL_ALERT:
            const modal = {...state.isModalAlert};
            modal.status = true;
            modal.thongbao = action.thongbao;
            // state.isModalAlert.status = true;
            // console.log( "status",state.isModalAlert.status);
            // state.isModalAlert.thongbao = "Helooo";
        return { ...state, isModalAlert: modal}
        case HIDE_MODAL_ALERT:
            const modalHide = {...state.isModalAlert};
            modalHide.status = false;
            modalHide.thongbao = action.thongbao;
            return { ...state, isModalAlert: modalHide}
        default:
            return { ...state };
    }
}