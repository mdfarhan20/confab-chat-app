import { Link } from "react-router-dom";
import { BsFillChatSquareTextFill as ChatIcon } from "react-icons/bs";

function NewChatOptions() {

    return (
        <div className="place-items-end absolute bottom-10 right-8 dui-dropdown dui-dropdown-top dui-dropdown-end">
                <div className="grid gap-2 place-items-end border-1 
                     dui-menu rounded-lg mb-4 p-2  w-fit dui-dropdown-content"
                >
                    <button 
                        className="text-white w-max font-medium rounded-md border-1 border-slate-900 bg-blue-400 dui-btn-sm"
                    ><Link to="/chat/new-chat">New Contact</Link></button>

                    <button
                        className="text-white w-full font-medium rounded-md border-1 border-slate-900 bg-blue-400 dui-btn-sm"
                    ><Link to="/chat/new-group">New Group</Link></button>
                </div>

            <button
                className="bg-blue-400 p-4 rounded-full hover:scale-105 duration-100 w-fit border-1 border-slate-900">
                <ChatIcon size="1.2rem" className="block fill-white" />
            </button>
        </div>
    )
}

export default NewChatOptions;