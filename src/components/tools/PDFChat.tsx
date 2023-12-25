import * as React from "react";
import { Select, Value } from "baseui/select";
import { Textarea } from "baseui/textarea";
import { SIZE } from "baseui/input";
import { Button, SHAPE } from "baseui/button";
import { Spinner } from "baseui/spinner";
import axios from 'axios';
import './PDFChat.css';

type PDFFileOption = { label: string; id: string };

function PDFChat() {
    interface ChatMessage {
        sender: string;
        message: string;
        timestamp: string;
    }

    const [pdfFiles, setPdfFiles] = React.useState<PDFFileOption[]>([]);
    const [selectedFile, setSelectedFile] = React.useState<Value>([]);
    const [pdfSrc, setPdfSrc] = React.useState<string>('');
    const [textareaValue, setTextareaValue] = React.useState<string>('');
    const [selectedPdfId, setSelectedPdfId] = React.useState(null);
    const [isSpinnerVisible, setIsSpinnerVisible] = React.useState(false);
    const [chatHistory, setChatHistory] = React.useState<ChatMessage[]>([]);


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
        fetchChatHistory();
        setSelectedFile(params.value);
        if (params.value.length > 0) {
            const selectedPDF = params.value[0].id;

            // Clear current chat history and fetch new
            setChatHistory([]);

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
                            text_chunks: [],
                            chat_history: []
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
            fetchChatHistory();
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

    const handleDelete = async () => {
        const selectedFilename = localStorage.getItem('selectedSplitUpPDF');
        if (selectedFilename) {
            try {
                // Updated URL to match your Django server's endpoint
                await axios.delete('http://127.0.0.1:8000/pdfChat/api/delete-pdf', { data: { filename: selectedFilename } });
                // Handle success (e.g., show a success message or update the state)
            } catch (error) {
                // Handle error (e.g., show an error message)
            }
        } else {
            // Handle case where no filename is found in localStorage
        }
        window.location.reload();
    };
    
    
    const handleChatButtonClick = () => {
        setIsSpinnerVisible(true);

        // Retrieve the filename from localStorage
        const selectedFilename = localStorage.getItem('selectedSplitUpPDF');

        if (selectedFilename) {
            // GET request to find the ID and current user_messages based on the filename
            axios.get(`http://127.0.0.1:8000/pdfChat/textdata/${selectedFilename}`)
                .then(response => {
                    // Extract the ID and current user_messages from the response
                    const textDataId = response.data.id;
                    const currentUserMessages = response.data.user_messages || [];
                    const currentChatHistory = response.data.chat_history || [];

                    const newUserMessage = {
                        sender: "user",
                        message: textareaValue,
                        timestamp: new Date().toISOString() // Optionally add a timestamp
                    };
    
                    // Append the new message to the current user_messages and create a new chat history entry
                    const updatedUserMessages = [...currentUserMessages, textareaValue];
                    const updatedChatHistory = [...currentChatHistory, newUserMessage];
    
                    // PATCH request to update user_messages and chat_history
                    axios.patch(`http://127.0.0.1:8000/pdfChat/textdata/update/${textDataId}/`, {
                        user_messages: updatedUserMessages,
                        chat_history: updatedChatHistory
                    })
                    .then(updateResponse => {
                        console.log('Text updated:', updateResponse.data);
                        setTextareaValue('');

                        // Trigger AI Response
                        handleAIResponse();

                        // fetch Data from chat_history
                        fetchChatHistory();
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


    const handleAIResponse = () => {
        const selectedFilename = localStorage.getItem('selectedSplitUpPDF');
    
        if (selectedFilename) {
            axios.get(`http://127.0.0.1:8000/pdfChat/textdata/${selectedFilename}`)
                .then(response => {
                    const textChunks = response.data.text_chunks;
                    const textDataId = response.data.id;
                    let currentChatHistory = response.data.chat_history || [];
    
                    const lastUserInput = response.data.user_messages[response.data.user_messages.length - 1]; // Get the last user input
    
                    axios.post('http://127.0.0.1:8000/pdfChat/ai-answer/', {
                        text_chunks: textChunks,
                        user_input: lastUserInput
                    })
                    .then(aiResponse => {
                        const aiMessage = aiResponse.data.ai_message;

                        const newAIMessage = {
                            sender: "ai",
                            message: aiMessage,
                            timestamp: new Date().toISOString() // Optionally add a timestamp
                        };
        
                        const updatedChatHistory = [...currentChatHistory, newAIMessage];
    
                        // PATCH request to update ai_messages and chat_history
                        axios.patch(`http://127.0.0.1:8000/pdfChat/textdata/update/${textDataId}/`, {
                            ai_messages: [...response.data.ai_messages, aiMessage],
                            chat_history: updatedChatHistory
                        })
                        .then(updateResponse => {
                            fetchChatHistory();
                            setIsSpinnerVisible(false);
                            console.log('AI Text updated:', updateResponse.data);
                        })
                        .catch(updateError => {
                            fetchChatHistory();
                            setIsSpinnerVisible(false);
                            console.error('Error updating AI text:', updateError);
                        });
                    })
                    .catch(aiAnswerError => {
                        console.error('Error in AI answer:', aiAnswerError);
                    });
                })
                .catch(error => {
                    console.error('Error fetching text chunks:', error);
                });
        } else {
            console.log('No PDF selected');
        }
    };
    
    // Function to fetch chat history
    const fetchChatHistory = async () => {
        const selectedFilename = localStorage.getItem('selectedSplitUpPDF');
        if (selectedFilename) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/pdfChat/textdata/${selectedFilename}`);
                console.log('New chat history:', response.data.chat_history); // Add this to check the fetched data
                setChatHistory(response.data.chat_history || []);
            } catch (error) {
                console.error('Error fetching chat history:', error);
                // window.location.reload();
                fetchChatHistory();
            }
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
                    <>
                        <Button
                            className="delete-ChatHistory"
                            size={SIZE.mini}
                            shape={SHAPE.pill}
                            onClick={handleDelete}
                        >
                            Delete Chat history for this selected PDF
                        </Button>
                        {isSpinnerVisible && <Spinner />}
                    </>
                )}
            </div>
            <div className="view-pdf-chat">
                <div className="pdf-frame">
                    {pdfSrc && <iframe src={pdfSrc} style={{ width: '100%', height: '58vh' }} title="PDF Viewer" />}
                </div>
                {selectedFile.length > 0 && (
                    <div className="pdf-chat">
                        <div className="chat-overview">
                            {chatHistory.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                                .map((message, index) => (
                                    <div key={message.timestamp + index}> {/* Use a combination of timestamp and index */}
                                        {message.sender === "user" ? (
                                            <p>You: {message.message}</p>
                                        ) : (
                                            <p>AI: {message.message.replace(/\n\n/g, '')}</p>
                                        )}
                                    </div>
                            ))}
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
