import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Navbar } from '../components/Navbar/Navbar';
import { AddTodo } from '../components/Todo/AddTodo';
import { Todo } from '../components/Todo/Todo';
import { useHttp } from '../hooks/http.hooks';
import { AuthContext } from '../context/AuthContext';
import '../../config';

export default function TodosScreen() {
  const [todos, setTodos] = useState([]);
  const { request } = useHttp();
  const { token, logout } = React.useContext(AuthContext);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await request(`${window.baseUrl}/api/todo`, 'GET', null, {
          Authorization: `Bearer ${token}`
        }).catch((er) => console.log(er));
        setTodos(todos);
      } catch (error) {
        (err) => console.log(err);
      }
    };
    getTodos();
  }, []);

  const addTodo = async (title = 'TODO') => {
    try {
      const { todo } = await request(
        `${window.baseUrl}/api/todo/add`,
        'POST',
        {
          title
        },
        {
          Authorization: `Bearer ${token}`
        }
      );
      if (todo) {
        setTodos((prev) => [todo, ...prev]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await request(
        `${window.baseUrl}/api/todo/delete/${id}`,
        'DELETE',
        {},
        {
          Authorization: `Bearer ${token}`
        }
      );
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
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
