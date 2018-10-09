import moment from 'moment';
import database from "../firebase/firebase";
import * as actionTypes from "../actionTypes/actionTypes";

const createNewWorkoutAction = (workoutName, workoutId) => ({
    type: actionTypes.CREATE_NEW_WORKOUT,
    workoutName,
    workoutId
})

export const createNewWorkout = (workoutName) => {
    const startTime = moment().valueOf();
    return dispatch => {
        database.ref(`workout/${workoutName}`).push({startTime: startTime}).then((snapshot) => {
            return dispatch(createNewWorkoutAction(workoutName, snapshot.key));
        })
    }
}

const finishWorkoutAction = () => ({
    type: actionTypes.FINISH_WORKOUT
})

export const finishWorkout = (workout) => {
    const endTime = moment().valueOf();
    let workoutObj = {
        endTime: endTime,
        numberOfExercises: workout.exercises.length
    };
    workout.exercises.map((exercise, idx) => {
        workoutObj[`exerciseId_${idx}`] = exercise.id;
        workoutObj[`exerciseName_${idx}`] = exercise.name;
    })
    return dispatch => {
        database.ref(`workout/${workout.name}/${workout.id}`).update({...workoutObj});
        return dispatch(finishWorkoutAction());
    }
}