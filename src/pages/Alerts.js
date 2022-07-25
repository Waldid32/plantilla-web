import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export function Alerts({ message }) {
  return (
    <Stack sx={{ width: "100%" }} spacing={1}>
      <Alert severity="error">{message}</Alert>
    </Stack>
  );
}
