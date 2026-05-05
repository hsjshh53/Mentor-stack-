import React from 'react';
import { Navbar } from '../components/landing/Navbar';
import { Hero } from '../components/landing/Hero';
import { TrustSlider } from '../components/landing/TrustSlider';
import { BentoFeatures } from '../components/landing/BentoFeatures';
import { MentorDemo } from '../components/landing/MentorDemo';
/* import { CurriculumRoadmap } from '../components/landing/CurriculumRoadmap'; */ // Replaced by LearningJourneyScroll
import { LearningJourneyScroll } from '../components/landing/LearningJourneyScroll';
import { HowItWorks } from '../components/landing/HowItWorks';
import { LiveDemo } from '../components/landing/LiveDemo';
import { Testimonials } from '../components/landing/Testimonials';
import { Pricing } from '../components/landing/Pricing';
import { FinalCTA } from '../components/landing/FinalCTA';
import { Footer } from '../components/landing/Footer';
import { CursorGlow } from '../components/landing/CursorGlow';
import { ParallaxSystem } from '../components/motion/ParallaxSystem';
import { ScrollSection } from '../components/motion/ScrollSections';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { AnimatedText } from '../components/ui/AnimatedText';

export const LandingPage: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ParallaxSystem>
      <div className="relative min-h-screen text-white selection:bg-emerald-500/30 overflow-x-hidden font-sans">
        <CursorGlow />
        
        {/* CINEMATIC SCROLL PROGRESS */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-emerald-500 via-indigo-600 to-emerald-500 z-[1000] origin-left shadow-[0_0_20px_rgba(16,185,129,0.8)]"
          style={{ scaleX }}
        />

        <Navbar />
        
        <main>
          {/* Section 1: Hero (AI + Laptop 3D) */}
          <Hero />
          
          {/* Section 2: Problem (Learning is broken) */}
          <ScrollSection id="problem" className="bg-[#050506]">
            <TrustSlider />
            <div className="max-w-4xl mx-auto text-center mt-32 px-6">
               <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter text-white mb-10">
                 The Current <span className="text-emerald-500 italic">Loop</span> is Broken.
               </h2>
               <p className="text-xl md:text-2xl text-white/40 font-medium leading-relaxed">
                 Watching videos is not learning. Coding in a vacuum is not growing. 
                 Static courses fail because they don't adapt to <span className="text-white italic">you</span>.
               </p>
            </div>
          </ScrollSection>

          {/* Section 3: Solution (OLYNQ Stack AI Engine) */}
          <ScrollSection id="features">
             <BentoFeatures />
          </ScrollSection>

          <ScrollSection>
             <HowItWorks />
          </ScrollSection>

          {/* Section 4: AI Engine Interface */}
          <ScrollSection id="ai-tutor">
             <MentorDemo />
          </ScrollSection>

          <ScrollSection>
             <LiveDemo />
          </ScrollSection>

          {/* Section 5: Learning Journey (Cinematic Timeline) */}
          <ScrollSection id="journey">
            <div className="max-w-7xl mx-auto px-6 mb-32">
               <h2 className="text-6xl md:text-[8rem] font-display font-black tracking-tighter uppercase leading-[0.8] text-white">
                 Your <span className="text-emerald-500 italic">Evolution</span> <br/> Logic
               </h2>
            </div>
            <LearningJourneyScroll />
          </ScrollSection>

          {/* Section 6: Testimonials */}
          <ScrollSection>
             <Testimonials />
          </ScrollSection>

          {/* Section 7: Pricing */}
          <ScrollSection id="pricing">
            <Pricing />
          </ScrollSection>

          {/* Honest Growth Stats */}
          <ScrollSection className="bg-[#070708]/50 border-y border-white/5">
             <div className="max-w-7xl mx-auto space-y-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 text-center">
                  {[
                    { label: "Active Early Learners", value: "100+" },
                    { label: "Structured Learning Paths", value: "8+" },
                    { label: "Community Tech Projects", value: "50+" },
                    { label: "Personalized AI Modules", value: "Active" }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-4 group">
                       <h5 className="text-6xl md:text-8xl font-display font-black tracking-tighter text-white/90 group-hover:text-emerald-500 transition-colors duration-700 uppercase">{stat.value}</h5>
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 leading-relaxed max-w-[200px] mx-auto">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-20 border-t border-white/5 text-center px-6">
                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/10 max-w-3xl mx-auto leading-loose italic">
                    * OLYNQ Stack focuses on deep engineering mastery. Our early growth stage allows us to maintain extreme focus on each learner's progress.
                  </p>
                </div>
             </div>
          </ScrollSection>

          <FinalCTA />
          <Footer />
        </main>
      </div>
    </ParallaxSystem>
  );
};
