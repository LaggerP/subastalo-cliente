import React from 'react';
import { Text } from 'react-native';

export interface Person {
    name: string,
    age: number
}

export default function Me() {

    const Pablo:Person = {
        name: 'Pablo',
        age: 23
    }

  return (
    <>
      <Text>Soy {Pablo.name} y tengo {Pablo.age}</Text>
    </>
  );
}
