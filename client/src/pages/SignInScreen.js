import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useHttp } from '../hooks/http.hooks';
import { AuthContext } from '../context/AuthContext';
import '../../config';

export default function TodosPage() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  const { request } = useHttp();

  const { login } = React.useContext(AuthContext);

  const onChangePassword = (val) => {
    setError(null);
    setPassword(val);
  };

  const onChangeUsername = (val) => {
    setError(null);
    setUsername(val);
  };

  const onSignUpHandler = async () => {
    setError(null);
    try {
      const form = {
        username,
        password
      };
      await request(`${window.baseUrl}/api/auth/signup`, 'POST', form)
        .then(({ token, userId }) => login(token, userId))
        .catch((err) => {
          if (err && err.message) {
            setError(err.message);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }; //login('token2');

  const onSignInHandler = async () => {
    setError(null);
    try {
      const form = {
        username,
        password
      };
      await request(`${window.baseUrl}/api/auth/signin`, 'POST', form)
        .then(({ token, userId }) => login(token, userId))
        .catch((err) => {
          if (err && err.message) {
            setError(err.message);
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <View style={styles.block}>
          <TextInput
            placeholder="Username"
            value={username}
            name="username"
            onChangeText={onChangeUsername}
            style={styles.input}
          />
        </View>
        <View style={styles.block}>
          <TextInput
            placeholder="Password"
            value={password}
            name="password"
            onChangeText={onChangePassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
        {error && (
          <View style={styles.blockError}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        <View style={styles.buttonsContainer}>
          <Button
            title="Sign up"
            onPress={onSignUpHandler}
            style={styles.button}
          />
          <Button
            title="Sign in"
            onPress={onSignInHandler}
            style={styles.button}
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
  blockError: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15
  },
  errorText: {
    color: 'red'
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
