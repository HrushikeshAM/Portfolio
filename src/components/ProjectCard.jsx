import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Star } from 'lucide-react';
import { Github } from './Icons';

const ProjectCard = ({ project, idx }) => {
  const { name, description, stars, url, tags } = project;

  // Custom animation configs
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: idx * 0.08
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="glass-panel project-card-container"
    >
      {/* Glow highlight inside card */}
      <div className="project-card-glow" />

      {/* Top bar with folder icon & link icons */}
      <div className="project-card-top">
        <span className="project-card-icon">
          <FolderGit2 style={{ width: '20px', height: '20px' }} />
        </span>
        <div className="project-card-stats">
          {stars > 0 && (
            <span className="project-card-stat">
              <Star style={{ width: '14px', height: '14px', fill: '#f59e0b', color: '#f59e0b' }} />
              <span>{stars}</span>
            </span>
          )}
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="project-card-link"
            title="View Source on GitHub"
          >
            <Github style={{ width: '20px', height: '20px' }} />
          </a>
        </div>
      </div>

      {/* Project info */}
      <div>
        <h3 className="project-card-title">
          {name}
        </h3>
        <p className="project-card-desc">
          {description}
        </p>
      </div>

      {/* Tech stack tags */}
      {tags && tags.length > 0 && (
        <div className="project-card-tags">
          {tags.map((tag, tIdx) => (
            <span 
              key={tIdx} 
              className="project-card-tag"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Bottom border color bar */}
      <div className="project-card-bar" />
    </motion.div>
  );
};

export default ProjectCard;
