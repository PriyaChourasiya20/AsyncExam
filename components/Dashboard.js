import React from 'react';
import {StyleSheet, Text, View, Button, StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
  // const logout = async () => {
  //   await AsyncStorage.removeItem('userData');
  //   navigation.navigate('Signup');
  // };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Dashboard screen</Text>
      {/* <Button onPress={logout} title="logout" /> */}
      <Button onPress={() => navigation.navigate('Signup')} title="logout" />
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
