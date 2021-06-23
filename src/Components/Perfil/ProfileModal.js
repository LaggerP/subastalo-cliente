import React from 'react';
import { Image, View } from 'react-native';
import { Button, Overlay, Text } from 'react-native-elements';

export const ProfileModal = ({ modalData, setShowModal, navigation }) => {
    const { visible, title, msg } = modalData

    const toggleOverlay = () => {
        setShowModal({ ...modalData, visible: !visible });
    };

    return (
        <View>
            <Overlay isVisible={visible}
                onBackdropPress={toggleOverlay}
                overlayStyle={{
                    alignItems: 'center',
                    textAlign: 'center',
                    height: 'auto',
                    width: 350,
                    borderRadius: 10
                }}>
                <Text h4 style={{ marginTop: 20, textAlign: 'center' }}>{title}</Text>
                <Text style={{ marginHorizontal: 18, marginTop: 20, textAlign: 'center' }}>{msg}</Text>
                <Button
                    onPress={() => toggleOverlay()}
                    title='Aceptar'
                    titleStyle={{ color: '#FC9905', }}
                    buttonStyle={{
                        backgroundColor: '#fafafa',
                        borderRadius: 5,
                        height: 45,
                        width: 120,
                        borderWidth: 1,
                        borderColor: '#FC9905',
                        marginHorizontal: 5,
                        marginVertical: 30
                    }}
                />

            </Overlay>
        </View>
    );
};