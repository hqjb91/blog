import React, { ReactNode, useEffect } from "react";
import { Box } from "@mui/material";

// This component adds a delay, 1 millisecond by default, to the visibility of all child components.
//
// Motivation:
// The reason this control was created is to wrap a masonry component that initially renders all items vertically (causing a scrollbar), before rendering them in masonry "rows," causing unacceptable flicker.
// There is a commonly known problem of FOUC (flash of unstyled content) where you see an initial rendering of your content before your stylesheets are downloaded.
// There is a similar problem that can happen with Javascript where visible elements on the page are rendered in script and take a moment to fully render.
// This can result in a flicker, sometimes causing a scrollbar to appear and go away, which then causes the whole page's width to be reduced momentarily causing further re-layout activity.
// This DelayedChild componet offres a solution that is probably not ideal but can be useful in certain circumstances.
//
// Functionality:
// This component works by rendering its child components inside a box that is initially set to be invisible and to have a small fixed height and scrollbar 
// so even if the content is "tall" it will just scroll inside this small heigh box and not cause the main browser window to need a scrollbar.
// We do this so that the fixed height box itself will be very unlikely to cause any flicker (e.g. if its content was so tall that it caused a vertical scrollbar be required).
// It is important that we make the child components "invisible" with visibility rather than display: none so that they actually render on the page, allowing the Javascript to do its rendering work.
// Once the delay has finished, and in theory all code in the child components is complete, we remove the fixed height and vertical overflow / scroll behavior and set the box to be visible again.
// 
// Limitations:
// We don't know how long of a delay is required and in theory if we don't wait long enough for the script to complete its work, our approach won't work.
// However, we only set a 1 ms delay and have not had any issues.
// 
// Future Development:
// Perhaps make the delay a property of the component that the parent can set.
const DelayedChild = (props: { children: ReactNode }) => {

    const delayTime: number = 1;
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    const [shouldRenderChild, setShouldRenderChild] = React.useState(false);

    useEffect(() => {
        delay(delayTime).then(() => {
            setShouldRenderChild(true);
        });
    });

    return (
        <>
            {(() => {
                if (!shouldRenderChild) {
                    return ( // Note: height 10 works but height 1 does not. Even 2 works but putting at 10 in case it might be some browser dependent thing where it says "well, this is too small we're not going to bother to try to render anything here."
                        <Box sx={{ visibility: 'hidden', height: 10, overflowY: 'scroll' }}>
                            {props.children}
                        </Box>
                    );
                } else {
                    return (
                        <Box sx={{ visibility: 'visible' }}>
                            {props.children}
                        </Box>
                    );
                }
            })()}
        </>
    );
}

export default DelayedChild;