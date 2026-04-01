import React from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodoContext } from "./contexts/TodoContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import { ToastProvider } from "./contexts/ToastContext";
const theme = createTheme({
  status: {
    Typography: {
      fontFamily: ["Alexandria"],
    },
  },
  palette: {
    primary: {
      main: "#dd2c00",
    },
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "read write",
    Details: "read at post",
    isCompleted: "false",
  },
  {
    id: uuidv4(),
    title: "read write",
    Details: "read at post",
    isCompleted: "false",
  },

  {
    id: uuidv4(),
    title: "search",
    Details: " search with post",
    isCompleted: "false",
  },
];

function App() {
  const [Todos, setTodos] = useState(initialTodos);
 

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#000",
            height: "100vh",
            direction: "rtl",
          }}
        >
         
          <TodoContext.Provider value={{ Todos, setTodos }}>
            <TodoList />
          </TodoContext.Provider>
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
