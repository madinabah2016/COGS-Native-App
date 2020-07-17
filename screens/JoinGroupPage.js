import React from 'react';
import {
  View, Button,Text, TextInput, StyleSheet, ScrollView, FlatList, Image
} from 'react-native';
import Firebase from '../api/config'; 

const styles = StyleSheet.create({

    container:{
      marginTop:5,
      justifyContent:'center',
      alignItems:'center',
    },
    text:{
        fontSize:10,
    },

    image:{
        width:50,
        height:50,
        borderRadius:100,
    },

  });


function  MemberCard(props){
    return(
        <View>
            <Image source={{uri:'https://i.picsum.photos/id/152/3888/2592.jpg?hmac=M1xv1MzO9xjf5-tz1hGR9bQpNt973ANkqfEVDW0-WYU'}} style={styles.image} ></Image>
            <Text>{props.name} 5</Text>
        </View>
    );
}

export default class SearchGroup extends React.Component {

    constructor(props){
        super(props)    

        let name = props.route.params.groupID; 
        this.state={
            groupName:name,
            course:'',
            groupDescription:'',
            members:[],
            joined:false,
        }


    }

   
    async componentDidMount(){
        
        let name = this.state.groupName;

        Firebase.database().ref().child('Groups').child(name).child('Group Description').once('value', (snapshot)=>{
            
            if(snapshot.exists()){
              let detail = snapshot.val();
              console.log("Join Groups : "+ snapshot.val().groupName);
              this.setState({groupName: detail.groupName, course:detail.courseName, groupDescription:detail.shortDescription})

              let id = Firebase.auth().currentUser.uid;  
              let array = snapshot.val().members

              this.setState({joined: array.includes(id)}) 
              let users = [];  

              detail.members.map((item)=>{
                  Firebase.database().ref().child('Users').child(item).once('value', (snapshot)=>{
                      if(snapshot.exists()){
                        users.push(snapshot.val());
                        this.setState({members:users});                        
                        
                      }
                  })
              })


    
            }

        });

    } 

    join = ()=>{
        let id = Firebase.auth().currentUser.uid;
        let array = [];

        Firebase.database().ref('Users/'+id+'/groups').once('value', (snapshot)=>{

            if(snapshot.exists()){
                array = snapshot.val();
                array.push(this.state.groupName)
              
            }
            else{
                array.push(this.state.groupName)
            }

            Firebase.database().ref('Users/'+id+'/groups').set(array, (error)=>{
  
              if(error){
                console.log("Error Message in join groups: "+error);
              }
              else{
                console.log('Settings is succesfully added group')
                  
              }
  
            }); 
  
  
        });


        let name = this.state.groupName;

        Firebase.database().ref().child('Groups').child(name).child('Group Description').child('members').once('value', (snapshot)=>{
            
            if(snapshot.exists()){
                let groupMembers = snapshot.val();
                groupMembers.push(id); 

                Firebase.database().ref().child('Groups').child(name).child('Group Description').child('members').set(groupMembers, (error)=>{
                    if(error){
                        console.log("Error Adding user as group member")
                    }
                    else{
                        console.log("User was succesfully added as group member")
                    }
                });

            }

        });


    }
   
    render(){
        return (
            <View>
                <Text>{this.state.groupName}</Text>
                <Text style={styles.text} >Name</Text>

                <Text>{this.state.course}</Text>
                <Text style={styles.text} >Class</Text>

                <Text>{this.state.groupDescription}</Text>
                <Text style={styles.text} >Group Description</Text>

                <FlatList  
                    data = {this.state.members}
                    renderItem={({ item }) => (
                        <MemberCard name = {item.name}/>
                      )}

                      numColumns={3}
                      keyExtractor={(item, index) => index}
                />

                { !this.state.joined && <Button title='Join' onPress={this.join}></Button> }

            </View>
        );
    }
}