import React from 'react';
import { StyleSheet, Button, Modal, Text, TouchableHighlight, TextInput, View } from 'react-native';
import SetListItem from './SetListItem';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {addSet} from '../actions/exercise';

const style = StyleSheet.create({
    exerciseListItem : { 
        height: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }, button: {
        width: 60,
        backgroundColor: 'orange'
    },
        dropdown: {
            height: 100,
        
    }
});

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

const DropDown = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`
const ExerciseName = styled.Text`
    font-size: 18px;
    font-weight: 600;
    color: purple;
    padding: 8px;
    text-align: center;
`
const ExpandExerciseContainer = styled.TouchableHighlight`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 25%;
    
`

const ExcerciseNameContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    
`

const LeftEmptyBox = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25%;
    
`
const ExpandExercise = styled.Text`
    font-size: 18px;
    padding: 8px;
    color: purple;
    text-align: center;
`

const ExerciseItem = styled.View`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    border-width: 1px;
    border-color: purple;
`

class ExerciseListItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            collapsed: true
        }
    }
    addSet = (exerciseIndex) => {this.props.addSet(exerciseIndex)}

    toggleCollapse = () => {this.setState((prevState) => ({collapsed: !prevState.collapsed}))}

    render(){
        return (
            <View>
                <ExerciseItem >
                    <LeftEmptyBox></LeftEmptyBox>
                    <ExcerciseNameContainer>
                        <ExerciseName>{this.props.name}</ExerciseName>
                    </ExcerciseNameContainer>
                    <ExpandExerciseContainer onPress={this.toggleCollapse}>
                        <ExpandExercise>Expand</ExpandExercise>
                    </ExpandExerciseContainer>
                </ExerciseItem>
                {!this.state.collapsed && 
                    <DropDown>
                        {this.props.sets.length > 0 && this.props.sets.map((set, idx) => (
                            <SetListItem exerciseIndex={this.props.idx} reps={set.reps} weight={set.weight} idx={idx}/>
                        ))}
                        <WorkoutButton onPress={() => this.addSet(this.props.idx)} >
                            <WButtonText>Add Set</WButtonText>
                        </WorkoutButton>    
                    </DropDown>
                }
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log('exercises index', ownProps.idx);
    console.log('state', state);
    console.log('state.exercises' , state.exercises);
    console.log('state.exercises[idx]',state.exercises[ownProps.idx])
    return {
        sets: state.exercises && state.exercises[ownProps.idx] ?  state.exercises[ownProps.idx].sets : []
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addSet: (exerciseIndex) => dispatch(addSet(exerciseIndex))
})


export default connect(mapStateToProps, mapDispatchToProps)(ExerciseListItem);