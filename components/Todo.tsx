import React from 'react'
import {
    Text,
    Checkbox,
} from "native-base";

export default function Todo({ todo, toggleTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    return (
        <Checkbox value={todo.id} isChecked={todo.complete} onChange={handleTodoClick}><Text>{todo.name}</Text></Checkbox>
    )
}
