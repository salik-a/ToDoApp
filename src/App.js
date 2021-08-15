import React,{useState, useEffect} from 'react';
import { TouchableOpacity, Text, SafeAreaView, StyleSheet, View, KeyboardAvoidingView, Platform, TextInput, Keyboard } from 'react-native';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([])
  useEffect(() => {
    getData()
  }, []);



  const handleAddTask = () => {
    Keyboard.dismiss();
    //setTaskItems([...taskItems, task])
    //setTask(null);
    storeData(uuidv4(),task)
  }
  /*const completeTask = (index,item) => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
   
  }*/
  const storeData = async (index,item) => {
    try {
      await AsyncStorage.setItem(index, item)
    } catch (e) {
      console.log(e)
    }
    
  }
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  

  const getData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      setTaskItems(result)
      
      //return result.map(req =>console.log(req));
    } catch (error) {
      console.error(error)
    }
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
              console.log(item)
              return (
                <TouchableOpacity key= {index} onPress={() => completeTask(index,item)}>
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