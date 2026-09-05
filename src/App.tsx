import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import SmoothScrollWrapper, { scrollToTop } from "./components/ui/SmoothScrollWrapper";
import CustomCursor from "./components/ui/CustomCursor";
import NoiseOverlay from "./components/ui/NoiseOverlay";
import Nav from "./components/layout/Nav";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import PatientHub from "./pages/PatientHub";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { pageVariants } from "./lib/motion";

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop();
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patient-hub" element={<PatientHub />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <SmoothScrollWrapper>
          <ScrollManager />
          <Nav />
          <AnimatedRoutes />
        </SmoothScrollWrapper>
        <NoiseOverlay />
        <CustomCursor />
      </HashRouter>
    </MotionConfig>
  );
}
