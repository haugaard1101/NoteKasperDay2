import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-web';
import { useState } from 'react';

export default function App() {

  const [text, setText] = useState('') //"hook" ligesom session
  const [noteList, setNoteList] = useState([]);

  
function addBtnPressed(){
  console.log("blah blah: " + text)
  if (text.trim() !== '') {
    setNoteList([...noteList, {headline: text, expanded: false}]);
    setText('');
  }
  console.log("list: " + noteList)

  //gem teksten i en liste----------------------------------

  function toggleExpanded(index) {
    const updatedList = [...noteList];
    updatedList[index].expanded = !updatedList[index].expanded;
    setNoteList(updatedList);
  }
}

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <TextInput 
      style={styles.input}
      placeholder='Add a note' 
      value={text}
      onChangeText={(txt)=>setText(txt)}
      />


      <Button title='knap'onPress={addBtnPressed}/>


      <FlatList
      style={styles.list}
        data={noteList}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => toggleExpanded(index)}>
            <View>
            <Text style={styles.headline}>{item.headline}</Text>
              {item.expanded && <Text style={styles.expandedText}>{item.headline}</Text>}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  list: {
    width: '100%',
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headline: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandedText: {
    marginTop: 10,
    color: '#666',
  },
});
