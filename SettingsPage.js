import React from 'react';
import {
  View, Text, StyleSheet, Button
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Firebase from './config';

export default class Settings extends React.Component{

    state={
        username:'',
        courses:''
    }

    handleUsername = (text)=>{
        this.setState({username:text})
    }

    handleCoureses = (text)=>{
        this.setState({courses:text})
    }

    logout = ()=>{
        console.log("User has loged out");
        Firebase.auth().signOut()
        .then(function(){
            console.log("User has succesfully signed out");
            this.props.navigation.navigate('SignIn');
        })
        .catch(err=>{console.log("Error Message:"+err)})
    }

    save = ()=>{
        console.log("User settings has been saved into the Database");
    }

    render(){
        return(
            <View>
                <TextInput placeholder="User Name" onChange={this.handleUsername}></TextInput>
                <TextInput placeholder="Classes; separated by comma" onChange={this.handleCoureses}></TextInput>
                <Button title="SAVE" style={styles.button}></Button>
                <Button title="LOGOUT"></Button>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    button:{
        marginBottom:20,
        margin: 10,
        backgroundColor:'grey'
    }
});