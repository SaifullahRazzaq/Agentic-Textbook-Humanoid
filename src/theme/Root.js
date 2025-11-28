import React from 'react';
import RagChatbot from '@site/src/components/RagChatbot';
import PersonalizationPanel from '@site/src/components/PersonalizationPanel';
import { UserProvider } from '@site/src/contexts/UserContext';

// Default implementation, that you can customize
export default function Root({ children }) {
    return (
        <UserProvider>
            {children}
            <RagChatbot />
            <PersonalizationPanel />
        </UserProvider>
    );
}
