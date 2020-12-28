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
        // .then((res) => console.log(res))
        // .then((json) => console.log(json))
        .catch((e) => console.log(e));
    } catch (error) {
      (err) => console.log(err);
    }
  };
  useEffect(() => getTodos(), []);

  const addTodo = (title = 'TODO') => {
    // setTodos((prev) => [
    //   ...prev,
    //   {
    //     id: Date.now().toString(),
    //     title
    //   }
    // ]);

    try {
      console.log(1111);
      fetch(`${window.baseUrl}/api/todo/add`, {
        method: 'POST',
        body: JSON.stringify({ title }),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((arr) => console.log(arr))
        // .then((res) => console.log(res)),
        // .then((json) => console.log(json))
        .catch((e) => console.log(e));
    } catch (error) {
      (err) => console.log(err);
    }
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
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
