import HeroSectionPage from "@/components/herosection/HeroSectionPage";
import Styles from "@/components/stylescomponent/Styles";
import AllArivalesComponents from "@/components/arrivalscomponent/AllArivalesComponents";
import Carousel from "@/components/customers/Carousel";


export default function Home() {
  return (
    <>
      <HeroSectionPage />
      <AllArivalesComponents />
      <Styles />
      <Carousel />
    </>
  );
}
