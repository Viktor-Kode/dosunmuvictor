// app/page.tsx

import AboutSection from './component/About';
import ContactSection from './component/ContactSection';
import HeroSection from './component/Hero';
import ProjectsSection from './component/project';


export default function Home() {
  return (

      
      <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection/>
      <ContactSection/>
      </>
  
  );
}