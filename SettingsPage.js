import React from 'react';
import {
  View, Text, StyleSheet, Button, TextInput
} from 'react-native';
import Firebase from './config';

export default class Settings extends React.Component{

    state={
        username:'hh',
        courses:'hh'
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
        let id = Firebase.auth().currentUser.uid.toString();
        var user = {name:this.state.username, courses:this.state.courses}
        console.log('User name: '+this.state.username+' Course:'+ this.state.courses)
        Firebase.database().ref('Users/'+id).set(user)
        .then(()=>{console.log('Settings is succesgulyy saved')})
        .catch(err=>{console.log("Error Message in settings: "+err)})
        const {goBack} = this.props.navigation;
        goBack();
    }

    render(){
        return(
            <View>
                <TextInput placeholder="User Name" style={styles.test} onChangeText={this.handleUsername}></TextInput>
                <TextInput placeholder="Classes; separated by comma" onChangeText={this.handleCoureses}></TextInput>
                <Button title="SAVE" color='green' onPress={this.save}></Button>
                <Button title="LOGOUT" onPress={this.logout}></Button>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    test:{
        fontSize:15,
    }
});