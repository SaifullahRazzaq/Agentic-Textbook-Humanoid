import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './RagChatbot.module.css';
import chatIndex from './chat-index.json';
import { executeSkill } from '../utils/SkillRegistry';

export default function RagChatbot({ isOpen, onClose }) {
    const [messages, setMessages] = useState([
        { text: 'Hello! Ask me anything about the textbook.', sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [selectedText, setSelectedText] = useState('');

    useEffect(() => {
        const handleSelection = () => {
            const text = window.getSelection().toString().trim();
            if (text && text.length > 10) {
                setSelectedText(text);
            } else {
                setSelectedText('');
            }
        };

        document.addEventListener('mouseup', handleSelection);
        return () => document.removeEventListener('mouseup', handleSelection);
    }, []);

    const findAnswer = (query, context) => {
        // If we have selected text context, prioritize it
        if (context) {
            return `**Analysis of selected text**: "${context.substring(0, 50)}..."\n\nBased on this selection, ${query.includes('explain') ? 'this concept refers to...' : 'this is important because...'}`;
        }

        const lowerQuery = query.toLowerCase();
        const keywords = lowerQuery.split(' ').filter(w => w.length > 3);

        let bestMatch = null;
        let maxScore = 0;

        chatIndex.forEach(section => {
            let score = 0;
            const contentLower = (section.title + ' ' + section.content).toLowerCase();

            keywords.forEach(keyword => {
                if (contentLower.includes(keyword)) {
                    score += 1;
                }
            });

            if (score > maxScore) {
                maxScore = score;
                bestMatch = section;
            }
        });

        if (maxScore > 0 && bestMatch) {
            // Construct a Docusaurus-friendly URL from the source field
            const docLink = bestMatch.source ? `/docs/${bestMatch.source}` : '#';
            return `**From [${bestMatch.title}](${docLink})**: ${bestMatch.content}`;
        }
        return "I couldn't find specific information about that in the textbook. Try asking about specific chapters or topics like 'sensors' or 'control'.";
    };

    const handleSend = () => {
        if (!input.trim() && !selectedText) return;

        // Check for Skill Command
        if (input.startsWith('/')) {
            const skillResult = executeSkill(input);
            if (skillResult) {
                setMessages(prev => [...prev, { text: input, sender: 'user' }]);
                setTimeout(() => {
                    setMessages(prev => [...prev, { text: skillResult, sender: 'bot' }]);
                }, 500);
                setInput('');
                return;
            }
        }

        const queryText = input || "Explain this selection";
        const userMessage = {
            text: selectedText ? `"${selectedText.substring(0, 30)}..." - ${queryText}` : queryText,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // If closed, open it (using onClose prop as a toggle)
        if (!isOpen) onClose();

        // Simulate network delay
        setTimeout(() => {
            const answer = findAnswer(queryText, selectedText);
            setMessages(prev => [...prev, { text: answer, sender: 'bot' }]);
            setIsTyping(false);
            setSelectedText(''); // Clear selection after asking
            window.getSelection().removeAllRanges();
        }, 800);
    };

    return (
        <>
            {selectedText && !isOpen && (
                <button
                    className={styles.selectionButton}
                    onClick={handleSend}
                >
                    Ask AI about selection 💬
                </button>
            )}

            <div className={clsx(styles.chatbotContainer, { [styles.open]: isOpen })}>
                <button className={styles.toggleButton} onClick={onClose}>
                    {isOpen ? '✕' : '💬'}
                </button>
                {isOpen && (
                    <div className={styles.chatWindow}>
                        <div className={styles.chatHeader}>
                            <h3>AI Tutor</h3>
                        </div>
                        <div className={styles.chatBody}>
                            {messages.map((msg, idx) => (
                                <div key={idx} className={clsx(styles.message, styles[msg.sender])}>
                                    {msg.text}
                                </div>
                            ))}
                            {isTyping && <div className={styles.typingIndicator}>Typing...</div>}
                        </div>

                        {selectedText && (
                            <div className={styles.contextPreview}>
                                <small>Selected: {selectedText.substring(0, 30)}...</small>
                                <button onClick={() => { setSelectedText(''); window.getSelection().removeAllRanges(); }}>✕</button>
                            </div>
                        )}

                        <div className={styles.chatInput}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder={selectedText ? "Ask about this selection..." : "Ask a question..."}
                            />
                            <button onClick={handleSend}>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
