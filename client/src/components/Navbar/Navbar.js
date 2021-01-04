import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {
  const { logout } = React.useContext(AuthContext);
  return (
    <>
      <View style={styles.title}>
        <Text style={styles.text}>TODO APP</Text>
      </View>
      <View style={styles.button}>
        <Button onPress={logout} title="Log out" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#3949ab',
    paddingBottom: 10
  },
  button: {
    height: 80,
    // alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#3949ab',
    position: 'absolute',
    right: 0,
    paddingBottom: 10,
    paddingHorizontal: 10
  },
  text: {
    color: 'white',
    fontSize: 20
  }
});
