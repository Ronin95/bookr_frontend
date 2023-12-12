import * as React from "react";
import { Select, Value } from "baseui/select";
import { Textarea } from "baseui/textarea";
import { SIZE } from "baseui/input";
import { Button, SHAPE } from "baseui/button";
import axios from 'axios';
import './PDFChat.css';

type PDFFileOption = { label: string; id: string };

function PDFChat() {
    const [pdfFiles, setPdfFiles] = React.useState<PDFFileOption[]>([]);
    const [selectedFile, setSelectedFile] = React.useState<Value>([]);
    const [pdfSrc, setPdfSrc] = React.useState<string>('');
    const [textareaValue, setTextareaValue] = React.useState<string>('');
    const [selectedPdfId, setSelectedPdfId] = React.useState(null);

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(event.target.value);
    };

    React.useEffect(() => {
        console.log('Updated pdfSrc:', pdfSrc);
    }, [pdfSrc]);    

    React.useEffect(() => {
        fetch('http://127.0.0.1:8000/pdfUpload/split-pdfs/')
            .then(response => response.json())
            .then(data => {
                const options: PDFFileOption[] = data.map((file: string) => ({
                    label: file,
                    id: file,
                }));
                setPdfFiles(options);
            })
            .catch(error => console.error('Error fetching PDF files:', error));
    }, []);

    const handlePDFSelect = (params: any) => {
        setSelectedFile(params.value);
        if (params.value.length > 0) {
            const selectedPDF = params.value[0].id;
            localStorage.setItem('selectedSplitUpPDF', selectedPDF);
            
            const newPdfSrc = `http://127.0.0.1:8000/pdfUpload/split-pdfs/${selectedPDF}`;
            setPdfSrc(newPdfSrc);
    
            // Check if the entry already exists using the existing endpoint
            axios.get(`http://127.0.0.1:8000/pdfChat/textdata/${selectedPDF}`)
                .then(response => {
                    // Entry exists, handle accordingly
                    console.log('Entry already exists:', response.data);
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        // Entry does not exist, create a new one
                        axios.post('http://127.0.0.1:8000/pdfChat/textdata/', {
                            filename: selectedPDF,
                            user_messages: [],
                            ai_messages: []
                        }).then(response => {
                            console.log('New conversation entry created:', response.data);
                        }).catch(err => {
                            console.error('Error creating new conversation entry:', err);
                        });
                    } else {
                        console.error('Error checking for entry existence:', error);
                    }
                });
        } else {
            setPdfSrc('');
            setSelectedPdfId(null);
        }
    };
    

    const handleChatButtonClick = () => {
        // Retrieve the filename from localStorage
        const selectedFilename = localStorage.getItem('selectedSplitUpPDF');
    
        if (selectedFilename) {
            // GET request to find the ID based on the filename
            axios.get(`http://127.0.0.1:8000/pdfChat/textdata/${selectedFilename}`)
                .then(response => {
                    // Extract the ID from the response
                    const textDataId = response.data.id;
    
                    // PATCH request to update user_messages
                    axios.patch(`http://127.0.0.1:8000/pdfChat/textdata/update/${textDataId}/`, {
                        text_content: textareaValue
                    })
                    .then(updateResponse => {
                        console.log('Text updated:', updateResponse.data);
                        setTextareaValue('');
                    })
                    .catch(updateError => {
                        console.error('Error updating text:', updateError);
                    });
                })
                .catch(error => {
                    console.error('Error fetching text data:', error);
                });
        } else {
            console.log('No PDF selected');
        }
    };      
    
    
    return (
        <div>
            <div className='select-splitUp-PDF'>
                <Select
                    options={pdfFiles}
                    value={selectedFile}
                    placeholder="Select a PDF file"
                    onChange={handlePDFSelect}
                />
                {selectedFile.length > 0 && (
                    <Button
                        className="delete-ChatHistory"
                        size={SIZE.mini}
                        shape={SHAPE.pill}
                    >
                        Delete Chat history for this selected PDF
                    </Button>
                )}
            </div>
            <div className="view-pdf-chat">
                <div className="pdf-frame">
                    {pdfSrc && <iframe src={pdfSrc} style={{ width: '100%', height: '58vh' }} title="PDF Viewer" />}
                </div>
                {selectedFile.length > 0 && (
                    <div className="pdf-chat">
                        <div className="chat-overview">
                            <p>You: </p>
                            <p>AI: </p>
                        </div>
                        <div className="message-input">
                            <Textarea
                                value={textareaValue}
                                onChange={handleTextareaChange}
                                size={SIZE.compact}
                                placeholder="Chat with your selected PDF"
                                clearable
                            />
                            <Button
                                onClick={handleChatButtonClick}
                                size={SIZE.compact}
                                shape={SHAPE.pill}
                            >
                                Chat
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PDFChat;
