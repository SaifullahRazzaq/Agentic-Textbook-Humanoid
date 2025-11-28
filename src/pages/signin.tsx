import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from '../css/auth.module.css';
import { authClient } from '../lib/auth-client';
import Link from '@docusaurus/Link';
import { useHistory } from '@docusaurus/router';

export default function Signin() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
            }, {
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
        <Layout title="Sign In" description="Login to your account">
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to continue your progress</p>

                    {error && <div className={styles.error}>{error}</div>}

                    <form onSubmit={handleSubmit}>
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
                            />
                        </div>

                        <button className={styles.button} type="submit" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        Don't have an account? <Link to="/signup" className={styles.link}>Sign Up</Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
