import * as React from 'react';
import {FormControl} from 'baseui/form-control';
import {Textarea} from 'baseui/textarea';
import { Button } from "baseui/button";
import './WebSearch.css';
import axios from 'axios';

function WebSearch() {
    const [searchValue, setSearchValue] = React.useState('');

    const handleSearch = () => {
        axios.post('http://127.0.0.1:8000/websearch/userSearch/', { user_search: searchValue })
             .then(response => {
                 console.log(response);
             })
             .catch(error => {
                 console.error('There was an error!', error);
             });
        setSearchValue('');
    };    

    return (
        <div>
            <div className='search-btn-style'>
                <div className='search-style'>
                    <FormControl label="What is your heart seaching for?">
                        <Textarea
                            id="textarea-id"
                            value={searchValue}
                            onChange={event => setSearchValue(event.currentTarget.value)}
                        />
                    </FormControl>
                </div>
                <div>
                    <Button onClick={handleSearch}>Search</Button>
                    <p>Loading...</p>
                </div>
            </div>
            <div className='search-results-displayed'>
                <div className="bstyle">
                    <p>Exa Search Results</p>
                </div>
                <div className="bstyle">
                    <p>Wikipedia Results</p>
                </div>
                <div className="bstyle">
                    <p>DuckDuckGo Search Results</p>
                </div>
            </div>
        </div>
    );

}

export default WebSearch;