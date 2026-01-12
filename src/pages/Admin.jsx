import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { Trash2, Edit, Save, LogOut, Layout, Briefcase, FileText, Settings, Cpu, Award } from 'lucide-react';

const Admin = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  
  // Auth State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Data State
  const [siteConfig, setSiteConfig] = useState({
    name: '', tagline: '', aboutText: '',
    social: { github: '', linkedin: '', email: '', fiverr: '', medium: '' }
  });
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);

  // Form States
  const [editingId, setEditingId] = useState(null);
  
  const [projectForm, setProjectForm] = useState({
    title: '', tagline: '', description: '', techStack: '', youtubeLink: '', imageUrl: '', demoLink: '', githubLink: '', date: '', features: ''
  });
  
  const [expForm, setExpForm] = useState({
    title: '', organization: '', type: 'work', startDate: '', endDate: '', description: '', location: '', tags: '', grade: ''
  });
  
  const [blogForm, setBlogForm] = useState({
    title: '', summary: '', link: '', date: ''
  });

  const [skillForm, setSkillForm] = useState({
    name: '', percentage: 50, category: 'Main'
  });

  const [certForm, setCertForm] = useState({
    title: '', description: '', imageUrl: '', link: ''
  });

  // Fetch Data
  useEffect(() => {
    if (!currentUser) return;

    const unsubProjects = onSnapshot(collection(db, "projects"), (snap) => setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const unsubExp = onSnapshot(collection(db, "experience"), (snap) => setExperiences(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const unsubBlogs = onSnapshot(collection(db, "blogs"), (snap) => setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const unsubSkills = onSnapshot(collection(db, "skills"), (snap) => setSkills(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const unsubCerts = onSnapshot(collection(db, "certifications"), (snap) => setCertifications(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    const fetchConfig = async () => {
        const docRef = doc(db, "site_config", "main");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setSiteConfig(docSnap.data());
    };
    fetchConfig();

    return () => { unsubProjects(); unsubExp(); unsubBlogs(); unsubSkills(); unsubCerts(); };
  }, [currentUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setAuthError('Failed to login. Check credentials.');
    }
  };

  const handleDelete = async (collectionName, id) => {
    if (window.confirm('Delete this item?')) {
      await deleteDoc(doc(db, collectionName, id));
    }
  };

  const handleSaveConfig = async () => {
    try {
      await setDoc(doc(db, "site_config", "main"), siteConfig, { merge: true });
      alert('Config saved!');
    } catch (e) { alert('Error saving config'); }
  };

  // --- PROJECT HANDLERS ---
  const handleSaveProject = async (e) => {
    e.preventDefault();
    const data = { ...projectForm, techStack: typeof projectForm.techStack === 'string' ? projectForm.techStack.split(',').map(s => s.trim()) : projectForm.techStack, updatedAt: new Date() };
    try {
      if (editingId) await updateDoc(doc(db, "projects", editingId), data);
      else await addDoc(collection(db, "projects"), { ...data, createdAt: new Date() });
      setEditingId(null);
      setProjectForm({ title: '', tagline: '', description: '', techStack: '', youtubeLink: '', imageUrl: '', demoLink: '', githubLink: '', date: '', features: '' });
      alert('Project saved!');
    } catch (err) { alert('Error saving project'); }
  };

  // --- EXPERIENCE HANDLERS ---
  const handleSaveExp = async (e) => {
    e.preventDefault();
    const data = { ...expForm, tags: typeof expForm.tags === 'string' ? expForm.tags.split(',').map(s => s.trim()) : expForm.tags };
    try {
      if (editingId) await updateDoc(doc(db, "experience", editingId), data);
      else await addDoc(collection(db, "experience"), { ...data, createdAt: new Date() });
      setEditingId(null);
      setExpForm({ title: '', organization: '', type: 'work', startDate: '', endDate: '', description: '', location: '', tags: '', grade: '' });
      alert('Experience saved!');
    } catch (err) { alert('Error saving experience'); }
  };

  // --- BLOG HANDLERS ---
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await updateDoc(doc(db, "blogs", editingId), blogForm);
      else await addDoc(collection(db, "blogs"), { ...blogForm, createdAt: new Date() });
      setEditingId(null);
      setBlogForm({ title: '', summary: '', link: '', date: '' });
      alert('Blog saved!');
    } catch (err) { alert('Error saving blog'); }
  };

  // --- SKILL HANDLERS ---
  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await updateDoc(doc(db, "skills", editingId), skillForm);
      else await addDoc(collection(db, "skills"), { ...skillForm, createdAt: new Date() });
      setEditingId(null);
      setSkillForm({ name: '', percentage: 50, category: 'Main' });
      alert('Skill saved!');
    } catch (err) { alert('Error saving skill'); }
  };

  // --- CERTIFICATION HANDLERS ---
  const handleSaveCert = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await updateDoc(doc(db, "certifications", editingId), certForm);
      else await addDoc(collection(db, "certifications"), { ...certForm, createdAt: new Date() });
      setEditingId(null);
      setCertForm({ title: '', description: '', imageUrl: '', link: '' });
      alert('Certification saved!');
    } catch (err) { alert('Error saving certification'); }
  };


  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-lg w-96 border-t-4 border-asan-green">
          <h2 className="text-2xl font-serif mb-6 text-center text-asan-green">CMS Login</h2>
          {authError && <p className="text-red-500 text-sm mb-4">{authError}</p>}
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full mb-4 p-2 border rounded" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full mb-6 p-2 border rounded" />
          <button type="submit" className="w-full bg-asan-green text-white py-2 rounded hover:bg-opacity-90">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-dark-slate text-white flex flex-col fixed h-full z-50">
        <div className="p-6 text-2xl font-serif font-bold text-asan-gold border-b border-gray-700">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('config')} className={`w-full flex items-center gap-3 p-3 rounded ${activeTab === 'config' ? 'bg-asan-gold text-dark-slate' : 'hover:bg-gray-700'}`}>
            <Settings size={20} /> Site Config
          </button>
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 p-3 rounded ${activeTab === 'projects' ? 'bg-asan-gold text-dark-slate' : 'hover:bg-gray-700'}`}>
            <Layout size={20} /> Projects
          </button>
          <button onClick={() => setActiveTab('experience')} className={`w-full flex items-center gap-3 p-3 rounded ${activeTab === 'experience' ? 'bg-asan-gold text-dark-slate' : 'hover:bg-gray-700'}`}>
            <Briefcase size={20} /> Experience
          </button>
          <button onClick={() => setActiveTab('skills')} className={`w-full flex items-center gap-3 p-3 rounded ${activeTab === 'skills' ? 'bg-asan-gold text-dark-slate' : 'hover:bg-gray-700'}`}>
            <Cpu size={20} /> Skills
          </button>
          <button onClick={() => setActiveTab('certifications')} className={`w-full flex items-center gap-3 p-3 rounded ${activeTab === 'certifications' ? 'bg-asan-gold text-dark-slate' : 'hover:bg-gray-700'}`}>
            <Award size={20} /> Certifications
          </button>
          <button onClick={() => setActiveTab('blogs')} className={`w-full flex items-center gap-3 p-3 rounded ${activeTab === 'blogs' ? 'bg-asan-gold text-dark-slate' : 'hover:bg-gray-700'}`}>
            <FileText size={20} /> Blogs
          </button>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={() => signOut(auth)} className="w-full flex items-center gap-2 text-red-400 hover:text-red-300">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-serif text-asan-green mb-8 capitalize">{activeTab} Management</h1>

        {/* --- SITE CONFIG TAB --- */}
        {activeTab === 'config' && (
          <div className="bg-white p-8 rounded-lg shadow space-y-6 max-w-2xl">
            {/* ... Existing Config Fields ... */}
            <div><label className="block text-sm font-bold mb-2">My Name</label><input value={siteConfig.name} onChange={e => setSiteConfig({...siteConfig, name: e.target.value})} className="w-full p-2 border rounded" /></div>
            <div><label className="block text-sm font-bold mb-2">Tagline</label><input value={siteConfig.tagline} onChange={e => setSiteConfig({...siteConfig, tagline: e.target.value})} className="w-full p-2 border rounded" /></div>
            <div><label className="block text-sm font-bold mb-2">About Me</label><textarea rows={6} value={siteConfig.aboutText} onChange={e => setSiteConfig({...siteConfig, aboutText: e.target.value})} className="w-full p-2 border rounded" /></div>
            
            <h3 className="text-xl font-bold pt-4 border-t">Social Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <input placeholder="GitHub" value={siteConfig.social.github} onChange={e => setSiteConfig({...siteConfig, social: {...siteConfig.social, github: e.target.value}})} className="p-2 border rounded" />
              <input placeholder="LinkedIn" value={siteConfig.social.linkedin} onChange={e => setSiteConfig({...siteConfig, social: {...siteConfig.social, linkedin: e.target.value}})} className="p-2 border rounded" />
              <input placeholder="Email" value={siteConfig.social.email} onChange={e => setSiteConfig({...siteConfig, social: {...siteConfig.social, email: e.target.value}})} className="p-2 border rounded" />
              <input placeholder="Fiverr" value={siteConfig.social.fiverr} onChange={e => setSiteConfig({...siteConfig, social: {...siteConfig.social, fiverr: e.target.value}})} className="p-2 border rounded" />
              <input placeholder="Medium" value={siteConfig.social.medium} onChange={e => setSiteConfig({...siteConfig, social: {...siteConfig.social, medium: e.target.value}})} className="p-2 border rounded" />
            </div>
            <button onClick={handleSaveConfig} className="bg-asan-green text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-opacity-90"><Save size={18} /> Save</button>
          </div>
        )}

        {/* --- PROJECTS TAB --- */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Project' : 'Add Project'}</h3>
              <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Title" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="p-2 border rounded" required />
                <input placeholder="Tagline" value={projectForm.tagline} onChange={e => setProjectForm({...projectForm, tagline: e.target.value})} className="p-2 border rounded" />
                <textarea placeholder="Description" rows={3} value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="p-2 border rounded md:col-span-2" required />
                <input placeholder="Tech Stack (comma sep)" value={projectForm.techStack} onChange={e => setProjectForm({...projectForm, techStack: e.target.value})} className="p-2 border rounded" />
                <input placeholder="Date" value={projectForm.date} onChange={e => setProjectForm({...projectForm, date: e.target.value})} className="p-2 border rounded" />
                <input placeholder="YouTube Link" value={projectForm.youtubeLink} onChange={e => setProjectForm({...projectForm, youtubeLink: e.target.value})} className="p-2 border rounded" />
                <input placeholder="Image URL" value={projectForm.imageUrl} onChange={e => setProjectForm({...projectForm, imageUrl: e.target.value})} className="p-2 border rounded" />
                {projectForm.imageUrl && (
                  <div className="md:col-span-2 h-40 bg-gray-100 rounded flex items-center justify-center overflow-hidden border border-gray-300">
                     <img src={projectForm.imageUrl} alt="Preview" className="h-full object-contain" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}
                <input placeholder="Demo Link" value={projectForm.demoLink} onChange={e => setProjectForm({...projectForm, demoLink: e.target.value})} className="p-2 border rounded" />
                <input placeholder="GitHub Link" value={projectForm.githubLink} onChange={e => setProjectForm({...projectForm, githubLink: e.target.value})} className="p-2 border rounded" />
                <div className="md:col-span-2 flex gap-2">
                  <button type="submit" className="bg-asan-green text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
                  {editingId && <button type="button" onClick={() => {setEditingId(null); setProjectForm({ title: '', tagline: '', description: '', techStack: '', youtubeLink: '', imageUrl: '', demoLink: '', githubLink: '', date: '', features: '' })}} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                </div>
              </form>
            </div>
            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(p => (
                <div key={p.id} className="bg-white p-4 rounded shadow border-l-4 border-asan-gold flex justify-between">
                  <div><h4 className="font-bold">{p.title}</h4><p className="text-sm text-gray-500 truncate">{p.tagline}</p></div>
                  <div className="flex gap-2">
                    <button onClick={() => {setEditingId(p.id); setProjectForm(p);}} className="text-blue-500"><Edit size={18}/></button>
                    <button onClick={() => handleDelete('projects', p.id)} className="text-red-500"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- EXPERIENCE TAB --- */}
        {activeTab === 'experience' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Experience' : 'Add Experience'}</h3>
              <form onSubmit={handleSaveExp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Title / Degree" value={expForm.title} onChange={e => setExpForm({...expForm, title: e.target.value})} className="p-2 border rounded" required />
                <input placeholder="Organization / University" value={expForm.organization} onChange={e => setExpForm({...expForm, organization: e.target.value})} className="p-2 border rounded" required />
                <select value={expForm.type} onChange={e => setExpForm({...expForm, type: e.target.value})} className="p-2 border rounded">
                  <option value="work">Work</option>
                  <option value="education">Education</option>
                </select>
                <input placeholder="Location (Country Flag/Name)" value={expForm.location} onChange={e => setExpForm({...expForm, location: e.target.value})} className="p-2 border rounded" />
                <div className="flex gap-2">
                  <input placeholder="Start Date" value={expForm.startDate} onChange={e => setExpForm({...expForm, startDate: e.target.value})} className="p-2 border rounded w-1/2" />
                  <input placeholder="End Date" value={expForm.endDate} onChange={e => setExpForm({...expForm, endDate: e.target.value})} className="p-2 border rounded w-1/2" />
                </div>
                <input placeholder="Tags (comma sep, e.g. 'CV, AI')" value={expForm.tags} onChange={e => setExpForm({...expForm, tags: e.target.value})} className="p-2 border rounded" />
                <input placeholder="Grade / Thesis info" value={expForm.grade} onChange={e => setExpForm({...expForm, grade: e.target.value})} className="p-2 border rounded" />
                <textarea placeholder="Description (Bullet points recommended)" rows={3} value={expForm.description} onChange={e => setExpForm({...expForm, description: e.target.value})} className="p-2 border rounded md:col-span-2" />
                
                <div className="md:col-span-2 flex gap-2">
                  <button type="submit" className="bg-asan-green text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
                  {editingId && <button type="button" onClick={() => {setEditingId(null); setExpForm({ title: '', organization: '', type: 'work', startDate: '', endDate: '', description: '', location: '', tags: '', grade: '' })}} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                </div>
              </form>
            </div>
            {/* List */}
             <div className="space-y-2">
              {experiences.map(ex => (
                <div key={ex.id} className="bg-white p-4 rounded shadow flex justify-between">
                  <div><h4 className="font-bold">{ex.title}</h4><span className="text-xs bg-gray-200 px-2 rounded">{ex.type}</span></div>
                  <div className="flex gap-2">
                    <button onClick={() => {setEditingId(ex.id); setExpForm(ex);}} className="text-blue-500"><Edit size={18}/></button>
                    <button onClick={() => handleDelete('experience', ex.id)} className="text-red-500"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- SKILLS TAB --- */}
        {activeTab === 'skills' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Skill' : 'Add Skill'}</h3>
              <form onSubmit={handleSaveSkill} className="flex gap-4 items-end flex-wrap">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs font-bold mb-1">Skill Name</label>
                    <input placeholder="e.g. Python" value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} className="w-full p-2 border rounded" required />
                </div>
                <div className="w-32">
                    <label className="block text-xs font-bold mb-1">Level (%)</label>
                    <input type="number" min="0" max="100" value={skillForm.percentage} onChange={e => setSkillForm({...skillForm, percentage: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <button type="submit" className="bg-asan-green text-white px-6 py-2 rounded h-10">{editingId ? 'Update' : 'Add'}</button>
                {editingId && <button type="button" onClick={() => {setEditingId(null); setSkillForm({ name: '', percentage: 50, category: 'Main' })}} className="bg-gray-500 text-white px-4 py-2 rounded h-10">Cancel</button>}
              </form>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map(s => (
                <div key={s.id} className="bg-white p-4 rounded shadow border-b-4 border-asan-gold flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{s.name}</h4>
                    <div className="w-24 h-2 bg-gray-200 rounded mt-1"><div className="h-full bg-asan-green rounded" style={{width: `${s.percentage}%`}}></div></div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => {setEditingId(s.id); setSkillForm(s);}} className="text-blue-500 p-1"><Edit size={16}/></button>
                    <button onClick={() => handleDelete('skills', s.id)} className="text-red-500 p-1"><Trash2 size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- CERTIFICATIONS TAB (NEW) --- */}
        {activeTab === 'certifications' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Certification' : 'Add Certification'}</h3>
              <form onSubmit={handleSaveCert} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Certificate Title" value={certForm.title} onChange={e => setCertForm({...certForm, title: e.target.value})} className="p-2 border rounded" required />
                <input placeholder="Link to Credential" value={certForm.link} onChange={e => setCertForm({...certForm, link: e.target.value})} className="p-2 border rounded" />
                <input placeholder="Image URL (Logo/Certificate)" value={certForm.imageUrl} onChange={e => setCertForm({...certForm, imageUrl: e.target.value})} className="p-2 border rounded" />
                <textarea placeholder="Description / Issuer" rows={2} value={certForm.description} onChange={e => setCertForm({...certForm, description: e.target.value})} className="p-2 border rounded md:col-span-2" />
                
                <div className="md:col-span-2 flex gap-2">
                  <button type="submit" className="bg-asan-green text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
                  {editingId && <button type="button" onClick={() => {setEditingId(null); setCertForm({ title: '', description: '', imageUrl: '', link: '' })}} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                </div>
              </form>
            </div>
            {/* List */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map(c => (
                <div key={c.id} className="bg-white p-4 rounded shadow border-l-4 border-asan-gold flex justify-between items-center">
                  <div className="flex items-center gap-3">
                     {c.imageUrl ? <img src={c.imageUrl} alt="" className="w-10 h-10 object-contain" /> : <Award className="w-8 h-8 text-gray-400" />}
                     <div>
                        <h4 className="font-bold">{c.title}</h4>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">{c.description}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => {setEditingId(c.id); setCertForm(c);}} className="text-blue-500"><Edit size={18}/></button>
                    <button onClick={() => handleDelete('certifications', c.id)} className="text-red-500"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- BLOGS TAB --- */}
        {activeTab === 'blogs' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">{editingId ? 'Edit Blog' : 'Add Blog'}</h3>
              <form onSubmit={handleSaveBlog} className="grid grid-cols-1 gap-4">
                <input placeholder="Title" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="p-2 border rounded" required />
                <input placeholder="Link" value={blogForm.link} onChange={e => setBlogForm({...blogForm, link: e.target.value})} className="p-2 border rounded" />
                <input placeholder="Date" value={blogForm.date} onChange={e => setBlogForm({...blogForm, date: e.target.value})} className="p-2 border rounded" />
                <textarea placeholder="Summary" rows={2} value={blogForm.summary} onChange={e => setBlogForm({...blogForm, summary: e.target.value})} className="p-2 border rounded" />
                <div className="flex gap-2">
                  <button type="submit" className="bg-asan-green text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
                  {editingId && <button type="button" onClick={() => {setEditingId(null); setBlogForm({ title: '', summary: '', link: '', date: '' })}} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
                </div>
              </form>
            </div>
             <div className="space-y-2">
              {blogs.map(b => (
                 <div key={b.id} className="bg-white p-4 rounded shadow flex justify-between">
                  <div><h4 className="font-bold">{b.title}</h4></div>
                  <div className="flex gap-2">
                    <button onClick={() => {setEditingId(b.id); setBlogForm(b);}} className="text-blue-500"><Edit size={18}/></button>
                    <button onClick={() => handleDelete('blogs', b.id)} className="text-red-500"><Trash2 size={18}/></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Admin;