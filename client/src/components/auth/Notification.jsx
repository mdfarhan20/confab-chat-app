
function Notification({ message, error }) {
    return (
        <li 
            className={`text-center font-semibold border-2 border-slate-900 text-white px-4 py-2 
            rounded-lg ${error ? "border-red-600 bg-red-300" : "border-blue-600 bg-blue-300"}`}
        >
            { message }
        </li>
    );
}

export default Notification