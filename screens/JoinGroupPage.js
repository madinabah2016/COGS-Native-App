import React from 'react';
import {
  View, Button,Text, TextInput, StyleSheet, ScrollView, TouchableOpacity
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
    }

  })


function  MemberCard(props){
    return(
        <View>
            <Text>props.name</Text>
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
            memebers:[],
        }


    }

   
    async componentDidMount(){
        
        let name = this.state.groupName;

        Firebase.database().ref().child('Groups').child(name).child('Group Description').on('value', (snapshot)=>{
            
            if(snapshot.exists){
              let detail = snapshot.val();
              console.log("Join Groups : "+ snapshot.val().groupName);
              this.setState({groupName: detail.groupName, course:detail.courseName, groupDescription:detail.shortDescription})

    
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

                {this.state.memebers.map((item)=>{
                    return(
                        <MemberCard name = {item.name}/>
                    );
                })}

                <Button title='Join'></Button>

            </View>
        );
    }
}