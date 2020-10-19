import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import ImageViewer from 'react-simple-image-viewer';
import noImage from '../../../images/no-image.png'

function App() {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const images = [
        noImage
    ];

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    return (
        <div>
            {/*{images.map((src, index) => (*/}
            {/*    <img*/}
            {/*        src={ src }*/}
            {/*        onClick={ () => openImageViewer(index) }*/}
            {/*        width="300"*/}
            {/*        key={ index }*/}
            {/*        style={{ margin: '2px' }}*/}
            {/*        alt=""/>*/}
            {/*))}*/}
            <img
                src={ images[0] }
                onClick={ () => openImageViewer(0) }
                key={ index }
                style={{ margin: '2px', maxWidth: '100%', maxHeight: '100%', }}
                alt=""/>
            {isViewerOpen && (
                <ImageViewer
                    src={ images }
                    currentIndex={ currentImage }
                    onClose={ closeImageViewer }
                />
            )}
        </div>
    );
}

export default App
