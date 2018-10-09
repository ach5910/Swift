import database from '../firebase/firebase';
import * as actionTypes from "../actionTypes/actionTypes";

const addExerciseAction = (exercise) => ({
    type: actionTypes.ADD_EXERCISE,
    exercise
})

const addSetAction = (exerciseIndex) => ({
    type: actionTypes.ADD_SET,
    exerciseIndex
});

const finishExerciseAction = () => ({
    type: actionTypes.FINISH_EXERCISE
})

export const finishExercise = (exercise) => {
    let exerciseObj = {
        numberOfSets: exercise.sets.length
    };
    exercise.sets.map((set, idx) => {
        exerciseObj[`reps_${idx}`] = set.reps;
        exerciseObj[`weight_${idx}`] = set.weight;
    });
    return dispatch => {
        database.ref(`exercise/${exercise.name}/${exercise.id}`).update({...exerciseObj});
        return dispatch(finishExerciseAction());
    }

}

export const addSet = (exerciseIndex) => {
    return dispatch => {
        return dispatch(addSetAction(exerciseIndex));
    }
}

export const addExercise = (exerciseName) => {
    return dispatch => {
        database.ref(`exercise/${exerciseName}`).push({numberOfSets: 0}).then((snapshot) => {
            return dispatch(addExerciseAction({name :exerciseName, id: snapshot.key, sets: []}));
        })
    }
}

const updateRepsAction = (exerciseIndex, setIndex, reps) => ({
    type: actionTypes.UPDATE_REPS,
    exerciseIndex,
    setIndex,
    reps
})

export const updateReps = (exerciseIndex, setIndex, reps) => {
    return dispatch => {
        return dispatch(updateRepsAction(exerciseIndex, setIndex, reps));
    }
}

const updateWeightAction = (exerciseIndex, setIndex, weight) => ({
    type: actionTypes.UPDATE_WEIGHT,
    exerciseIndex,
    setIndex,
    weight
})

export const updateWeight = (exerciseIndex, setIndex, weight) => {
    return dispatch => {
        return dispatch(updateWeightAction(exerciseIndex, setIndex, weight));
    }
}