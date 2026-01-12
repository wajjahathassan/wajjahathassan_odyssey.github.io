
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowLeft, Github, ExternalLink, Calendar } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
          // Handle not found - maybe redirect or show error
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    // Simple regex to extract ID from standard youtube links
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  if (loading) return <div className="min-h-screen bg-paper flex items-center justify-center">Loading...</div>;
  if (!project) return <div className="min-h-screen bg-paper flex items-center justify-center">Project not found.</div>;

  const embedUrl = getYoutubeEmbedUrl(project.youtubeLink);

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-6 py-24 flex-grow">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-asan-green mb-8 hover:text-asan-gold transition-colors"
        >
          <ArrowLeft size={20} /> Back to Projects
        </button>

        <article className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
            {/* Header / Title Section */}
            <div className="p-8 md:p-12 border-b border-gray-100">
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack?.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-asan-green/10 text-asan-green text-sm font-medium rounded-full">
                            {tech}
                        </span>
                    ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-slate mb-4">{project.title}</h1>
                {project.tagline && <p className="text-xl text-gray-500 font-light">{project.tagline}</p>}
                
                <div className="flex flex-wrap gap-6 mt-6">
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-asan-gold font-medium">
                            <Github size={20} /> View Source
                        </a>
                    )}
                    {project.demoLink && (
                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-700 hover:text-asan-gold font-medium">
                            <ExternalLink size={20} /> Live Demo
                        </a>
                    )}
                    {project.date && (
                        <span className="flex items-center gap-2 text-gray-500">
                            <Calendar size={20} /> {project.date}
                        </span>
                    )}
                </div>
            </div>

            {/* Media Section (Video or Image) */}
            <div className="w-full bg-black/5">
                {embedUrl ? (
                    <div className="aspect-video w-full">
                        <iframe 
                            src={embedUrl} 
                            title={project.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : (
                    <div className="aspect-video w-full bg-gray-200 relative">
                         <img 
                            src={project.imageUrl || "https://via.placeholder.com/1200x600?text=No+Preview"} 
                            alt={project.title}
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/1200x600?text=Image+Error"; }}
                            className="w-full h-full object-cover"
                         />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 prose prose-lg max-w-none text-gray-700">
                <h3 className="font-serif text-2xl text-asan-green">About this Project</h3>
                <div className="whitespace-pre-wrap leading-relaxed">
                    {project.description}
                </div>
                
                {/* Additional Details if any (could be structured text or just appended) */}
                {project.features && (
                    <>
                        <h3 className="font-serif text-2xl text-asan-green mt-8">Key Features</h3>
                        <ul className="list-disc pl-5">
                            {project.features.split('\n').map((feature, i) => (
                                feature.trim() && <li key={i}>{feature.trim()}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetails;
