import * as actionTypes from "../actionTypes/actionTypes";
const initState = {
    name: '',
    id: '',
    exercises: [
    ]
}

export const workoutReducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.CREATE_NEW_WORKOUT:
            return {
                ...state,
                name: action.workoutName,
                id: action.workoutId
            };
        case actionTypes.FINISH_WORKOUT:
            return initState;
        case actionTypes.ADD_EXERCISE:
            return {
                ...state,
                exercises: [
                    ...state.exercises,
                    action.exercise
                ]
            }
        default:
            return {...state};
    }
}