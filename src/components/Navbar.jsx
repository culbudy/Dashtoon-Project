import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Navbar() {
    return <>
        <ToastContainer />
        <nav class="bg-white border-gray-200 dark:bg-gray-900">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Dashtoon Assignment</span>
                </a>
            </div>
        </nav>
        <Outlet />
    </>;
}