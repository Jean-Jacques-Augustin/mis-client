import * as React from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useIntl} from "react-intl";
import {ProductState} from "../../../interfaces/ProductInterface";
import {baseURL} from "../../../api/apiService";

const StyledCard = styled(Card)`
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 200px;
`;

const CardContentWrapper = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProductName = styled(Typography)`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const ProductDescription = styled(Typography)`
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: 400;
  text-align: justify;
  font-size: 0.8rem;
`;

const ProductPrice = styled(Typography)`
  font-size: 1rem;
  font-weight: 600;
`;

const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  gap: 10px;
`;


const ProductCard: React.FC<ProductState> = ({product, onSlide}) => {
	const intl = useIntl();
	const lang = intl.locale;

	return (

		<StyledCard
			style={{
				margin: onSlide ? "10px" : "auto",
			}}
		>
			<StyledCardMedia
				image={`${baseURL}/${product.image}`}
			/>
			<CardContentWrapper>
				<ProductName gutterBottom variant="h5">
					{product.name[lang]}
				</ProductName>
				<ProductDescription variant="body2" color="text.secondary"


				>
					{product.description[lang]}
				</ProductDescription>
				<ProductPrice variant="body2" color="text.secondary">
					Price: ${product.price}
				</ProductPrice>
			</CardContentWrapper>
			<StyledCardActions>
				<Button size="medium"
						disableElevation
						fullWidth
						style={{
							textTransform: "none",
						}}
						variant={"contained"}
				>Learn More</Button>
			</StyledCardActions>
		</StyledCard>

	);
};

export default ProductCard;
