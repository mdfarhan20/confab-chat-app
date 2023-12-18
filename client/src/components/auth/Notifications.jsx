import { useContext } from "react";
import AppContext from "context/AppContext";
import Notification from "components/auth/Notification";

function Notifications() {
    const { notifications } = useContext(AppContext);

    return (
        <ul className="absolute grid gap-4 left-1/2 -translate-x-1/2 top-20 w-3/4 z-20">
            { notifications.map((notifictation, index) => (
                <Notification 
                    key={index} 
                    message={notifictation.message}
                    error={notifictation.error} 
                /> 
            )) }
        </ul>
    );
}

export default Notifications;