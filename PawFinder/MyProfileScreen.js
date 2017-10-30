import React from 'react';
import {Text, ScrollView} from 'react-native';

export class MyProfileScreen extends React.Component {

  render() {
    return (
      <ScrollView><Text>Pet Profile {this.props.navigation.state.params.petId}</Text></ScrollView>
    );
  }
}