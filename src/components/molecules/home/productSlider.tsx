import React, {useState} from "react";
import {makeStyles} from "@mui/styles";
import {useGetAllProductQuery} from "../../../store/apiSlice";
import {useIntl} from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {baseURL} from "../../../api/apiService";
import {Button, Container, Typography} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const useStyles = makeStyles(() => ({}));


const ProductSlider: React.FC = () => {
	const classes = useStyles();
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const {data: products, isLoading, error} = useGetAllProductQuery();
	const intl = useIntl();

	console.log("products", products);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return (
			<div>
				Error: {"message" in error ? error.message : "Erreur"}
			</div>
		);
	}

	let settings = {
		autoplay: true,
		arrows: true,
		// class for arrows
		prevArrow: <ArrowBackIosIcon
			fontSize={"large"}
			sx={{
				fontSize: "3rem",
				position: "absolute",
				top: "50%",
				left: "0",
				transform: "translateY(-50%)",
				zIndex: 1,
				borderRadius: "50%",
				padding: "0.5rem",
				color: "white",
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
				right: "0",
				transform: "translateY(-50%)",
				zIndex: 1,
				borderRadius: "50%",
				padding: "0.5rem",
				color: "white",
				"&:hover": {
					color: "blue",
				},
			}}
		/>,
	};


	return (
		<div>
			<Slider {...settings} className={''}>
				{products?.data.map((product: any) => (
					<div key={product._id}>
						<div
							style={{
								backgroundImage: `url(${baseURL}/${product.image})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
								backgroundColor: "rgba(0, 0, 0, 0.7)",
								height: "50vh",
								flexDirection: "column",
								justifyContent: "end",
								alignItems: "end",
								display: "flex",
								// optimise image loading
								filter: "blur(0px)",
							}}
						>
							<Container>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "end",
										alignItems: "end",
										gap: "1rem",
										marginBottom: "2rem",
									}}
								>
									<Typography variant={"h4"} color={"white"} fontWeight={'700'}>
										{product.name?.fr}
									</Typography>
									<Typography variant={"h6"} color={"white"}
												align={"right"}
												sx={{
													display: "-webkit-box",
													WebkitLineClamp: 3,
													WebkitBoxOrient: "vertical",
													overflow: "hidden",
													textOverflow: "ellipsis",
													"&::after": {
														content: '"..."',
													},
												}}

									>
										{product.description?.fr}
									</Typography>
									<Button variant="contained" color="secondary">
										Voir plus
									</Button>
								</div>
							</Container>
						</div>
					</div>

				))}
			</Slider>
		</div>
	);
};

export default ProductSlider;
