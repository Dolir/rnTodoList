import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Button, Text, View } from "react-native"
import { HomePage } from "src/pages/home"
import { TodoPage } from "src/pages/todo"
import { createDrawerNavigator } from "@react-navigation/drawer"
export type RootStackParamList = {
  Home: undefined
  Todo: undefined
}

// const Stack = createNativeStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator<RootStackParamList>()

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen
            name="Home"
            component={HomePage}
            options={{
              drawerLabel: "Home",
              title: "Home",
              header: () => ""
            }}
            // options={{ title: "", header: () => "" }}
          />
          <Drawer.Screen
            name="Todo"
            component={TodoPage}
            options={{
              drawerLabel: "Todo List",
              title: "Todo List"
            }}
            // options={{ drawerLabel: "Second page Option" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  )
}
