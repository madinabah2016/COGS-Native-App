import firebase from 'firebase';
let config = {
    apiKey: "AIzaSyAlbPNnjTwz4ietPp_vF7FQBZIeVME6bY8",
    authDomain: "cogs-d2124.firebaseapp.com",
    databaseURL: "https://cogs-d2124.firebaseio.com",
    projectId: "cogs-d2124",
    storageBucket: "cogs-d2124.appspot.com",
    messagingSenderId: "1029436376643",
    appId: "1:1029436376643:web:6fcfff4f9e6818c76b36f6"
};
let Firebase = firebase.initializeApp(config);
export default Firebase;

export const getUser = (id)=>{
    Firebase.database().ref('Users/'+id).once('value', (snapshot)=>{
        if(snapshot.exists){
            return snapshot.val();

        }
    });
    return null;
}

///////////Group API's/////////////
export const getUserGroups = async(userId)=>{
    Firebase.database().ref('Users/'+userId).on('value', (snapshot)=>{
            
        if(snapshot.exists){
            console.log(snapshot.val().groups);
            return snapshot.val().groups;

        }
    });
    return null;
}

export const getSingleGroupDetail = (name)=>{
    Firebase.database().ref('Groups/'+name+'/Group Description').once('value', (snapshot)=>{
            
        if(snapshot.exists){
            return snapshot.val();

        }
    });
    return null;
}





export const saveGroup = (course, name, member, description )=>{

    let group = {
        courseName:course,
        groupName:name,
        members:[member],
        shortDescription:description,
    }
    Firebase.database().ref('Groups/'+name+'/Group Description').set(group, (error)=>{

        if(error){
          console.log("Error Message in Saving Groups: "+error);
        }
        else{
          console.log('Group was succesfully saved')
          
        }

      });
}

////////Meeting API's/////////////////

