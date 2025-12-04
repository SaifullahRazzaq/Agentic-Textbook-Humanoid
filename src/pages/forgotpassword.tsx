import React, { useState } from 'react';
import Layout from '@theme/Layout';
import styles from '../css/auth.module.css';
import { useAuthClient } from '@theme/Root';
import Link from '@docusaurus/Link';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const authClient = useAuthClient();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            // Assuming better-auth has a forgot password mechanism
            // This might involve sending a password reset email
            await authClient.auth.sendPasswordResetEmail({ email });
            setMessage('If an account with that email exists, a password reset link has been sent.');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout title="Forgot Password" description="Reset your password">
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <h1 className={styles.title}>Forgot Your Password?</h1>
                    <p className={styles.subtitle}>Enter your email to receive a reset link</p>

                    {message && <div className={styles.success}>{message}</div>}
                    {error && <div className={styles.error}>{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor="email">Email Address</label>
                            <input
                                className={styles.input}
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                placeholder="john@example.com"
                            />
                        </div>

                        <button className={styles.button} type="submit" disabled={loading}>
                            {loading ? 'Sending Link...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <div className={styles.footer}>
                        Remember your password? <Link to="/signin" className={styles.link}>Sign In</Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
