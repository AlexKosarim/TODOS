import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Navbar } from './src/components/Navbar/Navbar';
import { AddTodo } from './src/components/Todo/AddTodo';
import { Todo } from './src/components/Todo/Todo';
import { useHttp } from './src/hooks/http.hooks';
import './config';

export default function App() {
  const [todos, setTodos] = useState([]);
  const { request } = useHttp();

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await request(`${window.baseUrl}/api/todo`);
        setTodos(todos);
      } catch (error) {
        (err) => console.log(err);
      }
    };
    getTodos();
  }, []);

  const addTodo = async (title = 'TODO') => {
    try {
      const { todo } = await request(`${window.baseUrl}/api/todo/add`, 'POST', {
        title
      });
      if (todo) {
        setTodos((prev) => [todo, ...prev]);
      }
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
