import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Navbar } from './src/Navbar';
import { AddTodo } from './src/AddTodo';
import { Todo } from './src/Todo';
import './config';

export default function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    try {
      fetch(`${window.baseUrl}/api/todo`)
        .then((res) => res.json())
        .then((arr) => setTodos(arr))
        .catch((e) => console.log(e));
    } catch (error) {
      (err) => console.log(err);
    }
  };
  useEffect(() => getTodos(), []);

  const addTodo = (title = 'TODO') => {
    try {
      fetch(`${window.baseUrl}/api/todo/add`, {
        method: 'POST',
        body: JSON.stringify({ title }),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then(({ todo }) => setTodos((prev) => [todo, ...prev]))
        .catch((e) => console.log(e));
    } catch (error) {
      (err) => console.log(err);
    }
  };

  const removeTodo = (id) => {
    try {
      fetch(`${window.baseUrl}/api/todo/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then(() => setTodos((prev) => prev.filter((todo) => todo.id !== id)))
        .catch((e) => console.log(e));
    } catch (error) {
      (err) => console.log(err);
    }
  };

  return (
    <View>
      <Navbar />
      <View style={styles.container}>
        <AddTodo onSubmit={addTodo} />
        <View>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <Todo todo={item} onRemove={removeTodo} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
});
