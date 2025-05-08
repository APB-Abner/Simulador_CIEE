
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import LinhaDoTempo from '../components/LinhaDoTempo';
import Game from './Game';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const containerRef = useRef(null);

    useEffect(() => {
        const sections = containerRef.current.querySelectorAll('.section');
        sections.forEach((section, i) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: i * 0.2
                }
            );
        });
    }, []);

    return (
        <div ref={containerRef} className="p-6 space-y-20 bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
            <Game />
        </div>
    );
}