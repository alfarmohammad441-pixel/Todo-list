import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import MuiAlerts from "@mui/material/Alert";  
import Stack from "@mui/material/Stack";     

  export const MyAlert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlerts elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast({Open , message}) {


  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
       <Stack sx={{ width: '100%' }} spacing={2}>
      <Snackbar
        open={Open}
        autoHideDuration={6000}
        message="Note archived"
        action={action}
      >
        <Alert variant="outlined" severity="success">
         {message}
        </Alert>
      </Snackbar>
      </Stack>
    </div>
  );
}
