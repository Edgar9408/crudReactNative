import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, ScrollView, Button } from 'react-native'
import {ListItem, Avatar} from "react-native-elements"
import firebase from "../database/firebase"

const ListUsers = (props) => {
    const [Users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        firebase.db.collection("users").onSnapshot(querySnapshot => {
            const users = []
            querySnapshot.docs.forEach(doc => {
                const { name, email, phone } = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone
                })
            })
            setUsers(users)
        })
        setLoading(false)
    }, [])
    if (loading) {
        return (
            <View>
                <ActivityIndicator size="large" color="#9e9e9e" />
            </View>
        )
    }
    return (
        <ScrollView>
            <Button title="create user" onPress={() => props.navigation.navigate("CreateUser")} />
            {
                Users.map(user=>{
                    return(
                        <ListItem key={user.id} bottomDivider onPress={()=>props.navigation.navigate('DetailsUser', {id:user.id})}>
                            <ListItem.Chevron/>
                            <Avatar source={{uri:"https://image.freepik.com/vector-gratis/perfil-avatar-hombre-icono-redondo_24640-14044.jpg"}} rounded/>
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
    )
}

export default ListUsers
