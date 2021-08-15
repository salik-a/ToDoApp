import React,{useState} from 'react';
import { TouchableOpacity, Text, SafeAreaView, StyleSheet, View, KeyboardAvoidingView, Platform, TextInput, Keyboard } from 'react-native';
import Task from './components/Task'

function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([])
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }
  const completeTask = (index) => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  return (
    <View style={styles.container}>
      <View style={styles.task}>
        <View style={styles.sectionTitle}>
          <Text style={styles.title}>Today's Tasks</Text>
        </View>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key= {index} onPress={() => completeTask(index)}>
                  <Task key={index} text={item}/>
                </TouchableOpacity>
              )
            })
          }
          
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={ styles.write } >
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={ text => setTask(text) }/>
        <TouchableOpacity onPress={()=>handleAddTask()}>
          <View style={styles.add}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  task: {
    paddingTop: 40,
    paddingHorizontal: 20,
    
  },
  sectionTitle: {
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 20,
  },
  write: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  add: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText:{},

});

export default App;