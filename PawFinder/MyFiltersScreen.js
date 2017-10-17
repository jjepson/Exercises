import React from 'react';
import { StyleSheet, Text, Image, View, Button, ScrollView} from 'react-native';
import { Form,
  Separator,InputField, LinkField,
  SwitchField, PickerField, DatePickerField, TimePickerField
} from 'react-native-form-generator';


export class MyFiltersScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      formData:{},
      breedOptions:{any:'Any'}
    }
  }
  
  static navigationOptions = {
    tabBarLabel: 'Filters',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('./notif-icon.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
  };

  updateBreedList(_this,animal)
  {
    if(animal!='Any')
    {
      var breeds = ["Any"];
      _this.state.breedOptions =  breeds;
     // var _this = context;
      fetch('http://api.petfinder.com/breed.list?key=f7e0a65f6b01e529635036c5ee751a73&format=json&animal='+animal)  
      .then(function(response) { 
        if(response.ok) {
          return response.json(); 
        }})
      .then(function(data) {
        if(data != null)
        {
          data.petfinder.breeds.breed.forEach(function(breed)
          {
              breeds.push(breed.$t)
          }); 
          _this.state.breedOptions =  breeds;
        } 
      }); 
    }
  }

  handleFormChange(formData){
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
    postalCode:"",
    last_name:"",
    gender: '',
    birthday: Date,
    has_accepted_conditions: bool
    }
    */

    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  handleFormFocus(e, component){
    //console.log(e, component);
  }
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps="always" style={{paddingLeft:10,paddingRight:10, height:200}}>
      <Form
        ref='registrationForm'
        onFocus={this.handleFormFocus.bind(this)}
        onChange={this.handleFormChange.bind(this)}
        label="Personal Information">
        <Separator />
        <InputField
          ref='postalCode'
          placeholder='Postal Code'
          helpText={((self)=>{

            if(Object.keys(self.refs).length !== 0){
              if(!self.refs.registrationForm.refs.postalCode.valid){
                return self.refs.registrationForm.refs.postalCode.validationErrors.join("\n");
              }

            }
            // if(!!(self.refs && self.refs.postalCode.valid)){
            // }
          })(this)}
          validationFunction={[(value)=>{
            /*
            you can have multiple validators in a single function or an array of functions
             */

            if(value == '') return "Required";
            //Initial state is null/undefined
            if(!value) return true;
            // Check if First Name Contains Numbers
            var matches = value.match(/\d+/g);
            if (matches != null) {
                return "First Name can't contain numbers";
            }

            return true;
          }, (value)=>{
            ///Initial state is null/undefined
            if(!value) return true;
            if(value.indexOf('4')!=-1){
              return "I can't stand number 4";
            }
            return true;
          }]}
          />
          <Separator />
          <PickerField ref='animal'
          label='Pet Type'
          onValueChange = {this.updateBreedList.bind(this.value,this)}
          options={{
            any: 'Any',
            barnyard: 'Barnyard',
            bird: 'Bird',
            cat: 'Cat',
            dog: 'Dog',
            horse: 'Horse',
            reptile: 'Reptile',
            smallfurry: 'Small & Furry'
          }}/>
          <PickerField ref='breed'
          label='Breed'
          options={
            this.state.breedOptions
          }/>
          <Separator />
          <PickerField ref='gender'
          label='Gender'
          options={{
            any: 'Any',
            male: 'Male',
            female: 'Female'
          }}/>
          <PickerField ref='age'
          label='Age'
          options={{
            any: 'Any',
            baby: 'Baby',
            young: 'Young',
            adult: 'Adult',
            senior: 'Senior'
          }}/>
          <PickerField ref='size'
          label='Size'
          options={{
            any: 'Any',
            small: 'Small',
            medium: 'Medium',
            large: 'Large',
            extraLarge: 'Xtra Large'
          }}/>
          <Button
            onPress={() => {this.props.navigation.navigate('Pets')}}
            title="Press Me"/>
        </Form>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});