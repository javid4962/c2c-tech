import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const PublicLayout = () => (
  <div className="relative min-h-screen">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PublicLayout;

