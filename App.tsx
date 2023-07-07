import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Text,
  Input,
  HStack,
  Center,
  NativeBaseProvider,
  extendTheme,
  VStack,
} from "native-base";
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import TodoList from "./components/TodoList"

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType { }
}

const LOCAL_STORAGE_KEY = 'todoApp.todos'

export default function App() {
  const [text, onChangeText] = useState<string>("")
  const [todos, setTodos] = useState<any[]>([])

  ///// The following local storage section only works on web //////
  // Load todos from local storage
  // useEffect(() => {
  //   const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY)
  //   if (!storedTodos) return
  //   const parsedTodos = JSON.parse(storedTodos)
  //   if (storedTodos) setTodos(prevTodos => [...prevTodos, ...parsedTodos])
  // }, [])

  // Save todos to local storage whenever the todos change
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  // }, [todos])

  // Handle the click event when a todo is clicked (passed through to TodoList & Todo to actually call this)
  function toggleTodo(id: string) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  // Validates the reference and the input, adds the new todo, and clears the textbox
  function handleAddTodo() {
    if (text === "") return

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: text, complete: false }]
    })
    onChangeText("")
  }

  // Updates the todo list to only the items that have not been completed
  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <NativeBaseProvider>
      <Center flex={1} w="100%">
        <VStack space={2}>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <HStack space={2}>
            <Input type="text" w="20%" value={text} onChangeText={onChangeText} />
            <Button onPress={handleAddTodo}>Add Todo</Button>
            <Button onPress={handleClearTodos}>Clear Completed</Button>
          </HStack>
          <Text>{todos.filter(todo => !todo.complete).length} left todos</Text>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}
