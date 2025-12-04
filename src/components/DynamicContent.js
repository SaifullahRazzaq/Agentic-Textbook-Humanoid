import React from 'react';
import { useAuthClient } from '@theme/Root'; // Import useAuthClient from Root.js

export default function DynamicContent({ forBackground, forGoal, children }) {
    const authClient = useAuthClient(); // Get authClient from context
    const { data: session, isPending } = authClient.useSession();
    const user = session?.data;

    if (isPending || !user || !user.profile) {
        return null; // Or render a loading state/default content
    }

    const { softwareBackground, learningGoal } = user.profile;

    if (forBackground && forBackground !== softwareBackground) {
        return null;
    }

    if (forGoal && forGoal !== learningGoal) {
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
                🎯 Personalized for {softwareBackground === 'software' ? 'Software Engineers' : softwareBackground}
            </div>
            {children}
        </div>
    );
}
