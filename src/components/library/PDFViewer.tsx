import React, { useEffect } from 'react';
import axios from 'axios';

/**
 * The `function PDFViewer({ filename }: {filename: any}) {` is defining a functional component called `PDFViewer`. It
 * takes an object as a parameter with a property called `filename` of type `any`. This object is destructured in the
 * function signature to directly access the `filename` property.
 * 
 * @function
 * @name PDFViewer
 * @kind function
 * @param {{ filename: any }} { filename }
 * @returns {JSX.Element}
 */
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
