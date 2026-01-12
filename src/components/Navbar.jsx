import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { Home, User, Briefcase, Award, PenTool } from 'lucide-react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isHero, setIsHero] = useState(true);

  const navItems = [
    { id: 'home', icon: <Home size={20} />, label: 'Home' },
    { id: 'about', icon: <User size={20} />, label: 'About' },
    { id: 'certifications', icon: <Award size={20} />, label: 'Certificates' },
    { id: 'projects', icon: <Briefcase size={20} />, label: 'Projects' },
    { id: 'blog', icon: <PenTool size={20} />, label: 'Blog' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Collapse navigation when scrolled past the hero section (approx 300px)
      setIsHero(window.scrollY < 300);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for highlighting active section
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -60% 0px', 
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className="fixed left-6 bottom-10 z-50 flex flex-col gap-3">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.id}
            smooth={true}
            duration={500}
            spy={true} 
            offset={-50}
            onSetActive={() => setActiveSection(item.id)}
            className={`flex items-center rounded-xl transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) cursor-pointer shadow-sm border border-transparent overflow-hidden h-12
              ${
                activeSection === item.id 
                  ? 'bg-dark-slate text-white shadow-md' 
                  : 'bg-gray-100/90 text-gray-500 hover:bg-white hover:text-dark-slate hover:shadow'
              }
              ${isHero ? 'w-[180px] px-4' : 'w-[48px] justify-center px-0'}
            `}
          >
            <div className="flex-shrink-0 relative z-10">{item.icon}</div>
            
            <div 
              className={`whitespace-nowrap font-medium transition-all duration-700 ease-in-out overflow-hidden flex items-center
                ${isHero ? 'max-w-[100px] opacity-100 ml-3' : 'max-w-0 opacity-0 ml-0'}
              `}
            >
              {item.label}
            </div>
          </Link>
        ))}
    </nav>
  );
};

export default Navbar;