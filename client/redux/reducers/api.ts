import { SET_LOADER, SET_MEMBER_PROFILE } from '@redux/actions/type';

const loaderReducer = (state: boolean = false, action: ILoaderReduxAction) => {
    switch (action.type) {
        case SET_LOADER:
            return action.data;
        default:
            return state;
    }
};
const memberReducer = (state: IMemberProfileReduxData = { profile: null }, action: IMemberProfileReduxAction) => {
    switch (action.type) {
        case SET_MEMBER_PROFILE:
            return action.data;
        default:
            return state;
    }
};
export { loaderReducer, memberReducer };
