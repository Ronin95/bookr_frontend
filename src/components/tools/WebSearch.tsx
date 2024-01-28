import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import './WebSearch.css';
import axios from 'axios';

function WebSearch() {
    const [searchValue, setSearchValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [searchPerformed, setSearchPerformed] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState({
        exa_result: '',
        wikipedia_result: '',
        duckduckgo_result: ''
    });

    const handleSearch = () => {
        setIsLoading(true);
        setSearchPerformed(true); // Set search performed to true
        axios.post('http://127.0.0.1:8000/websearch/userSearch/', { user_search: searchValue })
            .then(response => {
                fetchLatestResult(); // Fetch the latest result after POST request
            })
            .catch(error => {
                console.error('There was an error!', error);
                setIsLoading(false);
            });
    };
    

    const fetchLatestResult = () => {
        axios.get('http://127.0.0.1:8000/websearch/userSearch/')
            .then(response => {
                if (response.data && response.data.length > 0) {
                    // Assuming the response is an array of entries sorted by 'id' descending
                    const latestResult = response.data[0]; // Get the first (latest) entry
                    setSearchResults(latestResult);
                } else {
                    console.log('No search results found.');
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching latest result:', error);
                setIsLoading(false);
            });
    };    

    return (
        <div>
            <div className='search-btn-style'>
                <div className='search-style'>
                    <FormControl label="What is your heart seaching for?">
                        <Input
                            id="text-value"
                            value={searchValue}
                            onChange={event => setSearchValue(event.currentTarget.value)}
                        />
                    </FormControl>
                </div>
                <div>
                    <Button onClick={handleSearch}>Search</Button>
                    {isLoading && <p>Searching...</p>}
                </div>
            </div>
            {!isLoading && searchPerformed && (
                <div className='search-results-displayed'>
                    <div className="exa-style">
                        <p>Exa Search Results: {searchResults.exa_result.replace("content='", '')}</p>
                    </div>
                    <div className="wiki-style">
                        <p>Wikipedia Results: {searchResults.wikipedia_result}</p>
                    </div>
                    <div className="duckduckgo-style">
                        <p>DuckDuckGo Search Results: {searchResults.duckduckgo_result}</p>
                    </div>
                </div>
            )}
        </div>
    );

}

export default WebSearch;