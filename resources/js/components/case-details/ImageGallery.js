import ImageViewer from "./ImageViewer";
import React, {useState} from "react";
import noImage from "../../../images/no-image.png";

const imgs = [{src: noImage}, {src: noImage}, {src: noImage}, {src: noImage}]

const ImageGallery = () => {
    const [currImage, setCurrImage] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    const closeImgsViewer = () => {
        setCurrImage(0)
        setIsOpen(false)
    }
    const gotoPrev = () => {
        setCurrImage(currImage - 1)
    }
    const gotoNext = () => {
        setCurrImage(currImage + 1)
    }

    return (
        <>
            {imgs.map((image, i) =>
                <img key={i} src={image.src} style={{height: 200, padding: 5}} alt={''} onClick={() => setIsOpen(true)}/>
            )}
            <ImageViewer
                imgs={imgs}
                closeImgsViewer={closeImgsViewer}
                gotoPrev={gotoPrev}
                gotoNext={gotoNext}
                currImg={currImage}
                isOpen={isOpen}
            />
        </>
    )
}

export default ImageGallery
