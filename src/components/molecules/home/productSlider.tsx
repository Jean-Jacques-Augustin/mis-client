import React, {useState} from "react";
import {makeStyles} from "@mui/styles";
import {useGetAllProductQuery} from "../../../store/apiSlice";
import {useIntl} from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {baseURL} from "../../../api/apiService";
import {Button, Container, Typography} from "@mui/material";

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
		slidesToShow: 1,
		dots: false,
		autoplay: false,
		arrows: true,
		autoplaySpeed: 4000,
		centerMode: true,
		centerPadding: "240px",
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					centerPadding: "130px"
				}
			},
			{
				breakpoint: 1200,
				settings: {
					centerPadding: "40px"
				}
			},
			{
				breakpoint: 768,
				settings: {
					centerPadding: "12px",
					autoplay: false
				}
			},
			{
				breakpoint: 375,
				settings: {
					centerMode: false,
					autoplay: false
				}
			}
		]
	};


	return (
		<Slider {...settings} className={''}>
			{products?.data.map((product: any) => (
				<div>
					<div
						key={product._id}
						style={{
							backgroundImage: `url(${baseURL}/${product.image})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundColor: "rgba(0, 0, 0, 0.7)",
							height: "50vh",
							width: "100%",
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
									// limiter en 3 lignes
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
	);
};

export default ProductSlider;
