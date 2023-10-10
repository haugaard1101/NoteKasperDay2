import { app, database } from './firebase'
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, FlatList, Button, View, TextInput, Text, Image } from 'react-native';
import { useCollection } from 'react-firebase-hooks/firestore'; //install with: $ npm install react-firebase-hooks
import * as ImagePicker from 'expo-image-picker'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function App() {
  const [text, setText] = useState('')
  const [editObj, setEditObj] = useState(null)
  const [values, loading, error] = useCollection(collection(database, "notes"))
  const data = values?.docs.map((doc) => ({...doc.data(), id: doc.id}))
  const [imagePath, setImagePath] = useState(null)

  const ListPage = ({navigation, route}) => {

    const myList = [{key:1, name: "Anna"}, {key:2, name: "Bob"}]

    function handleButton (){
    navigation.navigate('DetailPage')
    }
    
      return (
          <View>
              <Text> Hej </Text>
              <FlatList 
                data={myList}
                renderItem{(note) => <Button title={note.item.name}></Button>}
                />
          </View>
      )
    }
    
    const DetailPage = ({navigation, route}) => {
      return (
          <View>
              <Text> andre ting </Text>
          </View>
      )
    }

  const Stack = createNativeStackNavigator()
  return (
<NavigationContainer>
  <Stack.Navigator initialRouteName = 'ListPage'>
<Stack.Screen
 name = 'ListPage'
component ={ListPage}
/>
<Stack.Screen
 name = 'DetailPage'
component ={DetailPage}
/>
  </Stack.Navigator>
</NavigationContainer>
  );



  async function buttonHandler(){
    try{
    await addDoc(collection(database, "notes"), {
      text: text
    })
    }catch(err){
      console.log("fejl i DB " + err)
    }
  }

  async function deleteDocument(id){
      await deleteDoc(doc(database, "notes", id))
  }

  function viewUpdateDialog(item){
    // få noget at blive synligt
    setEditObj(item)
  }

  async function saveUpdate(){
      await updateDoc(doc(database, "notes", editObj.id), {
        text: text
      })
      setText("")
      setEditObj(null)
  }

  async function launchImagePicker() {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
    })
    if(!result.canceled){
setImagePath(result.assets[0].uri)
    }
  }

  return (

    <View style={styles.container}>
      { editObj && 
        <View>
          <TextInput defaultValue={editObj.text} onChangeText={(txt) => setText(txt)} />
          <Text onPress={saveUpdate}>Save</Text>
        </View> 
      }

      <TextInput style={styles.textInput}  onChangeText={(txt) => setText(txt)} />
      <Button title='Press Me' onPress={buttonHandler} ></Button>
      <FlatList
        data={data}
        renderItem={(note) => 
          <View>
            <Text>{note.item.text}</Text>
            <Text style={styles.deleteButton} onPress={() => deleteDocument(note.item.id)}>Delete</Text>
            <Text style={styles.updateButton} onPress={() => viewUpdateDialog(note.item)}>Update</Text>
          </View>
      }
      />
<Image style = {{width: 200, heigh: 200}}source = {{uri:imagePath}}/>
      <Button title = 'Pick image' onPress={launchImagePicker}/>
      <StatusBar style="auto" />
    </View>
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,          // Add border
    borderColor: 'black',   // Border color
  },
  textInput: {
    backgroundColor: '#fff',
    minWidth: 300,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,          // Add border
    borderColor: 'black',   // Border color
    borderRadius: 4,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 4,
    borderWidth: 1,          // Add border
    borderColor: 'black',   // Border color
  },
  listItemText: {
    fontSize: 18,
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
    borderRadius: 4,
    borderWidth: 1,          // Add border
    borderColor: 'black',   // Border color
  },
  updateButton: {
    color: 'blue',
    fontSize: 16,
    borderRadius: 4,
    borderWidth: 1,          // Add border
    borderColor: 'black',   // Border color
  },
});
