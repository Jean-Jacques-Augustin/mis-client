import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useGetAllProductQuery } from "../../../store/apiSlice";
import { useIntl } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { baseURL } from "../../../api/apiService";
import { Button, Container, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const useStyles = makeStyles((theme) => ({
  slide: {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    height: "70vh",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    display: "flex",
    filter: "blur(0px)",
    borderRadius: "1rem",
    marginTop: "2rem",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: "1rem",
    marginBottom: "2rem",
    // style de l'image
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    // style du container
    height: "100%",
    width: "100%",
    padding: "2rem",
    borderRadius: "1rem",
  },
  description: {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "&::after": {
      content: '"..."',
    },
  },
  button: {
    marginTop: "1rem",
    borderRadius: "1rem",
    padding: "0.5rem 1rem",
    textTransform: "none",
  },
  arrowIcon: {
    fontSize: "3rem",
    position: "absolute",
    top: "50%",
    borderRadius: "50%",
    padding: "0.5rem",
    color: "white",
  },
}));

const ProductSlider: React.FC = () => {
  const classes = useStyles();
  const { data: products, isLoading, error } = useGetAllProductQuery();
  const intl = useIntl();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {"message" in error ? error.message : "Erreur"}</div>;
  }

  const settings = {
    autoplay: true,
    arrows: true,
    prevArrow: (
      <ArrowBackIosIcon
        fontSize='large'
        className={classes.arrowIcon}
        style={{ left: 0, transform: "translateY(-50%)" }}
      />
    ),
    nextArrow: (
      <ArrowForwardIosIcon
        fontSize='large'
        className={classes.arrowIcon}
        style={{ right: 0, transform: "translateY(-50%)" }}
      />
    ),
  };

  return (
    <Container>
      <Slider {...settings} className=''>
        {products?.data.map((product: any) => (
          <div key={product._id} className={classes.slide}>
            <div
              className={classes.content}
              style={{
                backgroundImage: "url(" + baseURL + "/" + product.image + ")",
              }}
            >
              <Typography variant='h5' color='white' fontWeight='700'>
                {product.name?.fr}
              </Typography>
              <Typography
                variant='body1'
                color='white'
                align='right'
                className={classes.description}
              >
                {product.description?.fr}
              </Typography>
              <Button
                variant='outlined'
                color='primary'
                sx={{
                  textTransform: "none",
                }}
              >
                Voir plus
              </Button>
            </div>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default ProductSlider;
