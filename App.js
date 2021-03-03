import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"


const Stack = createStackNavigator();

import ListUsers from "./screens/ListUsers.js";
import DetailsUser from "./screens/DetailsUser.js";
import CreateUser from "./screens/CreateUser.js";

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListUsers" component={ListUsers} options={{title:"Lista de usuarios"}} />
      <Stack.Screen name="CreateUser" component={CreateUser} options={{title:"Crear Usuario"}} />
      <Stack.Screen name="DetailsUser" component={DetailsUser} options={{title:"Detalles de usuario"}} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
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
