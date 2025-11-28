import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './PersonalizationPanel.module.css';
import { useUser } from '../contexts/UserContext';

export default function PersonalizationPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, login, logout, updatePreferences } = useUser();
    const [authMode, setAuthMode] = useState('login'); // login or signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = (e) => {
        e.preventDefault();
        // Mock Auth Flow
        if (email && password) {
            login(email.split('@')[0]);
            setAuthMode('preferences');
        }
    };

    const handleSavePreferences = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                className={styles.triggerButton}
                onClick={() => setIsOpen(true)}
                title="Customize Content"
            >
                {user.isAuthenticated ? '👤' : '⚙️'}
            </button>

            {isOpen && (
                <div className={styles.overlay}>
                    <div className={styles.panel}>
                        <div className={styles.header}>
                            <h3>{user.isAuthenticated ? `Hi, ${user.name}` : 'Personalize'}</h3>
                            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>✕</button>
                        </div>

                        <div className={styles.body}>
                            {!user.isAuthenticated ? (
                                <form onSubmit={handleAuth} className={styles.authForm}>
                                    <h4>{authMode === 'login' ? 'Sign In' : 'Create Account'}</h4>
                                    <p className={styles.subtext}>Join to save your progress and customize the book.</p>

                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />

                                    <button type="submit" className={styles.saveBtn}>
                                        {authMode === 'login' ? 'Sign In' : 'Sign Up'}
                                    </button>

                                    <div className={styles.authSwitch}>
                                        {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
                                        <span onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>
                                            {authMode === 'login' ? 'Sign Up' : 'Sign In'}
                                        </span>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className={styles.section}>
                                        <label>Your Background:</label>
                                        <select
                                            value={user.preferences.background}
                                            onChange={(e) => updatePreferences({ background: e.target.value })}
                                        >
                                            <option value="software">Software Engineer</option>
                                            <option value="hardware">Hardware/Robotics</option>
                                            <option value="student">Student</option>
                                            <option value="none">Beginner</option>
                                        </select>
                                    </div>

                                    <div className={styles.section}>
                                        <label>Learning Goal:</label>
                                        <select
                                            value={user.preferences.goal}
                                            onChange={(e) => updatePreferences({ goal: e.target.value })}
                                        >
                                            <option value="general">General Overview</option>
                                            <option value="build">Build a Robot</option>
                                            <option value="research">Academic Research</option>
                                        </select>
                                    </div>

                                    <div className={styles.footer}>
                                        <button className={styles.saveBtn} onClick={handleSavePreferences}>Save Preferences</button>
                                        <button className={styles.logoutBtn} onClick={logout}>Sign Out</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
