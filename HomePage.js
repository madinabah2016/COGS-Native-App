import React from 'react';
import {
  View, Button,Text, TextInput
} from 'react-native';
import Firebase from 'firebase';




export default class Home extends React.Component {
    state = {
      user:false,
    }


    componentDidMount(){

          Firebase.auth().onAuthStateChanged(user=>{
            if(user){
              console.log("Hello");
            }
            else{
              console.log("Sign In!!!!!!!");
              this.props.navigation.navigate('SignIn');
            }

          })

    }

    render(){
        return(
            <View>
                <Button title="Settings" onPress={()=>this.props.navigation.navigate('Settings')}></Button>
                <Text>Welcome to your home page</Text>
            </View>
        )
    }
};