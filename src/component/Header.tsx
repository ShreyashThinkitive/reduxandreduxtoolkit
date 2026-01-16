import { AppBar, Toolbar, Typography, Link as MuiLink  } from "@mui/material";
import AddItem from "./AddItem";
import { Link as RouterLink } from "react-router-dom";


const CartHeader = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
  <MuiLink
    component={RouterLink}
    to="/"
    underline="none"
    color="inherit"
    sx={{ fontWeight: 600 }}
  >
    My Store
  </MuiLink>
</Typography>
        <AddItem />
      </Toolbar>
    </AppBar>
  );
};

export default CartHeader;
