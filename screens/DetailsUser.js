import React, { useEffect, useState } from 'react'
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import firebase from '../database/firebase'


const DetailsUser = (props) => {
    const initialState={
        id: "",
        name: "",
        email: "",
        phone: ""
    };
    const [user, setUser] = useState(initialState)
    const [loading, setLoading] = useState(true);
    const getUser = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id);
        const doc = await dbRef.get();
        let user = doc.data();
        setUser({
            ...user,
            id: doc.id
        })
        setLoading(false)
    }
    useEffect(() => {
        getUser(props.route.params.id)
    }, [])

    const handleInputText = (name, value) => {
        setUser({ ...user, [name]: value })
    }
    const deleteUser = async (id)=>{
        let dbRef=firebase.db.collection("users").doc(id);
        await dbRef.delete();
        props.navigation.navigate("ListUsers")
    }
    const confirmationAlert=()=>{
        Alert.alert("Borrar usuario", "Desea borrar éste usuario?",[
            {text: 'Sí', onPress:()=>deleteUser(user.id)},
            {text: 'No', onPress:()=>console.log(false)}
        ])
    }
    const updateUser=async (id)=>{
        if (user.name == "") {
            alert("por favor esriba un nombre")
        } else if (user.email == "") {
            alert("por favor esriba un email")
        }else if(!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(user.email)){
            alert("Ingrese un email válido ej: nombre@dominio.com")
        } else if (user.phone == "") {
            alert("por favor esriba un telefono")
        } else if(!/^\d{7,15}$/g.test(user.phone)) {
            alert("El numero de telefono no debe contener espacios ni simbolos(-,+)")
        }else{
            let dbRef=firebase.db.collection("users").doc(id);
            await dbRef.set({
                name: user.name,
                email: user.email,
                phone: user.phone
            });
            setUser(initialState);
            props.navigation.navigate("ListUsers");
        }
    }
    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    }
    return (
            <ScrollView style={styles.container}>
                <View style={styles.imputGroup} >
                    <TextInput placeholder="Name User" value={user.name} onChangeText={(value) => handleInputText("name", value)} />
                </View>
                <View style={styles.imputGroup}>
                    <TextInput placeholder="Email User" value={user.email} onChangeText={(value) => handleInputText("email", value)} />
                </View>
                <View style={styles.imputGroup}>
                    <TextInput placeholder="Phone User" value={user.phone} onChangeText={(value) => handleInputText("phone", value)} />
                </View>
                <View>
                    <Button color="#19AC52" title="Update User" onPress={() => updateUser(user.id)} />
                </View>
                <View>
                    <Button color="#E37399" title="Delete User" onPress={() => confirmationAlert()} />
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

export default DetailsUser;