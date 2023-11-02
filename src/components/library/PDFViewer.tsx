import React, { useEffect } from 'react';
import axios from 'axios';

function PDFViewer({ filename }: {filename: any}) {
  useEffect(() => {
      if (filename) {
          axios.get(`http://127.0.0.1:8000/pdfUpload/pdf/${filename}/`, {
              responseType: 'blob',
          })
          .then(response => {
              const file = window.URL.createObjectURL(response.data);
              const iframe = document.querySelector('iframe');
              if (iframe) iframe.src = file;
          })
          .catch(error => {
              console.error('Error fetching PDF:', error);
          });
      }
  }, [filename]);

  return (
    <div>
      <iframe src="" style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}

export default PDFViewer;
