import React from 'react';
import { Button, Modal, Text, TouchableHighlight, TextInput, View } from 'react-native';
import {updateReps, updateWeight} from '../actions/exercise';
import {connect} from 'react-redux';
import styled from 'styled-components';
// import { isNumber } from 'util';

const WorkoutButton = styled.TouchableHighlight`
    display: flex;
    justify-content: center;
    align-items: center;
`

const WButtonIcon = styled.Text`
    font-size: 22;
    padding: 4px;
    font-weight: 600;
    text-align: center;
    color: purple;
`

const SetItemContainer = styled.View`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    flex-direction: row;
`
const FieldHorizontalContainer = styled.View`
    display: flex;
    flex-direction: row;
    width: 50%;
    justify-content: center;
    align-items: center;

`
const FieldVerticalContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

`

const SetTextInput = styled.TextInput`
    border-bottom-width: 2px;
    border-bottom-color: purple;
    padding: 8px;
    padding-bottom: 2px;
    color: purple;
    text-align: center;
    min-width: 25%;
    font-size: 18px;
`
const SetFieldText = styled.Text`
    font-size: 18;
    color: purple;
    text-align: center;
`

class SetListItem extends React.Component{
    constructor(props){
        super(props);
    }

    updateWeight = (w) => {
        const weight = parseInt(w);
        console.log('weight', weight);
        if (!isNaN(weight)){
            this.props.updateWeight(weight.toString());
        }
    }

    updateReps = (r) => {
        const reps = parseInt(r);
        if (!isNaN(reps)){
            this.props.updateReps(reps.toString());
        }
    }
    decrementReps = () => {
        const {reps} = this.props;
        const r = parseInt(reps);
        const num = r - 1;
        this.props.updateReps(num.toString());
    }
    decrementWeight = () => {
        const {weight} = this.props;
        const w = parseInt(weight);
        const num = w - 5;
        this.props.updateWeight(num.toString());
    }

    incrementReps = () => {
        const {reps} = this.props;
        const r = parseInt(reps);
        const num = r + 1;
        this.props.updateReps(num.toString());
    }
    incrementWeight = () => {
        const {weight} = this.props;
        const w = parseInt(weight);
        const num = w + 5;
        this.props.updateWeight(num.toString());
    }

    render(){
        return (
            <SetItemContainer>
                <FieldHorizontalContainer>
                    <SetFieldText>Weight</SetFieldText>
                    <SetTextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        value={this.props.weight}
                        onChangeText={(weight) => this.updateWeight(weight)}
                        />
                    <FieldVerticalContainer>
                        <WorkoutButton onPress={this.incrementWeight}>
                            <WButtonIcon>+</WButtonIcon>
                        </WorkoutButton>
                        <WorkoutButton onPress={this.decrementWeight}>
                            <WButtonIcon>-</WButtonIcon>
                        </WorkoutButton>
                    </FieldVerticalContainer>
                </FieldHorizontalContainer>
                <FieldHorizontalContainer>
                    <SetFieldText>Reps</SetFieldText>
                    <SetTextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        value={this.props.reps}
                        onChangeText={(reps) => this.updateReps(reps)}
                        />
                    <FieldVerticalContainer>
                    <WorkoutButton onPress={this.incrementReps}>
                        <WButtonIcon>+</WButtonIcon>
                    </WorkoutButton>
                    <WorkoutButton onPress={this.decrementReps}>
                        <WButtonIcon>-</WButtonIcon>
                    </WorkoutButton>
                    </FieldVerticalContainer>
                </FieldHorizontalContainer>

            </SetItemContainer>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const {reps = 0, weight = 0} = state.exercises[ownProps.exerciseIndex].sets[ownProps.idx];

    return {reps, weight};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    const {exerciseIndex, idx} = ownProps;
    return {
        updateReps: (reps) => dispatch(updateReps(exerciseIndex, idx, reps)),
        updateWeight: (weight) => dispatch(updateWeight(exerciseIndex, idx, weight))
    }
}


const style = {
    setListItem : { 
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetListItem);