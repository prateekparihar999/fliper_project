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
  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1));

  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 pt-2 pb-12 sm:pt-4 sm:pb-16">
      
      {/* Heading */}
      <div className="text-center max-w-xl mx-auto mb-4 ">
        <h2 className="text-blue-700 font-extrabold text-2xl sm:text-3xl md:text-4xl">
          Our Projects
        </h2>
      </div>

      {/* Description */}
      <p className="mt-2 mb-8 text-center text-gray-700 text-sm sm:text-base md:text-lg">
        We know what buyers are looking for and suggest projects that will bring clients top dollar for the sale of their homes.
      </p>

      {/* Carousel */}
      <div className="relative mb-10">
        <div className="flex items-center">

          {/* Left Arrow */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white shadow text-blue-700 hover:bg-blue-700 hover:text-white disabled:opacity-30 mr-2"
          >
            ‹
          </button>

          {/* Cards */}
          <div className="flex-1 overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${current * (100 / cardsPerView)}%)`,
                width: `${(projects.length * 100) / cardsPerView}%`
              }}
            >
              {projects.map((project, idx) => (
                <div
                  key={project._id || idx}
                  className="px-3 py-2"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <ProjectCard
                    imageUrl={project.imageUrl}
                    name={project.projectName}
                    description={project.description}
                    location={project.location}
                    createdAt={project.createdAt}
                    onReadMore={() =>
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            disabled={current === maxIndex}
            className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white shadow text-blue-700 hover:bg-blue-700 hover:text-white disabled:opacity-30 ml-2"
          >
            ›
          </button>

        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
