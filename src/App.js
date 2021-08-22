import React from 'react';
import { StyleSheet, View } from 'react-native';
import Task from './components/Task'

function App() {
  
  return (
    <View style={styles.container}>
      <Task />            
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#E8EAED',
  },
});

export default App;