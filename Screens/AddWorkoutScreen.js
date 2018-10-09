import React from 'react';
import { Button, FlatList, Modal, Text, ScrollView, TouchableHighlight, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import ExerciseListItem from '../Components/ExerciseListItem';
import {addExercise, finishExercise} from '../actions/exercise';
import {finishWorkout, createNewWorkout} from '../actions/workout';
import styled from 'styled-components';


const AppContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center
    height: 100%;
`

const CreateWorkoutContainer = styled.View`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 25%;
`

const WorkoutButton = styled.TouchableHighlight`
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-color: purple;
    border-radius: 3px;
`

const WButtonText = styled.Text`
    font-size: 18;
    padding: 8px;
    text-align: center;
    color: purple;
`

const WorkOutName = styled.Text`
    font-size: 24;
    font-weight: 700;
    padding: 8px;
    text-align: center;
    color: purple;
`

const DButtonText = styled.Text`
    font-size: 18;
    padding: 8px;
    text-align: center;
    color: white;
`

const DarkButton = styled.TouchableHighlight`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: purple
    border-radius: 3px;
`

const ButtonContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 15%;
    align-items: center;
    width: 100%;
`
const ModalContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`
const WTextInput = styled.TextInput`
    border-bottom-width: 2px;
    border-color: purple;
    padding: 8px;
    margin-bottom: 15px;
    color: purple;
    text-align: center;
    min-width: 75%;
    font-size: 18px;
`
const WText = styled.Text`
    font-size: 18;
    color: purple;
    text-align: center;
`

class AddWorkoutScreen extends React.Component {
    constructor(props){
        super(props);

        this.state={
            modalVisible: false,
            workoutName: '',
            started: false,
            exerciseModalVisible: false,
            exerciseName: ''
        }
    }

    setModalVisible = (visible) => {this.setState({modalVisible: visible})}

    setWorkoutName = () => {
        this.setModalVisible(false);
        const {workoutName} = this.state;
        this.props.createNewWorkout(workoutName);
        this.setState({started: true});
    }
    changeText = (text) => {this.setState({workoutName: text})}

    changeExerciseText = (text) => {this.setState({exerciseName: text})};

    setExerciseModalVisible = (visible) => {this.setState({exerciseModalVisible: visible})}

    finishWorkout = () => {
        this.props.exercises.map(exercise => {
            this.props.finishExercise(exercise);
        });
        this.props.finishWorkout(this.props.workout);
        this.props.navigation.replace('Home');
    }

    addExercise = () => {
        this.setExerciseModalVisible(false);
        const {exerciseName} = this.state;
        this.props.addExercise(exerciseName);
        this.setState({exerciseName: ""});
    }

    _keyExtractor = (item, index) => item.id;

    render() {
        console.log(this.props);
        const {exercises} = this.props;
        return (
            <AppContainer>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.exerciseModalVisible}
                    onRequestClose={() => {}}
                    >
                    <ModalContainer>
                        <View>
                            <WTextInput
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCorrect={false} 
                                placeholder="Exerericse Name: Chest Day, Leg Day .."
                                onChangeText={(text) => this.changeExerciseText(text)}
                                value={this.state.exerciseName}
                            />
                        </View>
                        <WorkoutButton onPress={() => {this.addExercise()}}>
                            <WButtonText>Save</WButtonText>
                        </WorkoutButton>
                        
                    </ModalContainer>
                
                </Modal> 
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {}}
                    >
                    <ModalContainer>
                        <View>
                            <WTextInput 
                                underlineColorAndroid='rgba(0,0,0,0)'
                                autoCorrect={false}
                                placeholder="Workout name: Leg Day, Cardio ..."
                                onChangeText={(text) => this.changeText(text)}
                                value={this.state.workoutName}
                            />
                        </View>
                        <WorkoutButton onPress={() => this.setWorkoutName()}>
                            <WButtonText>Save</WButtonText>
                        </WorkoutButton>
                            
                            
                    </ModalContainer>
                
                </Modal>
                {
                    !this.state.started ? 
                    <CreateWorkoutContainer>
                        <WButtonText>Create a Workout</WButtonText>
                        <WorkoutButton onPress={() => this.setModalVisible(true)}>
                            <WButtonText>Add a Workout</WButtonText>
                        </WorkoutButton>
                    </CreateWorkoutContainer> 
                    :
                    <View>
                        <WorkOutName>{this.state.workoutName}</WorkOutName>
                        <ScrollView>
                            {exercises.length > 0 && exercises.map((exercise, idx) => (
                                <ExerciseListItem key={exercise.id} id={exercise.id} idx={idx} name={exercise.name}/>
                            ))}
                            {/*<FlatList 
                                data={this.props.exercises} 
                                renderItem={({item}) => (<ExerciseListItem key={item.key} id={item.id}  name={item.name}/>)}
                        />*/}
                            <ButtonContainer>
                                <WorkoutButton onPress={() => this.setExerciseModalVisible(true)}>
                                    <WButtonText>Add Exercise</WButtonText>
                                </WorkoutButton>
                                    
                                <DarkButton onPress={() => this.finishWorkout()}>
                                    <DButtonText>Finish Workout</DButtonText>
                                </DarkButton>
                            </ButtonContainer>
                        </ScrollView>
                    </View>
                }
            </AppContainer>
        );
    }
}

const mapStateToProps = (state) => ({
    exercises:  state.workout.exercises,
    workout: state.workout
})

const mapDispatchToProps = (dispatch) => ({
    addExercise: (exerciseName) => dispatch(addExercise(exerciseName)),
    createNewWorkout: (workoutName) => dispatch(createNewWorkout(workoutName)),
    finishExercise: (exercise) => dispatch(finishExercise(exercise)),
    finishWorkout: (workout) => dispatch(finishWorkout(workout))
})

const style = {
    modalContainer : {
        marginTop: 22, 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    container: {
        flex: 1, 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column'
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkoutScreen);