import { useRef, useState } from "react";
import StripImage from "./StripImage";

export default function StripPanel() {
    let placingArray = [3,2,3,2];

    let cnt = 0;

    return <div class="mx-auto mt-4 strip-panel">
        {/* {stripImages} */}
        {placingArray.map((k, index) => {
            return <div key={index} class="w-full mx-auto">
                {Array.from({ length: k }, (value, index) => {
                    ++cnt;
                    return <StripImage idx={cnt-1}/>;
                })}
            </div>;
        })}
    </div>;
}