import { Link } from "react-router-dom";
import HeroImage from "components/auth/HeroImage";

function Home() {
    return (
        <main className="grow grid place-items-center max-w-screen">
            <div className="grid gap-12 items-center place-content-center my-12 mx-4 max-w-90 sm:w-3/4 md:w-full md:grid-cols-2 md:gap-6 md:m-0 xl:gap-16">
                <HeroImage />
                <section className="grid gap-8 text-center md:text-left md:h-fit md:gap-6 xl:gap-10">
                    <h1 className="text-3xl font-semibold md:text-4xl xl:text-5xl md:tracking-wider text-gray-800">
                        Contact and <span className="text-blue-400">Connect</span>
                    </h1>
                    <p className="px-4 md:p-0 text-gray-800 md:text-xl xl:w-3/4 xl:leading-8">This is simply a chat application for you to connect with anyone in the world who uses this app. Create an account or login to start chatting.</p>
                    <Link 
                        className="
                            w-fit border-2 border-blue-400 bg-blue-400 px-4 py-1 rounded-md text-white md:text-xl md:rounded-lg duration-100 hover:bg-transparent hover:text-blue-400 font-semibold place-self-center md:place-self-auto
                        "
                        to="/login"
                    >
                        Login
                    </Link>
                </section>
            </div>
        </main>
    );
}

export default Home;