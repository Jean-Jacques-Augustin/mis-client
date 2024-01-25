import Rect, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import api, { baseURL } from "../../../api/apiService";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useGetProductByIdQuery } from "../../../store/apiSlice";

// Styles
const styles = {
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    borderRadius: "15px",
    overflow: "hidden",
  },
  img: {
    height: "200px",
  },
  counterButton: {
    width: "40px",
    height: "40px",
    minWidth: "40px",
    minHeight: "40px",
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    height: "100%",
    gap: "10px",
  },
};

interface CartInitProps extends React.PropsWithChildren<any> {
  productId: string;
  cartCount: number;
}

export default function CartInit({
  productId,
  children,
  cartCount,
}: CartInitProps) {
  const [count, setCount] = useState<number>(cartCount);
  const intl = useIntl();
  const locale = ["fr", "en", "mg"].includes(intl.locale)
    ? intl.locale
    : intl.defaultLocale;
  const { data, error, isLoading } = useGetProductByIdQuery(productId);
  const product = data?.data;
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
  const handleDecrement = () =>
    setCount((prevCount) => Math.max(prevCount - 1, 0));

  const HandleaddToCart = async () => {
    console.log("add to cart");
  };

  return (
    <Card
      sx={{
        mb: 2,
      }}
      variant="outlined"
    >
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="start"
          spacing={2}
        >
          <Grid item xs={12} md={4} lg={3}>
            <img
              src={`${baseURL}/${product?.image}`}
              alt={product?.name[locale]}
              style={styles.img}
            />
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                height: "100%",
                gap: "10px",
              }}
            >
              <Typography variant="body1" textAlign="start">
                <b>
                  <FormattedMessage id="product_name" /> :
                </b>{" "}
                {product?.name[locale]}
              </Typography>
              <Typography
                variant="body1"
                textAlign="start"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                <b>
                  <FormattedMessage id="product_description" /> :
                </b>{" "}
                {product?.description[locale]}
              </Typography>
              <Typography variant="body1" textAlign="start">
                <b>
                  <FormattedMessage id="product_price" /> :
                </b>{" "}
                {product?.price}
              </Typography>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item xs={12} md={4} lg={2}>
                  <ButtonGroup
                    variant="outlined"
                    color="inherit"
                    disableElevation
                    aria-label="outlined primary button group"
                  >
                    <Button
                      style={styles.counterButton}
                      onClick={handleDecrement}
                    >
                      <RemoveIcon />
                    </Button>
                    <Button style={styles.counterButton}>
                      <b>{count}</b>
                    </Button>
                    <Button
                      style={styles.counterButton}
                      onClick={handleIncrement}
                    >
                      <AddIcon />
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={12} md={4} lg={6}>
                  <Typography variant="body1" textAlign="start">
                    <b>
                      <FormattedMessage id="product_total" /> :
                    </b>{" "}
                    {product?.price * count} Ariary
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                  <Button
                    variant="contained"
                    disableElevation
                    color="primary"
                    size="large"
                    onClick={HandleaddToCart}
                    fullWidth
                    style={{
                      textTransform: "none",
                    }}
                  >
                    <FormattedMessage id="add_to_cart" />
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
