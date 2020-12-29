import React, { useState, useEffect } from 'react';
// import { StyleSheet, FlatList, View } from 'react-native';
// import { Navbar } from './src/components/Navbar/Navbar';
// import { AddTodo } from './src/components/Todo/AddTodo';
// import { Todo } from './src/components/Todo/Todo';
// import { useHttp } from './src/hooks/http.hooks';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodosScreen from './src/pages/TodosScreen';
import SignInScreen from './src/pages/SignInScreen';
import { getStorageItem, removeStorageItem } from './src/utils/storage';

import './config';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [token, setToken] = useState(null);

  const Stack = createStackNavigator();

  useEffect(() => {
    async function getValue() {
      const storedToken = await getStorageItem('token');
      console.log(storedToken);
      if (storedToken != null) {
        setToken(storedToken);
      }
      // Use for token removing
      // await removeStorageItem('token');
    }

    getValue();
  }, []);

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {token == null ? (
          <Stack.Screen name="Sign In" component={SignInScreen} />
        ) : (
          <>
            <Stack.Screen name="Todos" component={TodosScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
