import * as React from "react";
import { Textarea } from "baseui/textarea";
import {Button, SHAPE} from 'baseui/button';
import { Spinner } from "baseui/spinner";
import axios from 'axios';
import './Agent.css';

function Agent() {
    const [userInputValue, setUserInputValue] = React.useState("");

    const saveUserInputForAgent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInputValue(event.target.value);
    };

    const sendToBackend = async () => {
        console.log(userInputValue);  // Console logging the value

        try {
            const response = await axios.post('http://localhost:8000/agent/userInput/', {
                user_messages: [userInputValue], 
                agent_messages: []  
            });

            console.log(response.data);  // You can handle the response data as needed
        } catch (error) {
            console.error('There was a problem with the axios operation:', error);
        }
        setUserInputValue('');
    };

    return (
        <div>
            <h1>Rest Api Output - Rest Api Output - Rest Api Output - Rest Api Output</h1>
            <div className="user-agent-display">
                <div className="agent-output">
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
                </div>
            </div>
        </div>
    );

}

export default Agent;