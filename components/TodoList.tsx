import React from 'react'
import Todo from "./Todo"

export default function TodoList({ todos, toggleTodo }) {
    let a: string = "a"
    return (
        todos.map(todo => {
            return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        })
    )
}
