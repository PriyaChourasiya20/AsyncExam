import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');
  const [loginerror, setLoginerror] = useState('');
  const [Users, setUsers] = useState([]);

  React.useEffect(async () => {
    const items = await AsyncStorage.getItem('Users');
    const items1 = items == null ? [] : JSON.parse(items);
    setUsers(items1);
  }, []);

  const handleEmail = email => {
    setEmail(email);
    setError('');
  };

  const handleSignin = () => {
    let data = Users;
    data.map(value => {
      if (value.Email === email && value.Password === password) {
        setLoginerror('write valid id and pass');
        navigation.navigate('Dashboard');
      }
      if (value.Email !== email || value.Password !== password) {
        setLoginerror('user not exist');
      }
    });
  };
  console.log('users', Users);

  return (
    <View style={styles.container}>
      {/* <TextInput
        onChangeText={value => setUsername(value)}
        placeholder="Username"
      /> */}

      <TextInput
        onChangeText={email => handleEmail(email)}
        placeholder="Email"
      />
      {loginerror ? (
        <Text style={{color: 'red', paddingBottom: 20}}>{loginerror}</Text>
      ) : null}

      <TextInput
        onChangeText={password => setPassword(password)}
        placeholder="Password"
        secureTextEntry={true}
      />
      {loginerror ? (
        <Text style={{color: 'red', paddingBottom: 20}}>{loginerror}</Text>
      ) : null}

      <Button onPress={handleSignin} title="login" />
      {/* <Text>username : {username}</Text>
      <Text>password : {password}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
