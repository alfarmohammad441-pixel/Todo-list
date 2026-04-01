import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import TextField2 from "@mui/material/TextField";

function Todo({ todo }) {
  const [Del, setDel] = useState(false);
  const [Eid, setshowEid] = useState(false);
  const [EidtTodo, setEidtTodo] = useState({ title: "", Details: "" });
  const { Todos, setTodos } = useContext(TodoContext);
  function handleCheckClick() {
    const updateTodos = Todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  }
  function handleDeleteClick() {
    setDel(true);
  }

  function handleDeleteDialogClose() {
    setDel(false);
  }

  function handleEidtClick() {
    setshowEid(true);
  }

  function handleEidtDialogClose() {
    setshowEid(false);
  }

  function handleDeleteTodo() {
    const updateTodos = Todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
  }

  function handleEidtTodo() {
    const updatedTodos = Todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: EidtTodo.title, Details: EidtTodo.Details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    handleEidtDialogClose(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  return (
    <>
      <Dialog
        onClose={handleDeleteDialogClose}
        open={Del}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ background: "#703", boxShadow: "0px 2px 2px 10px #fff" }}>
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
        open={Eid}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ background: "#777", boxShadow: "0px 2px 2px 10px #fff" }}>
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete her task?
          </DialogTitle>
          <TextField
            autoFocus
            required
            id="name"
            label="title Task"
            fullWidth
            variant="standard"
            value={EidtTodo.title}
            onChange={(e) => {
              setEidtTodo({ ...EidtTodo, title: e.target.value });
            }}
          />
          <TextField2
            autoFocus
            required
            id="detlias task"
            label="Detlias"
            fullWidth
            variant="standard"
            value={EidtTodo.Details}
            onChange={(e) => {
              setEidtTodo({ ...EidtTodo, Details: e.target.value });
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

      <Card
        className="todoCard"
        sx={{
          winWidth: "275",
          background: "#666",
          margin: 3,
        }}
      >
        <CardContent>
          <Grid container spacing={1}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>

              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.Details}
              </Typography>
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="IconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? " white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                className="IconButton"
                style={{
                  color: "blue",
                  background: "white",
                  border: "solid blue 3px",
                }}
                onClick={handleEidtClick}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                className="IconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
        <Grid container spacing={1}>
          <Grid size={8} style={{ background: "red" }}></Grid>
          <Grid size={4} style={{ background: "blue" }}></Grid>
        </Grid>
      </Card>
    </>
  );
}

export default Todo;
