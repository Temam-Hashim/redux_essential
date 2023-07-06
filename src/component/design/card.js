import React from "react";
import { Box, Grid, Paper, Stack, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#ddd",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function MyCard() {
  return (
    <Box sx={{ flexGrow: 1, mt: 12, mr: "10px", ml: "10px" }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <FormRow bg={"cyan"} />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow bg={"#d76c"} />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow bg={"gold"} />
        </Grid>
      </Grid>
      {/* stack data */}
      <StackData />
      {/* paper */}
      <MyPaper />
    </Box>
  );
}

function FormRow({ bg }) {
  return (
    <React.Fragment>
      <Grid item xs={12} md={6} lg={4}>
        <Item sx={{ backgroundColor: bg }}>Item</Item>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Item sx={{ backgroundColor: bg }}>Item</Item>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Item sx={{ backgroundColor: bg }}>Item</Item>
      </Grid>
    </React.Fragment>
  );
}

function StackData() {
  const test = true;
  return (
    <Box sx={{ width: "100%", mt: 5 }}>
      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
      {/* loading Button */}
      <Stack direction="row" spacing={2}>
        {test ? (
          <LoadingButton loading variant="contained">
            Submit
          </LoadingButton>
        ) : (
          <Button loading variant="outlined">
            Submit
          </Button>
        )}
        <LoadingButton loading loadingIndicator="Loading…" variant="outlined">
          Fetch data
        </LoadingButton>
        <LoadingButton
          loading
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="outlined"
        >
          Save
        </LoadingButton>
      </Stack>
    </Box>
  );
}

function MyPaper() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128,
          backgroundColor: "#eee",
          justifyContent: "center",
        },
      }}
    >
      <Paper elevation={24} variant="outlined" />
      <Paper variant="outlined" />
      <Paper elevation={3} variant="outlined" />
    </Box>
  );
}

export default MyCard;
