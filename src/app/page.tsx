import Banner from "@/components/Banner";
import DonationBanner from "@/components/DonationBanner";
import NewestPets from "@/components/NewestPets";
import PetCareSection from "@/components/PetCareSection";
import StatsSection from "@/components/StatsSection";




export default function Home() {
  return (
    <div>
    <Banner />
  <NewestPets />
  <StatsSection/>
  <PetCareSection/>
  <DonationBanner/>
    </div>
  );
}
