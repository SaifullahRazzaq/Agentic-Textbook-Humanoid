import React, { createContext, useState, useEffect, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuthenticated: false,
        name: 'Guest',
        preferences: {
            background: 'software',
            goal: 'general'
        }
    });

    useEffect(() => {
        const savedUser = localStorage.getItem('user-data');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (name) => {
        const newUser = { ...user, isAuthenticated: true, name };
        setUser(newUser);
        localStorage.setItem('user-data', JSON.stringify(newUser));
    };

    const logout = () => {
        const guestUser = { ...user, isAuthenticated: false, name: 'Guest' };
        setUser(guestUser);
        localStorage.setItem('user-data', JSON.stringify(guestUser));
    };

    const updatePreferences = (newPrefs) => {
        const updatedUser = { ...user, preferences: { ...user.preferences, ...newPrefs } };
        setUser(updatedUser);
        localStorage.setItem('user-data', JSON.stringify(updatedUser));
    };

    return (
        <UserContext.Provider value={{ user, login, logout, updatePreferences }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
