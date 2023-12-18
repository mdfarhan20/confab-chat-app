import App from "App";
import { useState, createContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (message, error=false) => {
        setNotifications(prev => [{ message, error }, ...prev]);
        setTimeout(() => setNotifications(prev => prev.slice(0, prev.length - 1)), 3000);
    }

    return (
        <AppContext.Provider value={{ notifications, addNotification }} >
            { children }
        </AppContext.Provider>
    );
}

export default AppContext;