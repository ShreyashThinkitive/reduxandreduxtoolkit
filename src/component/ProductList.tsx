import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Stack,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../redux/slice";
import { useEffect } from "react";
import { fetchProducts } from "../redux/productslice";

const ProductList = () => {
  const dispatch = useDispatch();

  const { items, status } = useSelector((state: any) => state.products);
  const cartItems = useSelector((state: any) => state.cart.items ?? []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Loading products...
      </Typography>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
   

      <Box
        sx={{
          display: "grid",
          marginTop:"100px",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {items.map((product: any) => {
          const isInCart = cartItems.some(
            (item: any) => item.id === product.id
          );

          return (
            <Card
              key={product.id}
              sx={{
                display: "flex",
                flexDirection: "column", // 🔥 ALWAYS COLUMN
                height: "100%",
              }}
            >
              {/* IMAGE */}
              <Box
                sx={{
                  width: "100%",
                  height: 220,
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  loading="eager"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/300";
                  }}
                />
              </Box>

              {/* CONTENT */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {product.category}
                </Typography>

                <Typography variant="h6" sx={{ my: 1 }}>
                  ₹{product.price}
                </Typography>

                <Stack spacing={1} mt="auto">
                  {isInCart ? (
                    <Button variant="contained" disabled>
                      Added
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => dispatch(addItem(product))}
                    >
                      Add
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    color="error"
                    disabled={!isInCart}
                    onClick={() => dispatch(deleteItem(product.id))}
                  >
                    Remove
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Container>
  );
};

export default ProductList;
