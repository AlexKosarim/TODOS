import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodosScreen from './src/pages/TodosScreen';
import SignInScreen from './src/pages/SignInScreen';
import { AuthContext } from './src/context/AuthContext';
import { useAuth } from './src/hooks/auth.hook';

import './config';
import { Text } from 'react-native';

export default function App() {
  const Stack = createStackNavigator();
  const { token, userId, login, logout, isAuthenticated, ready } = useAuth();

  if (!ready) {
    return <Text>{'Loading...'}</Text>;
  }

  return (
    <AuthContext.Provider
      value={{ token, userId, login, logout, isAuthenticated }}
    >
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
    </AuthContext.Provider>
  );
}
