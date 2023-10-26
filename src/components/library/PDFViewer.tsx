import React, { useEffect } from 'react';
import './PDFViewerStyle.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function PDFViewer() {
    const { filename } = useParams();
    const fileUrl = `http://127.0.0.1:8000/media/uploadedPDFs/${filename}`;
    return (
        <div>
            <embed src={fileUrl} type="application/pdf" width="100%" height="600px" />
        </div>
    );
}

export default PDFViewer;
