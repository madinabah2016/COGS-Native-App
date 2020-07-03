import React from 'react';
import {
  View, Text, StyleSheet, Button, TextInput, Image, TouchableOpacity
} from 'react-native';
import Firebase from './config';
import ImagePicker from 'react-native-image-picker';


export default class Settings extends React.Component{

    constructor(props){
        super(props)


        
        this.state={
                username:'fgf',
                courses:'fgf',
                resourcePath:{uri:'https://i.picsum.photos/id/152/3888/2592.jpg?hmac=M1xv1MzO9xjf5-tz1hGR9bQpNt973ANkqfEVDW0-WYU'},
        }
    }


    componentDidMount(){
        var id = Firebase.auth().currentUser.uid.toString();
        var name = 'sampl';
        Firebase.database().ref('Users/'+id).once('value', (snapshot)=>{
            
            if(snapshot.exists){
                console.log("Found User:"+snapshot.val().name);
                console.log("Found User:"+snapshot.val().courses);
                
                this.setState({courses:snapshot.val().courses})
                this.setState({username: snapshot.val().name});

            }
        });

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

        Firebase.database().ref('Users/'+id).set(user, (error)=>{

          if(error){
            console.log("Error Message in settings: "+error);
          }
          else{
            console.log('Settings is succesfully saved')

            Firebase.storage().ref().child('User Image').child(id).put(this.state.resourcePath.uri)
            .then(()=>console.log("Image has been scussfully uploaded"));

          }

        });

        const {goBack} = this.props.navigation;
        goBack();
    }

    selectFile = () => {
        var options = {
          title: 'Select Profile Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
    
        ImagePicker.showImagePicker(options, res => {
          console.log('Response = ', res);
    
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            let source = res;
            this.setState({
              resourcePath: source,
            });
          }
        });
      };

    render(){
        return(
            <View >
                <Image source={ {uri: this.state.resourcePath.uri}} style={styles.image} ></Image>
                <TouchableOpacity onPress={this.selectFile} style={styles.button}  >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity> 
                <TextInput placeholder="User Name"  onChangeText={this.handleUsername}>{this.state.username}</TextInput>
                <TextInput placeholder="Classes; separated by comma" onChangeText={this.handleCoureses}>{this.state.courses}</TextInput>
                <Button title="SAVE" color='green' onPress={this.save}></Button>
                <Button title="LOGOUT" onPress={this.logout}></Button>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    test:{
        fontSize:15,
    },
    image:{
        width:'50%',
        height:'40%',
        borderRadius:100,
    },
    textInput:{
        backgroundColor:'grey',
        marginTop:'10'
    },
    button: {
        width: 40,
        height: 40,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginBottom:12,
        fontSize:30   
    }
});