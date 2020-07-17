import React from 'react';
import {
  View, Button,Text, TextInput, StyleSheet
} from 'react-native';

import Firebase, {getUserGroups, getGroupDetail} from '../api/config'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


const styles = StyleSheet.create({

  container:{
    marginTop:5,
    justifyContent:'center',
    alignItems:'center',
  },

  fab:{
    backgroundColor:'blue',
    borderRadius:50,
    width:50,
    height:50,
    right:30,
    bottom:30,
  }
})

function GroupCard(props){
  console.log("Card View")
  return(
    <View style={styles.container}>
      <Text style={{fontSize:30}}>{props.name} </Text>
      <Text style={{fontSize:15}}>{props.members} Memebers      |     {props.meetings} Meetings </Text>
    </View>
  );
} 


export default class Home extends React.Component {
    state = {
      user:false,
      groupList:[],
    }


    async componentDidMount(){

          Firebase.auth().onAuthStateChanged(user=>{
            if(user){
              console.log("Hello");

              let userId = Firebase.auth().currentUser.uid;
              Firebase.database().ref('Users/'+userId).on('value', (snapshot)=>{
                 
                if(snapshot.exists()){
                    console.log(snapshot.val().groups);
                    let groups = snapshot.val().groups;
                    var details = [];
                    if(groups!=null){
                      groups.map(group=>{
                        console.log("Group Name: "+group);
                        Firebase.database().ref().child('Groups').child(group).child('Group Description').on('value', (snapshot)=>{
                      
                          if(snapshot.exists()){
                            let detail = snapshot.val();
                            console.log("Group Detail: "+ snapshot.val().groupName);
                            details.push(detail)
                            this.setState({groupList:details})
                  
                          }
          
                         });
        
                        });
                    }
          
                }
          
              });


            }
            else{
              console.log("Sign In!!!!!!!");
              this.props.navigation.navigate('SignIn');
            }

          })

          var details = [];
          
    }

    render(){
        return(
            <View>
                <Button title="Settings" onPress={()=>this.props.navigation.navigate('Settings')}></Button>
                <Button title="Search"  onPress={()=>this.props.navigation.navigate('Search Group')}></Button>
                <Text>Welcome to your home page</Text>

                <ScrollView>
                  {
                  this.state.groupList.map((item)=>{
                    return(<GroupCard name={item.groupName} members={item.members.length} meetings='0'/>);
                  })
                  }
                </ScrollView>
                <Button title="Create Group" onPress={()=>this.props.navigation.navigate('Create Group')}></Button>

            </View>
        )
    }
};