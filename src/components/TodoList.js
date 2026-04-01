import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useContext, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import { TodoContext } from "../contexts/TodoContext";

export default function TodoList() {
  const { Todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [displayTodos, setdisplayTodos] = useState("all");

  const CompletedTodos = useMemo(() => {
    return Todos.filter((t) => {
      return t.isCompleted;
    });
  }, [Todos]);

  const notCompletedTodos = useMemo(() => {
    return Todos.filter((t) => {
      console.log("calling not completed todos");
      return !t.isCompleted;
    });
  }, [Todos]);

  let TodosToBe = Todos;

  if (displayTodos === "completed") {
    TodosToBe = CompletedTodos;
  } else if (displayTodos === "noneCompleted") {
    TodosToBe = notCompletedTodos;
  } else {
    TodosToBe = Todos;
  }

  const todojsx = TodosToBe.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storageTodos);
  }, []);

  function changeDisplayTodos(event, newValue) {
    if (newValue !== null) {
      setdisplayTodos(newValue);
    }
  }

  function HandleaddClick() {
    if (title.trim() === "") return;
    const newTodos = {
      id: uuidv4(),
      title: title,
      Details: "",
      isCompleted: false,
    };
    const updatedTodos = [...Todos, newTodos];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitle("");
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card
          sx={{
            minWidth: 275,
            textAlign: "center",
            boxShadow: "2px 4px 8px #999",
          }}
          style={{
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
          <CardContent>
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              My tasks
            </Typography>
            <Divider />
            <ToggleButtonGroup
              style={{ direction: "ltr", marginTop: "20px" }}
              exclusive
              onChange={changeDisplayTodos}
              value={displayTodos}
              color="primary"
            >
              <ToggleButton value="noneCompleted">UnCompleted</ToggleButton>
              <ToggleButton value="completed">Completed</ToggleButton>
              <ToggleButton value="all">All</ToggleButton>
            </ToggleButtonGroup>
          </CardContent>
          {todojsx}
          <Grid container style={{ margin: "10px" }} spacing={1}>
            <Grid size={8}>
              <TextField
                style={{ width: "90%" }}
                className="outlined"
                label="task Title"
                variant="outlined"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Grid>
            <Grid size={4}>
              <Button
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={() => {
                  HandleaddClick();
                }}
                disabled={title.length == 0}
              >
                select
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
