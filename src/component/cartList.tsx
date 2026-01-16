import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, deleteAllItems } from "../redux/slice";
import { useState } from "react";

const CartList = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: any) => state.cart.items ?? []
  );

  // 🔹 Quantity state (keyed by item id)
  const [quantities, setQuantities] = useState<Record<number, number>>(
    () =>
      cartItems.reduce((acc: any, item: any) => {
        acc[item.id] = 1;
        return acc;
      }, {})
  );

  // 🔹 Handle quantity change
  const handleQtyChange = (id: number, value: number) => {
    if (value < 1) return;
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 🔹 Calculate total price
  const totalPrice = cartItems.reduce(
    (sum: number, item: any) =>
      sum + item.price * (quantities[item.id] || 1),
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
        {cartItems.map((item: any) => {
          const qty = quantities[item.id] || 1;
          const itemTotal = item.price * qty;

          return (
            <Card
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                p: 2,
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 1,
                  mb: { xs: 1, sm: 0 },
                }}
              >
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              {/* Content */}
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{item.title}</Typography>

                <Typography color="text.secondary">
                  Price: ₹{item.price}
                </Typography>

                {/* Quantity Input */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mt: 1,
                  }}
                >
                  <TextField
                    label="Qty"
                    type="number"
                    size="small"
                    value={qty}
                    inputProps={{ min: 1 }}
                    onChange={(e) =>
                      handleQtyChange(
                        item.id,
                        Number(e.target.value)
                      )
                    }
                    sx={{ width: 80 }}
                  />

                  <Typography fontWeight={600}>
                    Item Total: ₹{itemTotal}
                  </Typography>
                </Box>

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
          );
        })}
      </Stack>

      {/* Total */}
      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
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
