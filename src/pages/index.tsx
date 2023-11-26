import ProductSlider from "../components/molecules/home/productSlider";
import Target from "../components/molecules/home/target";
import About from "../components/molecules/home/about";
import QuiSommmes from "../components/molecules/home/QuiSommmes";
import Promo from "../components/molecules/home/Promo";


export default function Index() {
    return (
        <>
            <ProductSlider/>
            <QuiSommmes/>
            <Promo/>
            <Target/>
        </>
    );
}
