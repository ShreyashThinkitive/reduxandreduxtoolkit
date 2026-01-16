import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, deleteAllItems } from "../redux/slice";

const CartList = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: any) => state.cart.items ?? []
  );

  // ✅ Calculate total price
  const totalPrice = cartItems.reduce(
    (sum: number, item: any) => sum + item.price,
    0
  );

  if (cartItems.length === 0) {
    return (
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        Your cart is empty 🛒
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, px: 2 }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom>
        Cart Items
      </Typography>

      {/* Cart Items */}
      <Stack spacing={2}>
        {cartItems.map((item: any) => (
          <Card key={item.id} sx={{ display: "flex", p: 2 }}>
            {/* Image */}
            <CardMedia
              component="img"
              image={item.images?.[0]}
              alt={item.title}
              sx={{
                width: 120,
                height: 120,
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
              }}
            />

            {/* Content */}
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography color="text.secondary">
                ₹{item.price}
              </Typography>

              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ mt: 1 }}
                onClick={() => dispatch(deleteItem(item.id))}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Total */}
      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">
          Total: ₹{totalPrice}
        </Typography>

        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(deleteAllItems())}
        >
          Clear Cart
        </Button>
      </Box>
    </Box>
  );
};

export default CartList;

