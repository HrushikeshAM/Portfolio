import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react';

const Timeline = () => {
  const items = [
    {
      type: 'education',
      title: 'Masters of Computer Application (CC & DevOps)',
      institution: 'Chandigarh University, Punjab',
      period: '2024 – 2026',
      score: '8.05 CGPA',
      details: 'Specialized in Cloud Infrastructure, container deployment, CI/CD, Kubernetes orchestration, Linux system administration, and automation scripting.',
      location: 'Mohali, Punjab'
    },
    {
      type: 'education',
      title: 'Bachelors of Computer Applications',
      institution: 'Acharya Bangalore B-School (ABBS)',
      period: '2020 – 2023',
      score: '7.88 CGPA',
      details: 'Covered algorithms, system architecture, database management (SQL/NoSQL), and completed full-stack web applications using Javascript and MERN.',
      location: 'Bengaluru, Karnataka'
    },
    {
      type: 'school',
      title: 'Pre-University (Intermediate)',
      institution: 'Reva PU College',
      period: 'Graduated: 2020',
      score: 'PCMC (Science)',
      details: 'Focus on Physics, Chemistry, Mathematics, and Computer Science foundation.',
      location: 'Bengaluru, Karnataka'
    },
    {
      type: 'school',
      title: 'Matriculation (CBSE)',
      institution: 'Kendriya Vidyalaya CRPF',
      period: 'Graduated: 2018',
      score: 'Class X Secondary Education',
      details: 'Acquired foundational education, active participation in computer science labs.',
      location: 'Bengaluru, Karnataka'
    }
  ];

  return (
    <div className="timeline-track">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className="timeline-item"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
        >
          {/* Timeline Dot/Icon */}
          <span className="timeline-icon">
            {item.type === 'education' ? (
              <GraduationCap style={{ width: '16px', height: '16px' }} />
            ) : (
              <Award style={{ width: '16px', height: '16px' }} />
            )}
          </span>

          {/* Timeline Card */}
          <div className="glass-panel timeline-card">
            <div className="timeline-card-content">
              <div className="timeline-title-row">
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>
                  {item.title}
                </h3>
                {item.score && (
                  <span className="timeline-score-badge">
                    {item.score}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#cbd5e1' }}>{item.institution}</p>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.5', marginTop: '0.25rem' }}>{item.details}</p>
            </div>
            
            {/* Metadata (Period & Location) */}
            <div className="timeline-meta-row">
              <span className="timeline-meta-item">
                <Calendar style={{ width: '14px', height: '14px', color: '#6366f1' }} />
                <span>{item.period}</span>
              </span>
              <span className="timeline-meta-item">
                <MapPin style={{ width: '14px', height: '14px', color: '#10b981' }} />
                <span>{item.location}</span>
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;
