import React from 'react';
import KladrAutocomplete from './KladrAutocomplete';
import fetchJsonp from 'fetch-jsonp';
import { kladrToken } from '../helpers';
import { useThrottle } from '../hooks/useThrottle';

export default {
    title: 'Example/KladrAutocomplete',
    component: KladrAutocomplete,
};

const fetchItems = (beforeFetch, afterFetch, successCallback) => {
    beforeFetch();
    fetch(`https://jsonplaceholder.typicode.com/todos`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            successCallback(data);
        })
        .catch((e) => {
            console.log(e);
        })
        .finally(() => afterFetch());
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
        // fetchItems(
        //     () => setLoading(true),
        //     () => setLoading(false),
        //     (data) => setOptions(data)
        // );
        fetchKladrItems(
            '',
            () => setLoading(true),
            () => setLoading(false),
            (data) => setOptions(data)
        );
    }, []);

    const loadingCallback = (e) => {
        console.log(e.target.value);
        fetchItems(
            () => setLoading(true),
            () => setLoading(false),
            (data) => setOptions(data)
        );
    };

    const loadingCallback2 = (e) => {
        console.log(e.target.value);
        fetchKladrItems(
            e.target.value,
            () => setLoading(true),
            () => setLoading(false),
            (data) => setOptions(data)
        );
    };

    const throttledFetch = useThrottle(loadingCallback, 2000);
    const throttledKladrFetch = useThrottle(loadingCallback2, 2000);

    return (
        <KladrAutocomplete
            {...args}
            value={value}
            options={options}
            handleChange={handleChange}
            loading={loading}
            // handleInput={throttledFetch}
            handleInput={throttledKladrFetch}
        />
    );
};

export const Main = Template.bind({});
Main.args = {
    user: {},
};
