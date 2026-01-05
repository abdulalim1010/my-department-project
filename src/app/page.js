import EEEcoursesSection from "./admin/dashboard/components/EEEcoursesSection";
import Banner from "./components/Banner";
import UpcomingEvents from "./components/UpcomingEvents";
import NewsPage from "./news/page";



export default function Home() {
  return (
    <div>
      <Banner />
      <UpcomingEvents />
      <EEEcoursesSection/>
      <NewsPage/>
    </div>
  );
}
