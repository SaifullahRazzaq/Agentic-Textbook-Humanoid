import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { TypeAnimation } from 'react-type-animation';
import { useInView } from 'react-intersection-observer';
import { useChatbot } from '@theme/Root'; // Import useChatbot
import styles from './index.module.css'; // Import styles

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', 'heroBanner')}>
      <div className="container">
        <h1 className="hero__title">
          <TypeAnimation
            sequence={[
              `The Future of Physical AI & Humanoid Robotics`,
              1500,
              `Master Humanoid Robotics`,
              1500,
              `Build Intelligent Machines`,
              1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            cursor={false}
          />
        </h1>
        <p className="hero__subtitle">
          Master the art of Humanoid Robotics with an AI-native, interactive textbook.
          Learn, simulate, and build the next generation of intelligent machines.
        </p>
        <div className="buttons">
          <Link
            className="button button--primary button--lg"
            to="/docs/introduction">
            Start Learning Now 🚀
          </Link>
          <Link
            className="button button--secondary button--lg"
            style={{ marginLeft: '1rem' }}
            to="https://github.com/SaifullahRazzaq">
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({ title, icon, description, delay }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={clsx('col col--4', 'feature-item', { 'is-visible': inView } )}
    style={{ transitionDelay: `${delay}ms` }}>
      <div className="glass-panel feature-card">
        <div className="feature-icon">{icon}</div>
        <h3 className="feature-title">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  const features = [
    {
      title: 'Interactive RAG Chatbot',
      icon: '🤖',
      description: (
        <>
          Stuck on a concept? Ask our embedded AI tutor. It understands the entire
          textbook and gives you instant, context-aware answers.
        </>
      ),
    },
    {
      title: 'Personalized Learning',
      icon: '🎯',
      description: (
        <>
          Tailor the content to your background. Whether you're a software engineer,
          hardware pro, or student, the book adapts to you.
        </>
      ),
    },
    {
      title: 'Bilingual Support',
      icon: '🌐',
      description: (
        <>
          Seamlessly switch between English and Urdu. We believe knowledge should
          have no language barriers.
        </>
      ),
    },
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="row">
          {features.map((props, idx) => (
            <Feature key={idx} delay={idx * 150} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BookChapter({ title, icon, description, link }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={clsx('col col--4', 'chapter-item', { 'is-visible': inView })}>
      <Link to={link} className="chapter-card-link">
        <div className="glass-panel chapter-card">
          <div className="chapter-icon">{icon}</div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

function KeyChapters() {
  const chapters = [
    {
      title: 'Introduction',
      icon: '📚',
      description: 'Explore the evolution of robotics, Physical AI vs Digital AI, and human-robot collaboration.',
      link: '/docs/introduction',
    },
    {
      title: 'Humanoid Basics',
      icon: '🤖',
      description: 'Dive into humanoid anatomy, actuators, sensors, kinematics, and dynamics.',
      link: '/docs/humanoid-basics',
    },
    {
      title: 'AI Integration',
      icon: '🧠',
      description: 'Learn about embedding AI agents, multi-agent systems, and real-world deployment.',
      link: '/docs/ai-integration',
    },
  ];

  return (
    <section className="key-chapters-section">
      <div className="container">
        <h2 className="text--center">Key Chapters</h2>
        <div className="row">
          {chapters.map((props, idx) => (
            <BookChapter key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial({ quote, author, position, delay }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={clsx('col col--6', 'testimonial-item', { 'is-visible': inView })}
         style={{ transitionDelay: `${delay}ms` }}>
      <div className="glass-panel testimonial-card">
        <p className="testimonial-quote">"{quote}"</p>
        <p className="testimonial-author">- {author}</p>
        <p className="testimonial-position">{position}</p>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This textbook is a game-changer for anyone serious about robotics. The AI integration is phenomenal!",
      author: "Dr. Alisa Khan",
      position: "Robotics Professor, Stanford University",
      icon: '🌟',
    },
    {
      quote: "The personalized learning path made complex topics easy to grasp. Highly recommended for all skill levels.",
      author: "Omar Ahmed",
      position: "Lead AI Engineer, Boston Dynamics",
      icon: '✨',
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="text--center">What Our Learners Say</h2>
        <div className="row">
          {testimonials.map((props, idx) => (
            <Testimonial key={idx} delay={idx * 150} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageChatbotSection() {
  const { toggleChatbot } = useChatbot();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className={clsx('chatbot-section', { 'is-visible': inView })}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col col--6">
            <div className="chatbot-content">
              <h2>Your Personal AI Robotics Tutor</h2>
              <p>
                Stuck on a complex concept? Need a deeper dive into a specific topic?
                Our intelligent RAG Chatbot is here to assist you, instantly.
                Powered by advanced AI, it provides context-aware answers directly from the textbook.
              </p>
              <button className="button button--primary button--lg" onClick={toggleChatbot}>
                Talk to the Chatbot Now 💬
              </button>
            </div>
          </div>
          <div className="col col--6 text--center">
            <div className="chatbot-animation-container">
              {/* Placeholder for an engaging animation or illustration */}
              <img src="/img/chatbot-hero.svg" alt="AI Chatbot" className="chatbot-illustration" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomepageImageSlider() {
  const images = [
    { src: 'https://images.pexels.com/photos/10360662/pexels-photo-10360662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Humanoid robot in action', title: 'Advanced Humanoid Control' },
    { src: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'AI integration with robotics', title: 'AI-Powered Robotic Systems' },
    { src: 'https://images.pexels.com/photos/7129769/pexels-photo-7129769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Robot hand interacting with human', title: 'Seamless Human-Robot Interaction' },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="homepage-image-slider">
      <div className="slider-container">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="slider-image"
        />
        <div className="slider-overlay">
          <h2>{images[currentIndex].title}</h2>
          <p>Explore the forefront of Physical AI and Humanoid Robotics through captivating visuals and expert insights.</p>
          <Link
            className="button button--primary button--lg"
            to="/docs/introduction">
            Discover More
          </Link>
        </div>

        <button className="slider-arrow slider-arrow-left" onClick={goToPrevious}>&#10094;</button>
        <button className="slider-arrow slider-arrow-right" onClick={goToNext}>&#10095;</button>

        <div className="slider-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={clsx('slider-dot', { 'active': index === currentIndex })}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}

function AuthNavigationSection() {
  return (
    <section className={styles.authNavigationSection}>
      <div className="container">
        <h2 className="hero__subtitle">Ready to dive deeper?</h2>
        <div className={styles.authButtons}>
          <Link
            className="button button--secondary button--lg"
            to="/signin">
            Sign In
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/signup">
            Sign Up
          </Link>
          <Link
            className="button button--link button--lg"
            to="/forgotpassword">
            Forgot Password?
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Physical AI & Humanoid Robotics Textbook">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageImageSlider />
        <HomepageChatbotSection />
        <AuthNavigationSection />
      </main>
    </Layout>
  );
}
