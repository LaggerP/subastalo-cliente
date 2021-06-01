import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import {Button} from 'react-native-elements';

const styles = StyleSheet.create({
  containerCard: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
    marginVertical:60
  },
  containerButton: {
    backgroundColor: "#F5F5F5",
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});


export default class NewTarjeta extends Component {

  _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
  _onFocus = (field) => console.log("focusing", field);

  render() {
    return (
      <View>
        <View style={styles.containerCard}>
          <CreditCardInput
            autoFocus

            requiresName
            requiresCVC

            labelStyle={styles.label}
            inputStyle={styles.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}

            onFocus={this._onFocus}
            onChange={this._onChange} />
        </View>
        <View style={styles.containerButton}>
          <Button 
            title='Aceptar'
            type='solid'
            buttonStyle={{
               backgroundColor: '#FC9905',
               borderRadius: 5,
               height: 45,
               width: 250,
               borderWidth: 1.7,
               borderColor: '#FC9905',
               marginHorizontal: 5
              }}
            />
        </View>
      </View>
    );
  }
}


