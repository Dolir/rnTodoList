import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types"
import { RootStackParamList } from "app"
import React from "react"
import { Button, Pressable, StyleSheet, Text, View } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"
import { colors } from "src/styles"

export const HomePage = ({
  navigation
}: NativeStackScreenProps<RootStackParamList, "Home">) => {
  return (
    <View style={styles.mainButtonContainer}>
      <Pressable
        style={styles.mainButton}
        onPress={() => navigation.navigate("Todo")}
      >
        <Text style={styles.mainText}>Hello</Text>
        <Text style={styles.textSmall}>this is home</Text>
        <View style={styles.description}>
          <Text style={styles.evenSmaller}>press this to go to todoList!!</Text>
          <Ionicons name="add" size={100} color={colors.blue} />
        </View>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  mainButtonContainer: {
    flex: 1,
    justifyContent: "center"
  },
  mainButton: {
    backgroundColor: colors.blue
  },
  mainText: {
    fontSize: 100,
    color: "white",
    textAlign: "center"
  },
  textSmall: {
    color: "white",
    fontSize: 40,
    textAlign: "center"
  },
  evenSmaller: {
    fontWeight: "900",
    color: colors.blue,
    fontSize: 12,
    textAlign: "center"
  },
  description: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  }
})
