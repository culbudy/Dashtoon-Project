import html2canvas from "html2canvas";
import { toast } from "react-toastify";


export default function ComicDownload() {
    async function downloadComicStrip() {
        let imageElement = document.getElementById("strip-panel");
        console.log(imageElement);
        const canvas = await html2canvas(imageElement);
        const dataURL = canvas.toDataURL("image/png", 1.0);
        console.log(dataURL);
        const link = document.createElement('a');
        link.href = dataURL;
        link.setAttribute('download', 'strip-comic.png');
        link.click();
        URL.revokeObjectURL(dataURL);
    }
    return <>
        <button class="mt-10 mb-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" onClick={downloadComicStrip}>
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Download
            </span>
        </button>
    </>;
}