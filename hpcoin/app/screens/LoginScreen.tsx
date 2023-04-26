import React, {useState} from 'react';

import axios from 'axios';

import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useDispatch} from 'react-redux';
import {updateUser} from '../store/userSlice';
import {endpoint} from '../contants/api';

function LoginScreen() {
  // const todoList = useSelector((state: RootState) => state.user);
  // const loadingStatus = useSelector((state) => state.todos.status);
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const handleTextChange = (inputText: any) => {
    setText(inputText);
  };

  const [textPass, setTextPass] = useState('');

  const handleTextPassChange = (inputText: any) => {
    setTextPass(inputText);
  };

  const handleLogin = async () => {
    try {
      let params = {
        username: text,
        password: textPass,
      };

      await axios
        .post(`${endpoint}/login`, params, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
        .then((response: any) => {
          if (response.data) {
            dispatch(
              updateUser({
                username: text,
                password: textPass,
                token: response.data.access_token,
              }),
            );
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="logo-electron" size={80} color="#033076" />
      <Text style={styles.text}>HP COIN</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleTextChange}
        value={text}
        placeholder="Username"
      />
      <TextInput
        style={styles.inputpass}
        onChangeText={handleTextPassChange}
        value={textPass}
        placeholder="Password"
        secureTextEntry={true}
      />
      <View style={styles.button}>
        <Button title="Sign In" color="#033076" onPress={() => handleLogin()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 30,
  },
  text: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
    color: '#033076',
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  inputpass: {
    width: '80%',
    padding: 10,
    marginBottom: 40,
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  button: {height: 'auto', width: '80%'},
});

export default LoginScreen;
