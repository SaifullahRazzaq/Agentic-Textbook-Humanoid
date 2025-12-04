import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from '../css/auth.module.css';
import { useAuthClient } from '@theme/Root'; // Import useAuthClient from Root.js
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        softwareBackground: 'none',
        learningGoal: 'general'
    });
    const authClient = useAuthClient(); // Get authClient from context
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authClient.signUp.email({
                email: formData.email,
                password: formData.password,
                // During initial sign-up, we only pass email and password.
                // Profile fields like background and goal are updated post-signup or via personalization panel.
            });
            // After successful signup, you might want to redirect or show a success message
            // For now, let's redirect to the main page.
            history.push('/');

            // Optionally, update the profile with initial preferences after signup
            await authClient.user.profile.set({
                softwareBackground: formData.softwareBackground,
                learningGoal: formData.learningGoal,
            });

        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
            setLoading(false);
        }
    };

    return (
        <Layout title="Sign Up" description="Create your account">
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>Join us to personalize your learning journey</p>

                    {error && <div className={styles.error}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="name">Full Name</label>
                            <input
                                className={styles.input}
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="John Doe"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="email">Email Address</label>
                            <input
                                className={styles.input}
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="password">Password</label>
                            <input
                                className={styles.input}
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                minLength={8}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="softwareBackground">Your Background</label>
                            <select
                                className={styles.input}
                                id="softwareBackground"
                                name="softwareBackground"
                                value={formData.softwareBackground}
                                onChange={handleChange}
                                required
                            >
                                <option value="none">Select your background</option>
                                <option value="software">Software Engineer</option>
                                <option value="hardware">Hardware/Robotics</option>
                                <option value="student">Student</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="learningGoal">Learning Goal</label>
                            <select
                                className={styles.input}
                                id="learningGoal"
                                name="learningGoal"
                                value={formData.learningGoal}
                                onChange={handleChange}
                                required
                            >
                                <option value="general">Select your learning goal</option>
                                <option value="build">Build a Robot</option>
                                <option value="research">Academic Research</option>
                            </select>
                        </div>

                        <button className={styles.button} type="submit" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        Already have an account? <Link to="/signin" className={styles.link}>Sign In</Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
