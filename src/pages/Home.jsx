import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar';
import Chatbox from '../components/Chatbox';
import ProjectCard from '../components/ProjectCard';
import TimelineSection from '../components/TimelineSection';
import TechSkills from '../components/TechSkills';
import Certifications from '../components/Certifications';
import Footer from '../components/Footer';
import Mascot from '../components/Mascot';
import HeroBackground from '../components/HeroBackground';
import FullBodyMascot from '../components/FullBodyMascot';
import { Github, Linkedin, Mail, BookOpen, ExternalLink, Download } from 'lucide-react';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);

  // Typewriter Effect State
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const phrases = ["Python and Flask Developer", "building Web Apps and Tools"];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(current => isDeleting 
        ? fullText.substring(0, current.length - 1) 
        : fullText.substring(0, current.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setIsDeleting(true);
        setTypingSpeed(1750);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);
  
  // Data State
  const [siteConfig, setSiteConfig] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dynamic Curve Logic
  // Starts at 200px depth, flattens completely after 200px of scrolling
  const curveDepth = Math.max(0, 200 - scrollY); 

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    const fetchData = async () => {
      try {
        const configSnap = await getDoc(doc(db, "site_config", "main"));
        if (configSnap.exists()) setSiteConfig(configSnap.data());

        const projSnap = await getDocs(collection(db, "projects"));
        setProjects(projSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const expSnap = await getDocs(collection(db, "experience"));
        setExperience(expSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const blogSnap = await getDocs(collection(db, "blogs"));
        setBlogs(blogSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        
        const skillSnap = await getDocs(collection(db, "skills"));
        setSkills(skillSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const certSnap = await getDocs(collection(db, "certifications"));
        setCertifications(certSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      } catch (e) {
        console.error("Firebase fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const social = siteConfig?.social || {};

  // Filter Experience
  const workExperience = experience.filter(e => e.type === 'work');
  const educationExperience = experience.filter(e => e.type === 'education');

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Chatbox />

      {/* HERO SECTION */}
      <header 
        id="home"
        className="relative h-[40vh] min-h-[400px] flex flex-col items-center justify-center bg-asan-green text-white overflow-visible z-10 transition-all duration-100 ease-linear"
        style={{ 
          borderBottomLeftRadius: `50% ${curveDepth}px`, 
          borderBottomRightRadius: `50% ${curveDepth}px` 
        }}
      >
        <div className="absolute inset-0 z-0 rounded-b-[inherit] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-black/30"></div>
            <HeroBackground />
        </div>

        {/* Download CV */}
        <div className="absolute top-6 right-6 z-20">
            <a href="/resume.pdf" download className="group flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl hover:bg-white hover:text-asan-green transition-all duration-300 shadow-lg">
              <Download size={16} className="group-hover:animate-bounce" />
              <span className="font-serif font-bold tracking-wide text-sm">Download CV</span>
            </a>
        </div>

        <div className="relative z-10 container mx-auto flex flex-col items-center text-center px-4 pt-4">
          
          {/* Name & Tagline */}
          <div className="animate-fade-in-up flex flex-col items-center gap-[22px] mb-4">
             <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight drop-shadow-md">
               {siteConfig?.name || 'Wajahat Hassan'}
             </h1>
             <div className="inline-block relative">
                <span className="text-lg md:text-2xl font-light tracking-[0.15em] text-asan-gold uppercase">
                   {text}
                </span>
                <span className="inline-block w-0.5 h-6 bg-asan-gold ml-1 animate-pulse align-middle"></span>
             </div>
          </div>

          {/* Mascot Centered - Original position (-mb-24) */}
          <div className="relative w-48 h-48 md:w-60 md:h-60 mt-2 -mb-24 z-20 transition-transform hover:scale-105 duration-500 filter drop-shadow-2xl">
             <Mascot />
          </div>

        </div>
      </header>

      {/* SOCIAL LINKS - Moved Upward (pt-20) */}
      <div className="relative z-20 flex justify-center pt-20 pb-8">
          <div className="flex gap-8 justify-center items-center">
            {social.github && <a href={social.github} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-asan-gold hover:scale-110 transition-all transform"><Github size={28} /></a>}
            {social.linkedin && <a href={social.linkedin} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-asan-gold hover:scale-110 transition-all transform"><Linkedin size={28} /></a>}
            {social.email && <a href={`mailto:${social.email}`} className="text-gray-600 hover:text-asan-gold hover:scale-110 transition-all transform"><Mail size={28} /></a>}
            {social.fiverr && <a href={social.fiverr} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-asan-gold hover:scale-110 transition-all transform font-bold text-sm border-2 border-gray-400 hover:border-asan-gold px-2 py-0.5 rounded">Fi</a>}
            {social.medium && <a href={social.medium} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-asan-gold hover:scale-110 transition-all transform"><BookOpen size={28} /></a>}
          </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="flex justify-center pb-10 opacity-50 animate-bounce">
         <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
         </svg>
      </div>

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-6 py-10 ml-20 md:ml-auto md:px-20">
        
        {/* ABOUT & SKILLS SECTION */}
        <section id="about" className="py-16">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Heading + Bio + Skills */}
            <div className="lg:col-span-2 flex flex-col items-center text-center lg:items-center lg:text-center">
                {/* Heading */}
                <div className="mb-8">
                   <h2 className="text-4xl font-bold text-dark-slate inline-block border-b-4 border-asan-gold pb-2">ABOUT</h2>
                </div>

                {/* Bio Text */}
                <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap mb-10 max-w-3xl">
                    {siteConfig?.aboutText || "Welcome to Wajahat's Odyssey - a journey from Electrical Engineering to Python Development. I build small, production-like Flask applications (OOP, SQL, templating, deployment) applying my engineering attention to detail. My project “The Shrine” is a full-stack Flask showcase of clean backend architecture and generative-AI integration. I favor clean, maintainable code and focus on delivering reliable, explainable systems others can maintain."}
                </div>

                {/* Skills Block */}
                <div className="w-full flex justify-center">
                   <TechSkills skills={skills} />
                </div>
            </div>

            {/* Right Column: Mascot */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center lg:justify-start lg:pt-10">
                <div className="transform hover:scale-105 transition-transform duration-500 sticky top-24">
                   <FullBodyMascot />
                   <p className="text-center text-xs text-gray-400 mt-4 italic animate-pulse">Psst... I react to clicks!</p>
                </div>
            </div>

          </div>
        </section>

        {/* EXPERIENCE & EDUCATION SPLIT SECTION */}
        <section className="py-16">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Work Experience */}
              <TimelineSection title="Work Experience" items={workExperience} type="work" />
              
              {/* Education */}
              <TimelineSection title="Education" items={educationExperience} type="education" />
           </div>
        </section>

        {/* CERTIFICATIONS SECTION */}
        {certifications.length > 0 && (
          <section id="certifications" className="py-16 bg-asan-green/5 rounded-3xl mb-16 px-4 md:px-12">
            <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-dark-slate inline-block border-b-4 border-asan-gold pb-2">CERTIFICATIONS</h2>
            </div>
            <Certifications items={certifications} />
          </section>
        )}

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 bg-white/50 rounded-3xl p-8 my-10">
          <h2 className="text-4xl font-serif font-bold text-asan-green mb-10 border-l-4 border-asan-red pl-4">Portfolio Pieces</h2>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">Projects will appear here once added in Admin.</p>
          )}
        </section>

        {/* BLOG SECTION */}
        <section id="blog" className="py-20">
          <h2 className="text-4xl font-serif font-bold text-asan-green mb-10 border-l-4 border-asan-red pl-4">Blog & Thoughts</h2>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map(blog => (
                    <a key={blog.id} href={blog.link} target="_blank" rel="noopener noreferrer" className="block p-6 bg-white border border-gray-100 rounded-xl hover:shadow-lg transition-all hover:border-asan-gold group">
                        <div className="flex justify-between items-start mb-2">
                             <h3 className="text-xl font-serif font-bold text-dark-slate group-hover:text-asan-green transition-colors">{blog.title}</h3>
                             <ExternalLink size={16} className="text-gray-400 group-hover:text-asan-gold" />
                        </div>
                        {blog.date && <p className="text-xs text-gray-400 mb-3">{blog.date}</p>}
                        <p className="text-gray-600">{blog.summary}</p>
                    </a>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No blog posts found.</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;