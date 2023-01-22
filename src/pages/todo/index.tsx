import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import {
  ActivityIndicator,
  Alert,
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native"
import { RootStackParamList } from "app"
import { Todo, TodoItem } from "./todoItem"
import { colors } from "src/styles"
import storage from "src/store"

export const TodoPage = ({
  navigation
}: NativeStackScreenProps<RootStackParamList, "Todo">) => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [text, setText] = useState("")

  useEffect(() => {
    setIsLoading(true)
    storage
      .load({
        key: "todos"
      })
      .then((res) => {
        setTodos(res)
      })
      .catch((er) => console.log(er))
      .finally(() => setIsLoading(false))
  }, [])

  const addNewTodo = (name: string) => {
    const defaultName = `todoItem #${todos.length + 1}`
    const newTodo = {
      name: name || defaultName,
      date: Date.now(),
      checked: false
    }

    setTodos((prev) => {
      const newTodos = [newTodo, ...prev]
      storage.save({ key: "todos", data: newTodos })
      return newTodos
    })
  }

  const clearTodos = () => {
    setTodos([])

    storage.remove({ key: "todos" })
  }
  const handleCheckChange = (idDate: number) => (value: boolean) => {
    setTodos((prev) => {
      const found = prev.find((todo) => todo.date === idDate)
      if (found) found.checked = value
      storage.save({ key: "todos", data: prev })

      return [...prev]
    })
  }
  const removeTodo = (idDate: number) => () => {
    setTodos((prev) => {
      const newTodos = prev.filter((todo) => todo.date !== idDate)
      storage.save({ key: "todos", data: newTodos })
      return newTodos
    })
  }
  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator color={colors.blue} size={100} />
      </View>
    )
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              onChangeText={(newText) => setText(newText)}
              placeholder="Write todo name"
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                addNewTodo(text)
                setText("")
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Create Todo</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View>
        <ScrollView>
          <Button title="Add new Todo" onPress={() => setModalVisible(true)} />
          <Button
            color={colors.blue}
            title="Clear Todos"
            onPress={clearTodos}
          />
          {todos.map((todo) => (
            <TodoItem
              removeTodo={removeTodo(todo.date)}
              todo={todo}
              key={todo.date}
              handleCheckChange={handleCheckChange(todo.date)}
            />
          ))}
        </ScrollView>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: "rgba(1,1,1,0.3)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10
  },
  buttonOpen: {
    backgroundColor: "#F194FF"
  },
  buttonClose: {
    backgroundColor: "#2196F3"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})
