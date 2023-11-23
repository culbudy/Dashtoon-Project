import { useRef ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSubmitClick, toggleImageEditModalState } from "../redux/comicPanelSlice";
import Navbar from "../components/Navbar";
import ComicDownload from "../components/Download";
import StripPanel from "../components/StripPanel";
import Modal from 'react-modal';


export default function CreateComic() {
    const comicPanelState = useSelector((state) => state.comicPanel);
    const [buttonText,setButtonText] = useState("Confirm");
    let dispatch = useDispatch();
    let promptRef = useRef(null), textRef = useRef(null);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    function closeModal() {
        setButtonText("Confirm");
        dispatch(toggleImageEditModalState(comicPanelState.currIdx));
    }

    
    async function onSubmit(event) {
        console.log(promptRef.current.value);
        console.log(textRef.current.value);
        setButtonText("Image Generating ...");
        document.getElementById('buttonId').disabled = true;
        document.getElementById('cancelButton').disabled = true;
        document.getElementById('buttonId').style.backgroundColor="#4e9df2";
        document.getElementById('cancelButton').style.backgroundColor="#4e9df2";
        
        const response = await fetch(
            "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
            {
                headers: {
                    Accept: "image/png",
                    Authorization: "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ "inputs": promptRef.current.value }),
            }
        );
        const result = await response.blob();

        let url = URL.createObjectURL(result);
        // let url='/imagePlaceholder.png';
        dispatch(onSubmitClick({ prompt: promptRef.current.value, text: textRef.current.value, url: url }));
        closeModal();
    }

    return <div>
        <Navbar />
        <Modal
            isOpen={comicPanelState.imageEditModalState}
            onRequestClose={closeModal}
            style={customStyles}>
            <div>
                <div class="pt-2 pb-2 float-right absolute right-3 top-1">
                    <button onClick={closeModal} id="cancelButton" class="bg-blue-500 hover:bg-blue-700 py-1 px-1 text-white font-bold rounded focus:outline-none focus:shadow-outline"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"> <path d="M6 18L18 6M18 18L6 6" />
                    </svg></button>
                </div>
                <form class="bg-white rounded px-8 pb-5 mb-0 mt-5">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-md font-bold mb-2" for="username">
                            Prompt
                        </label>
                        <input ref={promptRef} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " id="prompt" type="text" placeholder="Enter the prompt" autoComplete="off" />
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-md font-bold mb-2" for="username">
                            Scene Text
                        </label>
                        <input ref={textRef} maxlength="20" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="strip-text" type="text" placeholder="Enter the text" autoComplete="off" />
                    </div>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline" id="buttonId" type="button" onClick={onSubmit}>
                            {buttonText}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
        <div id="strip-panel">
            <StripPanel />
        </div>
        <ComicDownload/>
    </div>;
}