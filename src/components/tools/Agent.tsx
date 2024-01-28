import React, { useState, useEffect } from "react";
import { Textarea } from "baseui/textarea";
import { Button, SHAPE } from 'baseui/button';
import { Spinner } from "baseui/spinner";
import axios from 'axios';
import './Agent.css';

interface Conversation {
    id: number;
    user_messages: string;
    agent_messages: string;
    timestamp: string; // or Date, if you convert it to a Date object
}
  

function Agent() {
    const [userInputValue, setUserInputValue] = useState("");
    const [aiResponse, setAIResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://127.0.0.1:8000/agent/userInput/');
                setConversations(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const saveUserInputForAgent = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setUserInputValue(event.target.value);
    };

    const sendToBackend = async () => {
        setIsLoading(true);
        console.log(userInputValue);

        try {
            const timestamp = new Date().toISOString();
            const response = await axios.post('http://127.0.0.1:8000/agent/userInput/', {
                user_messages: userInputValue,
                agent_messages: "",
                timestamp: timestamp
            });

            console.log(response.data);
            setAIResponse(response.data.agent_messages);
            setConversations([...conversations, response.data]);
        } catch (error) {
            console.error('There was an issue with the axios operation:', error);
        } finally {
            setIsLoading(false);
            setUserInputValue('');
        }
    };

    return (
        <div className="agent-user-style">
            <div className="user-agent-display">
                <div className="agent-output">
                    {conversations.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp)
                    .getTime())
                    .map(conversation => (
                        <div key={conversation.id}>
                            <p className="user-style">User Input: {conversation.user_messages}</p>
                            <p className="agent-style">Agent Output: {conversation.agent_messages}</p>
                        </div>
                    ))}
                </div>
                <div className="textarea-btn">
                    <Textarea
                        value={userInputValue}
                        onChange={saveUserInputForAgent}
                        placeholder="Give your AI Agent something to do..."
                        clearable
                    />
                    <Button 
                        shape={SHAPE.pill} 
                        className="btn-send"
                        onClick={sendToBackend}
                    >
                        Send
                    </Button>
                    {isLoading && <Spinner />}
                </div>
            </div>
        </div>
    );
}

export default Agent;
