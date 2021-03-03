import React, { useState } from 'react'
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import firebase from "../database/firebase"

const CreateUser = (props) => {
    const [state, setState] = useState({
        name: "",
        email: "",
        phone: ""
    })
    
    const handleInputText = (name, value) => {
        setState({ ...state, [name]: value })
    }
    const addUser = async () => {
        if (state.name == "") {
            alert("Por favor esriba un nombre");
        } else if (state.email == "") {
            alert("Por favor esriba un email");
        }else if(!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(state.email)){
            alert("Ingrese un email válido ej: nombre@dominio.com")
        } else if (state.phone == "") {
            alert("Por favor esriba un telefono");
        } else if(!/^\d{7,15}$/g.test(state.phone)) {
            alert("El numero de telefono no debe contener espacios ni simbolos(-,+)")
        } else {
            await firebase.db.collection("users").add({
                name:state.name,
                email:state.email,
                phone:state.phone
            });
            setState({
                name: "",
                email: "",
                phone: ""
            });
            props.navigation.navigate("ListUsers");
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imputGroup} >
                <TextInput placeholder="Name User" onChangeText={(value) => handleInputText("name", value)} />
            </View>
            <View style={styles.imputGroup}>
                <TextInput placeholder="Email User" onChangeText={(value) => handleInputText("email", value)} />
            </View>
            <View style={styles.imputGroup}>
                <TextInput placeholder="Phone User" onChangeText={(value) => handleInputText("phone", value)} />
            </View>
            <View>
                <Button title="Save User" onPress={addUser} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    imputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
});

export default CreateUser
