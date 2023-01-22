import Checkbox from "expo-checkbox"
import React from "react"
import { Button, Text, View, StyleSheet } from "react-native"
import { colors } from "src/styles"
import Ionicons from "@expo/vector-icons/Ionicons"

export type Todo = {
  name: string
  date: number
  checked: boolean
}

export const TodoItem = ({
  todo,
  handleCheckChange,
  removeTodo
}: {
  todo: Todo
  handleCheckChange: (value: boolean) => void
  removeTodo: () => void
}) => {
  return (
    <View style={styles.todoContainer}>
      <Checkbox
        value={todo.checked}
        onValueChange={handleCheckChange}
        color={colors.blue}
      />
      <Text
        numberOfLines={1}
        style={[styles.todoName, todo.checked && styles.checked]}
      >
        {todo.name}
      </Text>
      <Ionicons
        name="trash"
        size={18}
        color={colors.blue}
        onPress={removeTodo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  todoContainer: {
    padding: 10,
    marginBottom: 10,
    borderColor: colors.blue,
    borderStyle: "solid",
    borderWidth: 3,
    display: "flex",
    flexDirection: "row"
  },
  todoName: {
    flex: 1,
    marginLeft: 10
  },
  checked: {
    textDecorationLine: "line-through"
  }
})
