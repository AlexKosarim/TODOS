import React from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import '../../config';

export default function TodosPage() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { login } = React.useContext(AuthContext);

  const onSignUpHandler = () => login('token2');

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
  form: {},
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20
  },
  button: {
    margin: '10px'
  },
  input: {
    width: '100%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3959ab'
  }
});
