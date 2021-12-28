import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [Users, setUsers] = React.useState([]);
  const [name, setName] = React.useState('');

  const handleEmail = email => {
    setEmail(email);
    setError('');
  };

  React.useEffect(async () => {
    const items = await AsyncStorage.getItem('Users');
    const items1 = items == null ? [] : JSON.parse(items);
    setUsers(items1);
  }, []);

  const handleSignup = () => {
    let fData = {Email: email, Password: password, Name: name};
    let data = Users;
    data.push(fData);
    setUsers(data);
    AsyncStorage.setItem('Users', JSON.stringify(Users));
    setEmail('');
    setPassword('');
    navigation.navigate('Login');
    Alert.alert('Signup', 'Successfull', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder="Name"
        value={name}
        onChangeText={name => setName(name)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder="Email"
        value={email}
        onChangeText={email => handleEmail(email)}
      />
      {error ? (
        <Text style={{color: 'red', paddingBottom: 20}}>{error}</Text>
      ) : null}
      <TextInput
        style={styles.inputStyle}
        placeholder="Password"
        value={password}
        onChangeText={password => setPassword(password)}
        // maxLength={15}
        secureTextEntry={true}
      />
      <Button color="#3740FE" title="Signup" onPress={handleSignup} />

      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('Login')}>
        Already Registered? Click here to login
      </Text>

      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('Todo')}>
        Todo
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default Signup;
