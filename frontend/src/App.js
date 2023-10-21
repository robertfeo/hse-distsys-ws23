/* eslint-disable jsx-a11y/alt-text */
// App.js
import React, { useState, useEffect } from "react";
import { fetchTodos } from "./api/todos";

import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { Footer } from "./components/Footer";
import { Spinner } from "@material-tailwind/react";
import Heading from "./components/Heading";
import clsx from 'clsx';
import { SearchIcon } from '@./components/icons';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos()
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the todos", error);
        setLoading(false);
      });
  }, []);

  const refreshTodos = () => {
    setLoading(true);
    fetchTodos()
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the todos", error);
        setLoading(false);
      });
  };

  return (
    <>
      {
        loading ? (
          <div className="absolute flex h-screen" >
            <Spinner color="blue" />
          </div>
        ) : null
      }
      <div className="flex flex-col justify-center items-center h-screen">
        <AddTodo refreshTodos={refreshTodos} />
        <TodoList todos={todos} refreshTodos={refreshTodos} />
        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
