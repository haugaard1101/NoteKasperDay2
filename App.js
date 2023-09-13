import { app, database } from './firebase'
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, FlatList, Button, View, TextInput, Text } from 'react-native';
import { useCollection } from 'react-firebase-hooks/firestore'; //install with: $ npm install react-firebase-hooks

import {NavigationContainer} from '@react-navigation/native'; // npm install @react-navigation/native
import {createNativeStackNavigator} from '@react-navigation/native-stack'; // npm install @react-navigation/native-stack
import {StyleSheet, View, Button, Text, TextInput} from 'react-native'
import { useState } from 'react'


export default function App() {
  const [text, setText] = useState('')
  const [editObj, setEditObj] = useState(null)
  const [values, loading, error] = useCollection(collection(database, "notes"))
  const data = values?.docs.map((doc) => ({...doc.data(), id: doc.id}))
  

    
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
