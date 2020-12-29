import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
// import { Navbar } from '../components/Navbar/Navbar';
// import { useHttp } from '../hooks/http.hooks';
import { setStorageItem } from '../utils/storage';
import '../../config';
// import AsyncStorage from '@react-native-community/async-storage';

export default function TodosPage() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  // const { signIn } = React.useContext(AuthContext);

  const onSignUpHandler = async () => await setStorageItem('token', 'token1');

  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <View style={styles.block}>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>
        <View style={styles.block}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Sign up"
            onPress={onSignUpHandler}
            style={styles.button}
          />
          <Button
            title="Sign in"
            onPress={() => {}}
            style={styles.button}
            disabled
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  form: {
    // borderStyle: 'solid',
    // borderWidth: 2,
    // borderColor: '#3959ab',
    // padding: 10
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20
  },
  button: {
    margin: 30
  },
  input: {
    width: '100%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3959ab'
  }
});
