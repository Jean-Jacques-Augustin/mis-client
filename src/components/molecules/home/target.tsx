import {Box, Typography, Button, Grid, Container} from "@mui/material";
import LandingBox, {LandingBoxProps} from "../../atoms/LandingBox";
import cart from "../../../img/cart.svg";
import delivery from "../../../img/delivery.svg";
import payment from "../../../img/pay.svg";


const LivraisonProcess: LandingBoxProps [] = [
	{
		title: "Choisissez vos produits",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolores harum id magnam minima modi natus quae sapiente suscipit tenetur?",
		icone: <img
			src={cart}
			alt="choisissez vos produits"
			style={{
				width: 70,
				height: 70,
			}}
		/>
	},
	{
		title: "Payez en ligne",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolores harum id magnam minima modi natus quae sapiente suscipit tenetur?",
		icone: <img
			src={payment}
			alt="choisissez vos produits"
			style={{
				width: 70,
				height: 70,
			}}
		/>
	},
	{
		title: "Recevez votre commande",
		description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias dolores harum id magnam minima modi natus quae sapiente suscipit tenetur?",
		icone: <img
			src={delivery}
			alt="choisissez vos produits"
			style={{
				width: 70,
				height: 70,
			}}
		/>
	},
];

const Target = () => {
	return (
		<Box
			minHeight="50vh"
			padding={6}
		>
			<Container
				maxWidth="lg"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: 4,
				}}
			>
				<Typography variant="h4" gutterBottom>
					Comment ça marche notre boutique en ligne ?
				</Typography>
				<Typography variant="body1" gutterBottom>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur dolores exercitationem
					expedita illo ipsa laborum minima placeat sint tempore voluptate. Aspernatur consectetur dolor
					ducimus, et itaque porro voluptate. Debitis, provident.
				</Typography>
				<Grid container
					  direction="row"
					  justifyContent="space-between"
					  alignItems="center"
					  spacing={2}
				>
					{LivraisonProcess.map((item, index) => (
						<Grid item key={index}
							  xs={12} sm={6} md={4} lg={4} xl={4}
						>
							<LandingBox {...item}/>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
};

export default Target;