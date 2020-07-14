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

  })
  

class GroupCard extends React.Component{

    constructor(){
        super();
    }

    transition = ()=>{
        this.props.transition(this.props.name);
    }
   
    render(){
        return(
            <TouchableOpacity onPress={this.transition}>
                <View style={styles.container}>
                    <Text style={{fontSize:30}}>{this.props.name} </Text>
                    <Text style={{fontSize:15}}>{this.props.members} Memebers </Text>
                </View>
            </TouchableOpacity>

        );
    }

  } 
  

export default class SearchGroup extends React.Component {

    constructor(){
        super();

        this.state = {
            search: '',
            groupList:[],
            hidden:false,
        }

    }

    joinPage = (id)=>{
        this.props.navigation.navigate('Join Group', {groupID:id});
    }

    handleSearch = (text)=>{
        this.setState({search:text})
    }

    search = ()=>{
        let course = this.state.search;
        console.log("Before Replacement: "+course);
        course = course.replace('.', '');
        course = course.replace('.', '');
        course = course.replace(' ', '');
        console.log("After Replacement: "+course);

        this.setState({groupList:[]});
        Firebase.database().ref('Courses/'+course).once('value', (snapshot)=>{
            
            if(snapshot.exists()){
                console.log("Helloo!!!!!")
                let list = snapshot.val(); 

                list.map((group)=>{
                    Firebase.database().ref().child('Groups').child(group).child('Group Description').on('value', (snapshot)=>{
                      
                        if(snapshot.exists){
                          let detail = snapshot.val();
                          console.log("Search Groups : "+ snapshot.val().groupName);
                          this.setState({groupList: this.state.groupList.concat(detail)})
                
                        }
        
                       });
                })
    
            }
            else{
                this.setState({hidden:true});
            }
        });
    }

    errorCheck(){
        let course = this.state.search; 
        if(course === ''){
            return false;
        }
        return true;
    }

    render(){
        return(
            <View>
                <TextInput placeholder='Enter Course Name, ie AS.123.123' onChangeText={this.handleSearch}></TextInput>
                 {/*Plan to replace this with a search icon instead of button */}

                <Button title='Enter' onPress={this.search}></Button>

                {this.state.hidden && <Text>There are no groups for this course</Text>}

                <ScrollView>
                  {
                  this.state.groupList.map((item)=>{
                    return(<GroupCard name={item.groupName} members={item.members.length} transition={this.joinPage}/>);
                  })
                  }
                </ScrollView>


            </View>
        );
    }
}