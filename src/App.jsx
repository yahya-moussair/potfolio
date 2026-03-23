import NoiseOverlay from "@/components/NoiseOverlay";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import WaveDivider from "@/components/WaveDivider";
import LazySection from "@/components/LazySection";
import BackToTop from "@/components/BackToTop";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
// import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <>
        <NoiseOverlay />
        <ScrollProgress />
        <CursorGlow />
        <Navbar />
        <main>
          <HeroSection />
          <WaveDivider fillColor="var(--color-bg)" />
          <LazySection minHeight="80vh">
            <AboutSection />
          </LazySection>
          <WaveDivider fillColor="var(--color-surface)" />
          <LazySection minHeight="80vh">
            <SkillsSection />
          </LazySection>
          <WaveDivider flip fillColor="var(--color-surface)" />
          <LazySection minHeight="80vh">
            <ProjectsSection />
          </LazySection>
          <WaveDivider fillColor="var(--color-surface)" />
          <LazySection minHeight="80vh">
            <ExperienceSection />
          </LazySection>
          {/* <WaveDivider flip fillColor="var(--color-surface)" /> */}
          {/* <LazySection minHeight="60vh">
            <TestimonialsSection />
          </LazySection> */}
          <WaveDivider fillColor="var(--color-bg)" />
          <LazySection minHeight="70vh">
            <ContactSection />
          </LazySection>
        </main>
        {/* <Footer /> */}
        <BackToTop />
      </>
    </ThemeProvider>
  );
}
