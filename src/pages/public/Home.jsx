// import PublicLayout from "../../layouts/PublicLayout";
// import ServiceCategory from "../../components/home/ServiceCategory";
// import WhyChooseUs from "../../components/home/WhyChooseUs";
// import RecentAds from "../../components/home/RecentAds";
// import RecentActivity from "../../components/home/RecentActivity";
// import Pricing from "../../components/home/Pricing";
// import RecentBlogs from "../../components/home/RecentBlogs";
// import FactsCounter from "../../components/home/FactsCounter";
// import PopularServices from "../../components/home/PopularServices";
// import Banner from "../../components/home/Banner";

// const Home = () => {
//   return (
//     <PublicLayout>
//       <div className="space-y-16">
//         <Banner />
//         <ServiceCategory />
//         <WhyChooseUs />
//         <Pricing />
//         <RecentAds />
//         <RecentActivity />
//         <RecentBlogs />
//         <FactsCounter />
//         <PopularServices />
//       </div>
//     </PublicLayout>
//   );
// };

// export default Home;


import PublicLayout from "../../layouts/PublicLayout";
import ServiceCategory from "../../components/home/ServiceCategory";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import RecentAds from "../../components/home/RecentAds";
import FactsCounter from "../../components/home/FactsCounter";
import PopularServices from "../../components/home/PopularServices";
import Banner from "../../components/home/Banner";

const Home = () => {
  return (
    <PublicLayout>
      <div className="space-y-16">
        <Banner />
        <ServiceCategory />
        <WhyChooseUs />
        <RecentAds />
        <FactsCounter />
        <PopularServices />
      </div>
    </PublicLayout>
  );
};

export default Home;