import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from '../css/auth.module.css';
import { authClient } from '../lib/auth-client';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        softwareBackground: '',
        hardwareBackground: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                name: formData.name,
                softwareBackground: formData.softwareBackground, // Custom field
                hardwareBackground: formData.hardwareBackground, // Custom field
            } as any, {
                onSuccess: () => {
                    history.push('/');
                },
                onError: (ctx) => {
                    setError(ctx.error.message);
                    setLoading(false);
                }
            });
        } catch (err) {
            setError('An unexpected error occurred');
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
                            <label className={styles.label} htmlFor="softwareBackground">Software Background</label>
                            <textarea
                                className={styles.textarea}
                                id="softwareBackground"
                                name="softwareBackground"
                                value={formData.softwareBackground}
                                onChange={handleChange}
                                placeholder="Tell us about your coding experience..."
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="hardwareBackground">Hardware Background</label>
                            <textarea
                                className={styles.textarea}
                                id="hardwareBackground"
                                name="hardwareBackground"
                                value={formData.hardwareBackground}
                                onChange={handleChange}
                                placeholder="Any experience with robotics or electronics?"
                            />
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
