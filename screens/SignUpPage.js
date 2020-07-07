import React from 'react';
import {
  View, Button, TextInput, Text
} from 'react-native';
import Firebase from '../api/config';

export default class SignUp extends React.Component {

    state = {
        email:'',
        password:'',
        confirmPassword:'',
    }

    handleEmail = (text)=>{
        this.setState({email:text});
    }

    handlePassword = (text)=>{
        this.setState({password:text});
    }

    handleConfirmPassword = (text)=>{
        this.setState({confirmPassword:text});
    }

    login = ()=>{
        console.log("User Email: "+this.state.email+ " Password: "+ this.state.password + " Confirm: "+ this.state.confirmPassword);
        if(this.state.confirmPassword == this.state.password){
            console.log("Password Match");
            Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(()=>{
                console.log("We have succesfully created an account");
                this.props.navigation.navigate('Home')
            })
            .catch((err)=>console.log("Error Message: "+err));
        }
        else{
            console.log("Password do not match");
        }
    }

    render(){
        return (
            <View>
                <TextInput placeholder="Email" placeholderTextColor='black' onChangeText = {this.handleEmail} />  
                <TextInput placeholder="Password" placeholderTextColor='black' onChangeText = {this.handlePassword} /> 
                <TextInput placeholder="Password" placeholderTextColor='black' onChangeText = {this.handleConfirmPassword} /> 
                <Button title="Create Account" color="blue" onPress={()=>this.login()}/>
                <Text onPress={()=>this.props.navigation.navigate('SignIn')}> Sign In?</Text>
            </View>

        )
    }
};

