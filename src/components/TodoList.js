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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContext } from "../contexts/ToastContext";



export default function TodoList() {
  const { Todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [displayTodos, setdisplayTodos] = useState("all");
  const [Del, setDel] = useState(false);
  const [DialogTodo, setDialogTodo] = useState({ title: "", Details: "" });
  const [EditDialog, setshowEidtDialog] = useState(false);
  const {ShowHideToast} = useContext(ToastContext);

  const CompletedTodos = useMemo(() => {
    return Todos.filter((t) => {
      return t.isCompleted;
    });
  }, [Todos]);

  const notCompletedTodos = useMemo(() => {
    return Todos.filter((t) => {
      console.log("calling not completed todos");
      return !t.isCompleted
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
    ShowHideToast("Task added successfully");
  }

  function handleDeleteDialogClose() {
    setDel(false);
  }

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    alert(todo.id);
    setDel(true);
  }
  function handleDeleteTodo() {
    const updateTodos = Todos.filter((t) => {
      return t.id !== DialogTodo.id;
      
    });
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    ShowHideToast("Task deleted successfully");
    setDel(false);
  }

  const todojsx = TodosToBe.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showEidt={openEidtDialog}
      />
    );
  });

  function openEidtDialog(todo) {
    setDialogTodo(todo);
    setshowEidtDialog(true);
  }

  function handleEidtDialogClose() {
    setshowEidtDialog(false);
  }

  function handleEidtTodo() {
    const updatedTodos = Todos.map((t) => {
      if (t.id === DialogTodo.id) {
        return { ...t, title: DialogTodo.title, Details: DialogTodo.Details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    handleEidtDialogClose(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
     ShowHideToast("Task refreshed successfully");
  }



  return (
    <>
      <CssBaseline />
      <>
        <Dialog
          onClose={handleDeleteDialogClose}
          open={Del}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div
            style={{
              background: "#703",
              opacity: "1",
              boxShadow: "0px 2px 2px 10px #fff",
            }}
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete her task?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Deletion cannot be undone once completed.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteDialogClose}>Close</Button>
              <Button autoFocus onClick={handleDeleteTodo}>
                Agree
              </Button>
            </DialogActions>
          </div>
        </Dialog>

        <Dialog
          onClose={handleEidtDialogClose}
          open={EditDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div
            style={{
              background: "#000000b6",
              opacity: "0.8",
              boxShadow: "0px 2px 2px 10px #fff",
            }}
          >
            <DialogTitle id="alert-dialog-title">
              Are you sure you want to delete her task?
            </DialogTitle>
            <TextField
              autoFocus
              required
              value={DialogTodo.title}
              id="name"
              label="title Task"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setDialogTodo({ ...DialogTodo, title: e.target.value });
              }}
            />
            <TextField
              autoFocus
              required
              id="detlias task"
              label="Detlias"
              fullWidth
              variant="standard"
              value={DialogTodo.Details}
              onChange={(e) => {
                setDialogTodo({ ...DialogTodo, Details: e.target.value });
              }}
            />
            <DialogActions>
              <Button onClick={handleEidtDialogClose}>Close</Button>
              <Button autoFocus onClick={handleEidtTodo}>
                update
              </Button>
            </DialogActions>
          </div>
        </Dialog>

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
                  disabled={title.length === 0}
                >
                  select
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Container>
       
      </>
    </>
  );
}
