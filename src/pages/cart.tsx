import { Button, Container, Typography } from "@mui/material";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import CartInit from "../components/molecules/cart/cartInit";

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "20px auto 0",
        }}
      >
        <Typography variant="h4" align="left">
          Votre panier
        </Typography>
        <Button variant="contained" color="primary">
          Commander
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "20px auto",
        }}
      >
        {cart.map((item) => (
          <CartInit
            key={item.id}
            productId={item.id}
            cartCount={item.quantity}
          />
        ))}
      </div>
    </Container>
  );
}
