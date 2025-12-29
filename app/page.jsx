import Hero from './components/Hero';
import Countdown from './components/Countdown';
import Section from './components/Section';
import RobotGifter from './components/RobotGifter';
import Fireworks from './components/Fireworks';
import Confetti from './components/Confetti';
import StarsBackground from './components/StarsBackground';
import HangingLights from './components/HangingLights';

export default function Home() {
  return (
    <>
      <StarsBackground />
      <Fireworks />
      <Hero />
      {/* <RobotGifter /> */}
      {/* <Section
        variant="fresh"
        title="✨ Fresh Start"
        text="Beautiful animations that feel premium."
      />
      <Section
        variant="goals"
        title="🚀 Big Goals"
        text="Smooth scrolling powered by Lenis."
      /> */}
      {/* <Section
        variant="success"
        title="🎯 Success"
        text="GSAP animations done right."
      /> */}

      {/* Overlay elements - render last so they appear above content */}
      <Confetti />
      <HangingLights />
    </>
  );
}
