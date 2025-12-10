import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { fetchProjects } from '../../api/projectService';

const getCardsPerView = () => {
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 768) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

const ProjectsCarousel = () => {
  const [projects, setProjects] = useState([]);
  const [current, setCurrent] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };
    loadProjects();
  }, []);

  useEffect(() => {
    const handleResize = () => setCardsPerView(getCardsPerView());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, projects.length - cardsPerView);
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-1">
        <h2 className="text-blue-700 font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight">
          Our Projects
        </h2>
      </div>

      {/* ==== CAROUSEL SECTION ==== */}
      <div className="relative mb-4"> {/* Reduced gap from mb-16 → mb-4 */}
        <div className="flex items-center">
          
          {/* Left Button */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white/90 shadow text-blue-700 hover:bg-blue-700 hover:text-white transition disabled:opacity-30 mr-2 border border-blue-100"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M13 17l-5-5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Cards */}
          <div className="flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${(current * (100 / cardsPerView))}%)`,
                width: `${(projects.length * 100) / cardsPerView}%`,
              }}
            >
              {projects.map((project, idx) => (
                <div
                  key={project._id || idx}
                  className="px-3 py-2"
                  style={{ width: `${100 / projects.length}%`, minWidth: 0 }}
                >
                  <ProjectCard
                    imageUrl={project.imageUrl}
                    name={project.projectName}
                    description={project.description}
                    location={project.location}
                    createdAt={project.createdAt}
                    onReadMore={() => alert(`Read more about ${project.projectName}`)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={next}
            disabled={current === maxIndex}
            className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white/90 shadow text-blue-700 hover:bg-blue-700 hover:text-white transition disabled:opacity-30 ml-2 border border-blue-100"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M7 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

        </div>
      </div>

      {/* Description BEFORE card section */}
      <p className="mt-2 mb-4 text-center text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
        We know what buyers are looking for and suggest projects that will bring clients top dollar for the sale of their homes.
      </p>

      {/* ==== STATIC CARD GRID SECTION (NEW) ==== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow p-4">
          <img src="img/pexels-andres-ayrton-6578391.svg" className="w-full h-40 object-cover rounded mb-3" />
          <h3 className="text-lg font-semibold mb-1">Luxury Apartment</h3>
          <p className="text-sm text-gray-600 mb-2">
            Modern, high-rise apartment with city views and luxury amenities.
          </p>
          <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">Read More</button>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow p-4">
          <img src="img/pexels-brett-sayles-2881232-1.svg" className="w-full h-40 object-cover rounded mb-3" />
          <h3 className="text-lg font-semibold mb-1">Eco-Friendly Villa</h3>
          <p className="text-sm text-gray-600 mb-2">
            Sustainable villa built with eco-materials in a peaceful forest setting.
          </p>
          <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">Read More</button>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow p-4">
          <img src="img/pexels-brett-sayles-2881232-2.svg" className="w-full h-40 object-cover rounded mb-3" />
          <h3 className="text-lg font-semibold mb-1">Modern Studio</h3>
          <p className="text-sm text-gray-600 mb-2">
            Compact and stylish studio apartment perfect for young professionals.
          </p>
          <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">Read More</button>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-lg shadow p-4">
          <img src="img/pexels-fauxels-3182834.svg" className="w-full h-40 object-cover rounded mb-3" />
          <h3 className="text-lg font-semibold mb-1">Business Center</h3>
          <p className="text-sm text-gray-600 mb-2">
            Innovative office spaces with coworking facilities and modern design.
          </p>
          <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">Read More</button>
        </div>

        {/* Card 5 */}
        <div className="bg-white rounded-lg shadow p-4">
          <img src="img/pexels-brett-sayles-2881232.svg" className="w-full h-40 object-cover rounded mb-3" />
          <h3 className="text-lg font-semibold mb-1">Consultancy & Marketing</h3>
          <p className="text-sm text-gray-600 mb-2">
            Expert marketing team providing strategy, branding, and digital growth solutions.
          </p>
          <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">Read More</button>
        </div>

      </div>
    </section>
  );
};

export default ProjectsCarousel;
