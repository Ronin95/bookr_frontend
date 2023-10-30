import React, { useState, useRef, useEffect } from "react";
import LibraryImg from '../../assets/img/library.png';
import DeletePDf from '../../assets/img/deletePDF.png';
import './LibraryStyle.css';
import { FileUploader } from "baseui/file-uploader";
import axios from 'axios';
import PDFViewer from "./PDFViewer";
import { Link, Routes } from "react-router-dom";
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';


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
    type FileObject = {
        id: number;
        file: any; name: string 
    };
    const [uploadedFiles, setUploadedFiles] = useState<FileObject[]>([]);
    const [fileCount, setFileCount] = useState(0);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/pdfUpload/count/')
            .then(response => {
                setFileCount(response.data.count);
            });
    }, [uploadedFiles]);

    function onDeleteFile(id: number) {
        axios.delete(`http://127.0.0.1:8000/pdfUpload/delete/${id}/`)
            .then(response => {
                setUploadedFiles((prevFiles: any[]) => prevFiles.filter((file: { id: number; }) => file.id !== id));
            });
    }

    function onFileUpload(acceptedFiles: (string | Blob)[]) {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);

        axios.post('http://127.0.0.1:8000/pdfUpload/upload/', formData)
            .then((response: any) => {
                console.log('File uploaded successfully');
                setUploadedFiles(prevFiles => [...prevFiles, response.data]);
            })
            .catch((error: any) => {
                console.error('There was an error uploading the file!', error);
            });
    }
    

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/pdfUpload/list/')
            .then(response => {
                setUploadedFiles(response.data);
            });
    }, []);

    useEffect(() => {
        if (errorMessage) {
            window.location.reload();
        }
    }, [errorMessage]);

    return (
        <div className="library-container">
            <div className='txt-logo-lib'>
                <img className='logo-lib' src={LibraryImg} alt="library-logo" />
                <h1>Library</h1>
                <div className="blue-line-lib"></div>
            </div>
            <div className="fileUploader-Viewer-style">
                <div className="fileUploader-style">
                    {fileCount < 3 ? (
                        <form method="post" encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
                            <FileUploader
                                onCancel={() => stopFakeProgress()}
                                onDrop={(acceptedFiles, rejectedFiles) => {
                                    if (acceptedFiles[0]?.type === 'application/pdf') {
                                        startFakeProgress();
                                        onFileUpload(acceptedFiles);
                                    } else {
                                        setErrorMessage('Please upload a PDF file only.');
                                    }
                                }}
                                progressAmount={progressAmount}
                                progressMessage={
                                    progressAmount
                                        ? `Uploading... ${progressAmount}% of 100%`
                                        : ''
                                }
                                errorMessage={errorMessage}
                            />
                        </form>
                    ) : null }
                    <h5>Choose PDF files only, otherwise page gets refreshed.</h5>
                    <div className="uploadedFiles-style">
                        {uploadedFiles.map((file: FileObject, index: number) => (
                            <div className="files-styles" key={index}>
                                <Link to={`/library/pdf/${file.file.split('/media/uploadedPDFs/')[1]}`}>
                                    {file.file.split('/media/uploadedPDFs/')[1]}
                                </Link>
                                <img 
                                    className="menu-img-style" 
                                    src={DeletePDf} 
                                    alt="delete-PDF" 
                                    onClick={() => onDeleteFile(file.id)}
                                />
                            </div>
                        ))}
                    </div>
                    {fileCount >= 3 && <h5>Only 3 PDFs possible for upload.</h5>}
                </div>
                <div className="PDFView">
                    <div className="view-pdf-style">
                        <Routes>
                            <Route path="/library/pdf/:filename" element={<PDFViewer />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Library;
