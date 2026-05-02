import http from "../../api/http";
import LoadingScreen from "../../components/common/LoadingScreen";
import SEO from "../../components/common/SEO";
import DiscoverySection from "../../components/sections/DiscoverySection";
import ExpertiseSection from "../../components/sections/ExpertiseSection";
import FeatureBandSection from "../../components/sections/FeatureBandSection";
import HeroSection from "../../components/sections/HeroSection";
import ImpactSection from "../../components/sections/ImpactSection";
import IndustrySolutionsSection from "../../components/sections/IndustrySolutionsSection";
import PromoSection from "../../components/sections/PromoSection";
import ResourcesSection from "../../components/sections/ResourcesSection";
import RoadmapSection from "../../components/sections/RoadmapSection";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";

const HomePage = () => {
  const { settings, loading: settingsLoading } = useSite();
  const { data, loading } = useAsyncData(async () => {
    const [servicesResponse, caseStudiesResponse, blogsResponse] = await Promise.all([
      http.get("/services"),
      http.get("/case-studies?featured=true"),
      http.get("/blogs"),
    ]);

    return {
      services: servicesResponse.data.data,
      caseStudies: caseStudiesResponse.data.data,
      blogs: blogsResponse.data.data,
    };
  }, []);

  if (settingsLoading || loading) {
    return <LoadingScreen fullScreen label="Loading homepage..." variant="cards" />;
  }

  return (
    <>
      <SEO
        title={`${settings?.companyName} | IT Training, Digital Marketing, IT Staffing & Product Development`}
        description={
          settings?.hero?.subtext ||
          `${settings?.companyName} helps teams launch IT training and placement programs, digital marketing engines, IT staffing solutions, and product development programs.`
        }
      />
      <HeroSection />
      <FeatureBandSection featureImage={data?.caseStudies?.[0]?.coverImage} />
      <IndustrySolutionsSection industries={settings?.industries || []} services={data?.services || []} />
      <ImpactSection expertiseCards={settings?.expertiseCards || []} />
      <PromoSection />
      <ExpertiseSection services={data?.services || []} featureImage={data?.caseStudies?.[0]?.coverImage} />
      <RoadmapSection />
      <ResourcesSection blogs={data?.blogs || []} />
      <DiscoverySection />
    </>
  );
};

export default HomePage;
