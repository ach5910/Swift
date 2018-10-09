import React from 'react';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components';

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

const HomeScreenContainer = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding-bottom: 25%;
`
export default class HomeScreen extends React.Component {
  render() {
    return (
      <HomeScreenContainer>
        <WorkoutButton onPress={() => this.props.navigation.push('AddWorkout')}>
          <WButtonText>Start Workout</WButtonText>
        </WorkoutButton>
      </HomeScreenContainer>
    );
  }
}