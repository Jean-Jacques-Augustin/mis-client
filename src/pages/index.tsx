import ProductSlider from "../components/molecules/home/productSlider";
import PromotionTab from "../components/molecules/home/promo";
import Target from "../components/molecules/home/target";
import About from "../components/molecules/home/about";


export default function Index() {
    return (
        <>
            <ProductSlider/>
            <PromotionTab/>
            <Target/>
            <About/>
        </>
    );
}
