import { postActionTypes } from "../../constants/actionTypes";

const initialState = {
    auth: [],
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    console.log(action, state, "auth login")

    switch (type) {
        case postActionTypes.NEW_USER_SUCCESS:
            console.log(action?.data)
            localStorage.setItem('profile', JSON.stringify(payload))
            return {
                ...state,
                loading: false,
                user: [...state.user, payload]
            };

        case postActionTypes.NEW_USER_FAILURE:
            return { ...state, loading: false, error: payload };

        case postActionTypes.LOGIN_USER_SUCCESS:
            console.log(action?.data)
            localStorage.setItem('profile', JSON.stringify(payload))
            return {
                ...state,
                loading: false,
                user: payload
            };

        case postActionTypes.LOGIN_USER_FAILURE:
            return { ...state, loading: false, error: payload };

            case postActionTypes.LOGOUT_USER_SUCCESS:
                console.log(action?.data)
                localStorage.clear()
                return {
                    ...state,
                    loading: false,
                    user: payload
                };
    
            case postActionTypes.LOGOUT_USER_FAILURE:
                return { ...state, loading: false, error: payload };

        default:
            return state;
    }
}

export default authReducer