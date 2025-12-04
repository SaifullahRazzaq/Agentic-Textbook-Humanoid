import React, { useRef, useEffect, useState } from 'react';
import RagChatbot from '@site/src/components/RagChatbot';
import PersonalizationPanel from '@site/src/components/PersonalizationPanel';
import { createAuthClient } from 'better-auth/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Create React contexts
const AuthClientContext = React.createContext(undefined);
const ChatbotContext = React.createContext({ isChatbotOpen: false, toggleChatbot: () => {} }); // Provide a default value with shape

// Default implementation, that you can customize
export default function Root({ children }) {
    const { siteConfig } = useDocusaurusContext();
    const { betterAuthBaseURL } = siteConfig.customFields;
    const authClientRef = useRef(null);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [authClientLoaded, setAuthClientLoaded] = useState(false); // New state to track authClient loading

    // Initialize authClient only once after component mounts
    useEffect(() => {
        if (!authClientRef.current && typeof window !== 'undefined' && betterAuthBaseURL) {
            authClientRef.current = createAuthClient({
                baseURL: betterAuthBaseURL,
            });
            setAuthClientLoaded(true); // Set loaded to true after initialization
        }

        // Cleanup function (if better-auth provides a destroy method for the client)
        return () => {
            // if (authClientRef.current && typeof authClientRef.current.destroy === 'function') {
            //     authClientRef.current.destroy();
            // }
            authClientRef.current = null;
        };
    }, [betterAuthBaseURL]); // Re-create client if baseURL changes (unlikely in Docusaurus)

    if (!authClientLoaded) {
        // Render a fallback or loading state if authClient is not yet available
        // For Docusaurus, returning null or a simple loading spinner might be appropriate
        return null; // Or a loading spinner, depending on desired UX
    }

    const toggleChatbot = () => {
        setIsChatbotOpen(prev => !prev);
    };

    return (
        <AuthClientContext.Provider value={authClientRef.current}>
            <ChatbotContext.Provider value={{ isChatbotOpen, toggleChatbot }}>
                {children}
                <RagChatbot isOpen={isChatbotOpen} onClose={toggleChatbot} />
                <PersonalizationPanel />
            </ChatbotContext.Provider>
        </AuthClientContext.Provider>
    );
}

// Custom hook to use the authClient
export const useAuthClient = () => {
    const context = React.useContext(AuthClientContext);
    if (context === undefined) {
        throw new Error('useAuthClient must be used within an AuthClientContext.Provider');
    }
    return context;
};

// Custom hook to use the chatbot state and toggle function
export const useChatbot = () => {
    const context = React.useContext(ChatbotContext);
    if (context === undefined) {
        throw new Error('useChatbot must be used within a ChatbotContext.Provider');
    }
    return context;
};
