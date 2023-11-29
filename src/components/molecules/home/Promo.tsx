import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {useGetAllProductQuery} from "../../../store/apiSlice";
import {useIntl} from "react-intl";
import React from "react";
import ProductCard from "../../atoms/product/ProductCard";
import {Product} from "../../../interfaces/ProductInterface";
import {Container, Typography} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Promo() {
	const {data: products, isLoading, error} = useGetAllProductQuery();
	const intl = useIntl();

	console.log("products", products);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	// change type of products.data to Product[]
	const data = products?.data as Product[];

	if (error) {
		return (
			<div>
				Error: {"message" in error ? error.message : "Erreur"}
			</div>
		);
	}
	let settings = {
		infinite: false,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 3,
		centeredMode: true,
		prevArrow: <ArrowBackIosIcon
			fontSize={"large"}
			sx={{
				fontSize: "3rem",
				position: "absolute",
				top: "50%",
				left: "-2rem",
				transform: "translateY(-50%)",
				zIndex: 1,
				borderRadius: "50%",
				padding: "0.5rem",
				color: "inherit",
				// add hover effect
				"&:hover": {
					color: "blue",
				},
			}}
		/>,
		nextArrow: <ArrowForwardIosIcon
			fontSize={"large"}
			sx={{
				fontSize: "3rem",
				position: "absolute",
				top: "50%",
				right: "-2rem",
				transform: "translateY(-50%)",
				zIndex: 1,
				borderRadius: "50%",
				padding: "0.5rem",
				color: "inherit",
				"&:hover": {
					color: "blue",
				},
			}}
		/>,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: false,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
	};

	return (
		<div
			style={{
				padding: "50px 0",
				backgroundColor: "#f5f5f5",
			}}
		>
			<Container>
				<Typography variant={'h2'} className={'text-center text-6xl'}>
					Promo
				</Typography>
				<Typography variant={'h5'} className={'text-center text-6xl'}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet animi assumenda beatae
					distinctio, doloribus eos expedita nobis non nulla odio odit praesentium quibusdam quod ratione
					similique vel, velit!
				</Typography>

				<Slider {...settings}>
					{data?.map((products: any) => (
						<ProductCard
							key={products._id}
							onSlide
							product={products}
						/>
					))}
				</Slider>
			</Container>
		</div>
	)
}