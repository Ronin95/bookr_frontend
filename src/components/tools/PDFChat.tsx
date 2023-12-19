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

    /**
     * The `handleTextareaChange` function is an event handler that is called when the value of the textarea input changes. It
     * takes an event object as a parameter, which contains information about the event that triggered the function. In this
     * case, the event object is of type `React.ChangeEvent<HTMLTextAreaElement>`, which means it is specifically for textarea
     * elements.
     * 
     * @function
     * @name handleTextareaChange
     * @kind variable
     * @memberof PDFChat
     * @param {React.ChangeEvent<HTMLTextAreaElement>} event
     * @returns {void}
     */
    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(event.target.value);
    };

    /**
     * The `React.useEffect(() => { ... })` hook is used to perform side effects in a functional component. It allows you to
     * run code in response to certain events, such as when the component mounts, when specific dependencies change, or when
     * the component unmounts. In this specific case, the `useEffect` hook is used to fetch the split up PDF files from the
     * server and update the `pdfFiles` state with the fetched data. The `useEffect` hook is only executed once, when the
     * component mounts, because an empty dependency array `[]` is passed as the second argument.
     * 
     */
    React.useEffect(() => {
        console.log('Updated pdfSrc:', pdfSrc);
    }, [pdfSrc]);    

    /**
     * The `React.useEffect(() => { ... })` hook is used to perform side effects in a functional component. It allows you to
     * run code in response to certain events, such as when the component mounts, when specific dependencies change, or when
     * the component unmounts.
     * In this case it only accesses the split up pdf files from the library
     */
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
    
            axios.get(`http://127.0.0.1:8000/pdfChat/textdata/${selectedPDF}`)
                .then(response => {
                    // Entry exists, process PDF text
                    processPDFText(selectedPDF);
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        // Entry does not exist, create a new one
                        axios.post('http://127.0.0.1:8000/pdfChat/textdata/', {
                            filename: selectedPDF,
                            user_messages: [],
                            ai_messages: [],
                            text_chunks: []
                        }).then(response => {
                            // Now process PDF text
                            processPDFText(selectedPDF);
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
    
    /**
     * The `processPDFText` function is responsible for creating `text_chunks` from the selected PDF. It takes the `pdfId` as a
     * parameter, which represents the ID of the selected PDF file.
     * 
     * @function
     * @name processPDFText
     * @kind variable
     * @memberof PDFChat
     * @param {any} pdfId
     * @returns {void}
     */
    const processPDFText = (pdfId: any) => { // create text_chunks from the selected PDF
        axios.post(`http://127.0.0.1:8000/pdfChat/process_pdf/${pdfId}/`)
            .then(response => {
            })
            .catch(error => {
                console.error('Error processing PDF text:', error);
            });
    };
    
    

    const handleChatButtonClick = () => {
        // Retrieve the filename from localStorage
        const selectedFilename = localStorage.getItem('selectedSplitUpPDF');
    
        if (selectedFilename) {
            // GET request to find the ID and current user_messages based on the filename
            axios.get(`http://127.0.0.1:8000/pdfChat/textdata/${selectedFilename}`)
                .then(response => {
                    // Extract the ID and current user_messages from the response
                    const textDataId = response.data.id;
                    const currentUserMessages = response.data.user_messages || [];
    
                    // Append the new message to the current user_messages
                    const updatedUserMessages = [...currentUserMessages, textareaValue];
    
                    // PATCH request to update user_messages
                    axios.patch(`http://127.0.0.1:8000/pdfChat/textdata/update/${textDataId}/`, {
                        user_messages: updatedUserMessages
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
