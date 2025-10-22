
import AllArivalesComponents from "@/components/arrivalscomponent/AllArivalesComponents";
import Carousel from "@/components/customers/Carousel";
import HeroSectionPage from "@/components/herosection/HeroSectionPage";
import Styles from "@/components/stylescomponent/Styles";


const BrandsPage = () => {
    return (
        <div>
            <HeroSectionPage />
            <AllArivalesComponents />
            <Styles />
            <Carousel />
        </div>
    )
}

export default BrandsPage;
