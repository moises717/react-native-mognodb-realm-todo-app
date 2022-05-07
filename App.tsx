import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { TodoForm } from './src/components/TodoForm';
import TodoList from './src/components/TodoList';
import useTodo from './src/hooks/useTodo';


export default function App() {

  const { addTodo, data, handleComplete, handleDelete, removeAll, setTitle, title } = useTodo();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>TO DO ✓</Text>
      </View>

      <TodoForm addTodo={addTodo} removeAll={removeAll} setTitle={setTitle} title={title} />

      <TodoList data={data} handleComplete={handleComplete} handleDelete={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d348b',
    height: 50,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },

});
