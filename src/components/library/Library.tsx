import React, { useState, useRef, useEffect } from "react";
import LibraryImg from '../../assets/img/library.png';
import DeletePDf from '../../assets/img/deletePDF.png';
import './LibraryStyle.css';
import { FileUploader } from "baseui/file-uploader";

function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function useFakeProgress(): [number, () => void, () => void] {
    const [fakeProgress, setFakeProgress] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);

    function stopFakeProgress() {
        setIsActive(false);
        setFakeProgress(0);
    }

    function startFakeProgress() {
        setIsActive(true);
    }

    useInterval(() => {
        if (fakeProgress >= 100) {
            stopFakeProgress();
        } else {
            setFakeProgress(fakeProgress + 10);
        }
    }, isActive ? 500 : null);

    return [fakeProgress, startFakeProgress, stopFakeProgress];
}

function Library() {
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [progressAmount, startFakeProgress, stopFakeProgress] = useFakeProgress();

    return (
        <div className="library-container">
            <div className='txt-logo-lib'>
                <img className='logo-lib' src={LibraryImg} alt="library-logo" />
                <h1>Library</h1>
                <div className="blue-line-lib"></div>
            </div>
            <div className="fileUploader-Viewer-style">
                <div className="fileUploader-style">
                    <FileUploader
                        onCancel={() => stopFakeProgress()}
                        onDrop={(acceptedFiles, rejectedFiles) => {
                            startFakeProgress();
                        }}
                        progressAmount={progressAmount}
                        progressMessage={
                            progressAmount
                                ? `Uploading... ${progressAmount}% of 100%`
                                : ''
                        }
                        errorMessage={errorMessage}
                    />
                    <div className="uploadedFiles-style">
                        <div className="files-styles">
                            <h2>Only</h2>
                            <img className="menu-img-style" src={DeletePDf} alt="delete-PDF" />
                        </div>
                        <div className="files-styles">
                            <h2>3 files</h2>
                            <img className="menu-img-style" src={DeletePDf} alt="delete-PDF" />
                        </div>
                        <div className="files-styles">
                            <h2>allowed</h2>
                            <img className="menu-img-style" src={DeletePDf} alt="delete-PDF" />
                        </div>
                    </div>
                </div>
                <div className="PDFView">
                    <div className="view-pdf-style">
                        <h1>VIEW</h1>
                        <h1>PDF</h1>
                        <h1>FILE</h1>
                        <h1>HERE</h1>
                        <h1>Teswert</h1>
                        <h1>Test</h1>
                        <h1>Tesasdft</h1>
                        <h1>Testdf</h1>
                        <h1>-----------------</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Library;
