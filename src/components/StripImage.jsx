import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImageEditModalState } from "../redux/comicPanelSlice";
import './StripImage.css';

export default function StripImage({ idx }) {
    let dispatch = useDispatch();

    const comicPanelState = useSelector((state) => state.comicPanel);

    function toggleModal() {
        console.log(idx);
        dispatch(toggleImageEditModalState(idx));
    }

    return <div class="w-[20%] rounded overflow-hidden inline-block m-0 border border-black-900 overflow-hidden mx-1 mt-1" onClick={toggleModal}>
        <div class="relative">
            <img src={comicPanelState.stripImages[idx].imageURL} alt="Image" class="w-full h-full object-cover hover:opacity-70 hover:cursor-pointer" />
            {
                comicPanelState.stripImages[idx].text.length !== 0 ? <div class="absolute bottom-0 w-full text-center font-comic text-base sm:text-lg md:text-xl lg:text-2xl text-white bg-black bg-opacity-50">
                    <p>{comicPanelState.stripImages[idx].text}</p>
                </div> : null
            }
        </div>
    </div>;
}