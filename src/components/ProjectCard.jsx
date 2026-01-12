import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-asan-gold flex flex-col h-full">
      <div className="h-48 bg-gray-200 overflow-hidden relative">
        <img 
          src={project.imageUrl || "https://via.placeholder.com/400x300?text=Project"} 
          alt={project.title} 
          onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=Image+Error"; }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-asan-gold hover:text-white transition-colors">
              <ExternalLink size={20} />
            </a>
          )}
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full hover:bg-asan-gold hover:text-white transition-colors">
              <Github size={20} />
            </a>
          )}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="text-xl font-serif font-bold text-asan-green mb-1">{project.title}</h3>
          {project.tagline && <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{project.tagline}</p>}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack?.slice(0, 3).map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-paper text-xs text-gray-500 rounded border border-gray-200">
              {tech}
            </span>
          ))}
          {project.techStack?.length > 3 && <span className="text-xs text-gray-400 self-center">+{project.techStack.length - 3}</span>}
        </div>

        <Link to={`/project/${project.id}`} className="mt-auto inline-flex items-center text-sm font-bold text-asan-red hover:text-asan-gold transition-colors">
          View Details <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;