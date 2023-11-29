import ProductSlider from "../components/molecules/home/productSlider";
import Target from "../components/molecules/home/target";
import About from "../components/molecules/home/about";
import QuiSommmes from "../components/molecules/home/QuiSommmes";
import Promo from "../components/molecules/home/Promo";
import Toolbar from "@mui/material/Toolbar";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


export default function Index() {
	return (
		<>
			<ProductSlider/>
			<QuiSommmes/>
			<Promo/>
			<Toolbar/>

			<div
				style={{
					/*color: var(--secondary-blue, #009EC2);
					font-family: Inter;
					font-size: 50px;
					font-style: normal;
					font-weight: 700;
					line-height: 60px;*/

				}}
			>
				<AddIcon
					style={{
						color : "#009EC2",
					}}
				/>
				<RemoveIcon/>
			</div>

			<Toolbar/>
			<Target/>
		</>
	);
}
