import { useEffect, useState } from "react";

export  function useWindowSize  () {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })
    
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        const cleanUp = () => {
            console.log(" Will be called into action when the window size changes");
            window.removeEventListener('resize', handleResize);
        }

        return cleanUp;

        // return () => window.removeEventListener('resize', handleResize);;
    }, [])

    return windowSize;
}