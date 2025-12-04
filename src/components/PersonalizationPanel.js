import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './PersonalizationPanel.module.css';
import { useAuthClient } from '@theme/Root'; // Import useAuthClient from Root.js

export default function PersonalizationPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const authClient = useAuthClient(); // Get authClient from context
    const { data: session, isPending, isRefetching, error, refetch } = authClient.useSession();
    const user = session?.data;

    const [authMode, setAuthMode] = useState('login'); // login or signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (authMode === 'login') {
                await authClient.signIn.email({
                    email, password
                });
            } else {
                await authClient.signUp.email({
                    email, password, // Initial sign-up doesn't take profile fields directly.
                    // Profile fields will be updated after successful sign-up or on separate panel action.
                });
            }
            refetch(); // Refetch session after auth action
        } catch (authError) {
            console.error('Authentication error:', authError);
            alert('Authentication failed. Please check your credentials.');
        }
    };

    const handleUpdateProfile = async (field, value) => {
        try {
            await authClient.user.profile.set({
                [field]: value,
            });
            refetch(); // Refetch session to update UI after profile change
        } catch (profileError) {
            console.error(`Failed to update ${field}:`, profileError);
            alert(`Failed to update ${field}.`);
        }
    };

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            refetch(); // Refetch session after logout
            setIsOpen(false);
        } catch (logoutError) {
            console.error('Failed to log out:', logoutError);
            alert('Failed to log out.');
        }
    };

    if (isPending) {
        return <div className={styles.triggerButton}>Loading...</div>; // Show loading state
    }

    return (
        <>
            <button
                className={styles.triggerButton}
                onClick={() => setIsOpen(true)}
                title="Customize Content"
            >
                {user?.id ? '👤' : '⚙️'}
            </button>

            {isOpen && (
                <div className={styles.overlay}>
                    <div className={styles.panel}>
                        <div className={styles.header}>
                            <h3>{user?.id ? `Hi, ${user.id}` : 'Personalize'}</h3>
                            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>✕</button>
                        </div>

                        <div className={styles.body}>
                            {!user?.id ? (
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
                                            value={user.profile?.softwareBackground || 'none'}
                                            onChange={(e) => handleUpdateProfile('softwareBackground', e.target.value)}
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
                                            value={user.profile?.learningGoal || 'general'}
                                            onChange={(e) => handleUpdateProfile('learningGoal', e.target.value)}
                                        >
                                            <option value="general">General Overview</option>
                                            <option value="build">Build a Robot</option>
                                            <option value="research">Academic Research</option>
                                        </select>
                                    </div>

                                    <div className={styles.footer}>
                                        <button className={styles.logoutBtn} onClick={handleLogout}>Sign Out</button>
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
