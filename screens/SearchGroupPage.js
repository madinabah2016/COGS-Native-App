import React from 'react';
import {
  View, Button,Text, TextInput
} from 'react-native';
import Firebase from '../api/config';


export default class SearchGroup extends React.Component {

    constructor(){
        super();
    }

    state = {
        search:''
    }

    handleSearch = (text)=>{
        this.setState({search:text})
    }

    search = ()=>{
        let course = this.state.search;
        console.log("Course Search: "+course);
    }

    render(){
        return(
            <View>
                <TextInput placeholder='Enter Course Name, ie AS.123.123' onChangeText={this.handleSearch}></TextInput>
                {/*Plan to replace this with a search icon instead of button */}
                <Button title='Enter' onPress={this.search}></Button>
            </View>
        );
    }
}