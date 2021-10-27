import React from 'react';
import KladrAutocomplete from './KladrAutocomplete';
import fetchJsonp from 'fetch-jsonp';
import { kladrToken } from '../helpers';
import { useThrottle } from '../hooks/useThrottle';

export default {
    title: 'Example/KladrAutocomplete',
    component: KladrAutocomplete,
};

const fetchKladrItems = (query, beforeFetch, afterFetch, successCallback) => {
    beforeFetch();

    fetchJsonp(
        `https://kladr-api.ru/api.php&token=${kladrToken}&contentType=building&oneString=true&limit=10&query=${query}`,
        {
            jsonCallbackFunction: 'callback',
        }
    )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const results = data.result ?? [];
            successCallback(results);
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => afterFetch());
};

const Template = (args) => {
    const [value, setValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e, value) => {
        setValue(value);
    };
    console.log('value', value);

    React.useEffect(() => {
        fetchKladrItems(
            '',
            () => setLoading(true),
            () => setLoading(false),
            (data) => setOptions(data)
        );
    }, []);

    const loadingCallback2 = (e) => {
        console.log(e.target.value);
        fetchKladrItems(
            e.target.value,
            () => setLoading(true),
            () => setLoading(false),
            (data) => setOptions(data)
        );
    };

    const throttledKladrFetch = useThrottle(loadingCallback2, 2000);

    return (
        <KladrAutocomplete
            {...args}
            // value={value}
            options={options}
            handleChange={handleChange}
            loading={loading}
            handleInput={throttledKladrFetch}
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.fullName}
        />
    );
};

export const Main = Template.bind({});
Main.args = {
    user: {},
};
