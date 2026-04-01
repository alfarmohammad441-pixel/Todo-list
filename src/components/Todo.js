import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext} from "react";
import { TodoContext } from "../contexts/TodoContext";
import { ToastContext } from "../contexts/ToastContext";
function Todo({ todo, showDelete, showEidt}) {
  const { Todos, setTodos } = useContext(TodoContext);
  const {ShowHideToast} = useContext(ToastContext);
  function handleCheckClick() {
    const updateTodos = Todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updateTodos);
    localStorage.setItem("todos", JSON.stringify(updateTodos));
    ShowHideToast("Task updated successfully")
  }
  function handleDeleteClick() {
    showDelete(todo);
  }

  function handleEidtClick() {
    showEidt(todo);
  }

  return (
    <>
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
