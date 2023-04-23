import React, { useLayoutEffect, useEffect, useRef } from 'react';
import gsap from 'gsap-trial';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);


function HeroSection() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const smoother = useRef();
  const main = useRef();

 


  useEffect(() => {

    const targets = heroRef.current.querySelectorAll('.container-hero div');

    targets.forEach((target) => {
      const tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: target,
          markers: true,
          scrub: true,
          start: 'center 50%',
          end: 'bottom top',
          pin: true,
          
        },
      })
        .fromTo(target, { y: 25 }, { y: -25 })
        .from(target, { opacity: 0, duration: 0.2 }, 0)
        .to(target, { opacity: 0, duration: 0.2 }, 0.8);
    });

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
  
    
    

    canvas.width = 1000;
    canvas.height = 720;

    const frameCount = 100;
    const currentFrame = (index) =>
      `https://picsforthesite.blob.core.windows.net/picture/_${index
        .toString()
        .padStart(3, '0')}.jpg`;

    const images = [];
    const airpods = {
      frame: 0,
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = render;
      img.src = currentFrame(i);
      images.push(img);
    }

    gsap.to(airpods, {
      frame: frameCount - 1,
      snap: 'frame',
      scrollTrigger: {
        scrub: 0.5,
      },
      onUpdate: render,
    });

    function render() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[airpods.frame], 0, 0);
    }

    const tl = gsap.timeline({
      
      scrollTrigger: {
        scrub: true,
      },
      
    });

    tl.from('#hero-lightpass', {
      scale: 1.2,
      duration: 1,
    })
      .to('#hero-lightpass', {
        scale: 1,
        duration: 0.25,
      }, 0.75);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, []);

  return (
<div id="smooth-wrapper" ref={main}>
    <section className="hero" ref={heroRef}>
      <canvas id="hero-lightpass" ref={canvasRef}></canvas>
      <div id="container">
        <h1>boobs</h1>
        </div>
        <div id="container" data-speed="0.5">
        <h2>boobs</h2>
        </div>
        <div id="container">
        <h2>boobs</h2>
        </div>
        <div id="container">
        <h2>boobs</h2>
        </div>
        <div id="container">
        <h2>boobs</h2>
        </div>
      
      
    </section>
    </div>
  );
}

export default HeroSection;