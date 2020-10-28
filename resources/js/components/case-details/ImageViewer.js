import React from 'react'
import ImgsViewer from 'react-images-viewer'

const ImageViewer = (props) => {
    return (
        <ImgsViewer
            imgs={props.imgs}
            currImg={props.currImg}
            isOpen={props.isOpen}
            onClickPrev={props.gotoPrev}
            onClickNext={props.gotoNext}
            onClose={props.closeImgsViewer}
        />
    )
}

export default ImageViewer
