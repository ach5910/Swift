import * as actionTypes from '../actionTypes/actionTypes';

export const exerciseReducer = (state = [], action) => {
    switch (action.type){
        case actionTypes.ADD_EXERCISE:
            return [
                ...state,
                action.exercise
            ]
        case actionTypes.UPDATE_REPS:
            state[action.exerciseIndex].sets[action.setIndex] = {...state[action.exerciseIndex].sets[action.setIndex], reps: action.reps};
            return [
                ...state
            ]
        case actionTypes.UPDATE_WEIGHT:
        state[action.exerciseIndex].sets[action.setIndex] = {...state[action.exerciseIndex].sets[action.setIndex], weight: action.weight};
            return [
                ...state
            ]
        case actionTypes.ADD_SET:
            state[action.exerciseIndex].sets = [ ...state[action.exerciseIndex].sets, {reps: '0', weight: '0'}];
            return [
                ...state
            ]
        case actionTypes.FINISH_EXERCISE:
            return [];
        default:
            return state;
    }
}