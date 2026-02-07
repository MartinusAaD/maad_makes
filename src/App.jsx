import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import NavbarAdmin from "./components/NavbarAdmin/NavbarAdmin";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useAuth } from "./context/AuthContext";
import { trackPageView } from "./utils/analytics";

function App() {
  const { currentUser, isAdmin } = useAuth();
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    const pageName =
      location.pathname === "/" ? "Home" : location.pathname.replace("/", "");
    trackPageView(pageName);
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <header>
        <Navbar />
        {currentUser && isAdmin && <NavbarAdmin />}
      </header>
      <main className="min-h-screen">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
