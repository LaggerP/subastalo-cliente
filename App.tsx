import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Me from './components/me'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>
        <Me/>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
