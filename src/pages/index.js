import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', 'heroBanner')}>
      <div className="container">
        <h1 className="hero__title">
          The Future of <br />
          <span style={{ color: 'var(--ifm-color-primary)' }}>Physical AI</span>
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

function Feature({ title, icon, description }) {
  return (
    <div className={clsx('col col--4')}>
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
            <Feature key={idx} {...props} />
          ))}
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
        <div className="container padding-vert--xl text--center">
          <h2>Ready to build the future?</h2>
          <p>Join thousands of students and engineers in the revolution.</p>
        </div>
      </main>
    </Layout>
  );
}
