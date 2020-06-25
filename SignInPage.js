import React from 'react';
import {
  View, Button,Text, TextInput
} from 'react-native';
import Firebase from './config';

export default class SignIn extends React.Component {

    state = {
        email:'',
        password:'',
    }

    handleEmail = (text)=>{
        this.setState({email:text});
    }

    handlePassword = (text)=>{
        this.setState({password:text});
    }

    login = ()=>{
        console.log("User Email: "+this.state.email+ " Password: "+ this.state.password);

        Firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(()=>{this.props.navigation.navigate('Home')})
        .catch(err=> console.log("Error Message+ "+err));
    }

    render(){
        return (
            <View>
                <TextInput placeholder="Email" placeholderTextColor='black' onChangeText={this.handleEmail} />  
                <TextInput placeholder="Password" placeholderTextColor='black' onChangeText={this.handlePassword}/> 
                <Button title="Login" color="blue" onPress={()=>this.login()}/>
                <Text onPress={()=> this.props.navigation.navigate('SignUp')}>Dont have an account? Sign-Up</Text>
            </View>

        )
    }
};

