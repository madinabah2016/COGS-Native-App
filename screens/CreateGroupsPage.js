import React from 'react';
import {
  View, Button,Text, TextInput, StyleSheet
} from 'react-native';

import Firebase from '../api/config'


const styles = StyleSheet.create({

    container:{
      marginTop:5,
      justifyContent:'center',
      alignItems:'center',
      paddingTop:10,
    },
  
    input:{
      backgroundColor:'grey',
      borderRadius:5,
      width: '80%',
      height: 50,
      marginTop:25,
    },

    inputMulti:{
        backgroundColor:'grey',
        borderRadius:5,
        width: '80%',
        height: 90,
        marginTop:25,
      },


    button:{
        marginTop:25,

    }, 

    text:{
        fontSize:10, 
        marginTop:5,
    }


  })

  export default class CreateGroup extends React.Component {

    constructor() {
        super();           
    }

    state= {
        name:'',
        description:'', 
        course:'',


    }

    handleName = (text)=>{
        this.setState({name:text});
    }

    handleDescription = (text)=>{
        this.setState({description:text});
    }

    handleClass = (text)=>{
        this.setState({course:text})
    }

    

    handleInputError(name, des, course){
        if( (name === '') || (des === '') || (course ==='') ){
            return false;
        }
        else{
            if(course.length != 10){
                return false;
            }
            else if(course.charAt(0)>=65 && course.charAt(0) <= 90){
                return false
            }
            else if(course.charAt(1)>=65 && course.charAt(1) <= 90){
                return false;
            }
            else if(course.charAt(2)!='.'  || course.charAt(6)!='.'){
                return false;
            }
            return true;

        }
    }

    create = ()=>{
        let name = this.state.name;
        let des = this.state.description;
        let course = this.state.course;
        console.log("Create Group: "+ name+' '+des+' '+course); 

        let newGroup = {
            courseName: course,
            groupName:name,
            shortDescription:des,
        }

        let accurate = this.handleInputError(name, des, course);
        console.log("Error Handler: "+ accurate);

        if(accurate){

           Firebase.database().ref('Groups/'+name+'/Group Description').set(newGroup, (error)=>{

            if(error){
                console.log("Error Creating New Group: "+error);
            }
            else{
                console.log("New Group Has been created");
            }

            }); 
        }
        
    }


    render(){
        return(
            <View style={styles.container}> 

                <TextInput style={styles.input} onChangeText={this.handleName}></TextInput>
                <Text style={styles.text}>Group Name</Text>

                <TextInput style={styles.input} onChangeText={this.handleClass}></TextInput> 
                <Text style={styles.text}>Class</Text>

                <TextInput style={styles.inputMulti} onChangeText={this.handleDescription} multiline={true}></TextInput>
                <Text style={styles.text}>Description</Text>

                <Button  marginTop='20' title='Create' backgroundColor='blue' style={styles.button} onPress={this.create}></Button>

            </View>
            
        );
    }
  }