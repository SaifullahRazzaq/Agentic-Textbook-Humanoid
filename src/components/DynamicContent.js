import React from 'react';
import { useUser } from '../contexts/UserContext';

export default function DynamicContent({ forBackground, forGoal, children }) {
    const { user } = useUser();
    const { background, goal } = user.preferences;

    if (forBackground && forBackground !== background) {
        return null;
    }

    if (forGoal && forGoal !== goal) {
        return null;
    }

    return (
        <div style={{
            borderLeft: '4px solid var(--ifm-color-primary)',
            paddingLeft: '1rem',
            margin: '1rem 0',
            backgroundColor: 'rgba(0, 212, 255, 0.05)',
            borderRadius: '0 8px 8px 0'
        }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--ifm-color-primary)', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                🎯 Personalized for {background === 'software' ? 'Software Engineers' : background}
            </div>
            {children}
        </div>
    );
}
