import ProductSlider from "../components/molecules/home/productSlider";
import Target from "../components/molecules/home/target";
import QuiSommmes from "../components/molecules/home/QuiSommmes";
import Promo from "../components/molecules/home/Promo";
import AdressInfo from "../components/molecules/home/AdressFooter";

export default function Index() {
    return (
        <>
            <ProductSlider />
            <QuiSommmes />
            <Promo />
            <Target />
            <AdressInfo />
        </>
    );
}
