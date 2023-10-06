import React, {useState} from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions} from '../../api';

const Search = ({onSearchChange}) =>{

const[search, setSearch] = useState(null);

const loadOptions = (inputValue) => {
    return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
    .then((response) => response.json())
    .then((response) => {
        return {
            options: response.data.map((city) => {
                return{
                    value: `${city.latitude} ${city.longitude}`, 
                    label: `${city.name}, ${city.countryCode}`,
                    
                }
            })
        }
    })
    .catch((err) => console.error(err));
    };

const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData)
};

    return (
        <AsyncPaginate
        placeholder= "Search for city"
        debounceTimeout={600}
        value = {search}
        onChange = {handleOnChange}
        loadOptions = {loadOptions}//method loadOptions help retrieves data and appear on search as soon as the prefix is written. for ex, whentyped lon for lon, every country starting that name will appear
      
        />
    )
}

export default Search;