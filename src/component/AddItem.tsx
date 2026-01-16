import { IconButton, Badge, Tooltip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllItems } from "../redux/slice";
import { Link } from "react-router-dom";

const CartHeaderActions = () => {
  const dispatch = useDispatch();
  const cartItemCount = useSelector(
    (state:any) => state.cart.items.length
  );
  console.log(cartItemCount);
  

  return (
    <>
    <Link to="/cart">
      {/* Cart Icon */}
      <IconButton color="inherit">
        <Badge badgeContent={cartItemCount} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      </Link>

      {/* Clear Cart Icon */}
      <Tooltip title="Clear Cart">
        <IconButton
          color="inherit"
          disabled={cartItemCount === 0}
          onClick={() => dispatch(deleteAllItems())}
        >
          <DeleteSweepIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default CartHeaderActions;
