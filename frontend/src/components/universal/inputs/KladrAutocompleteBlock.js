import React from 'react';
import PropTypes from 'prop-types';
import KladrAutocomplete from 'stories/KladrAutocomplete';
import fetchJsonp from 'fetch-jsonp';
import { useThrottle } from '@app-hooks';
import { useInput, useNotify, fetchStart, fetchEnd } from 'react-admin';
import { useDispatch } from 'react-redux';
import { kladrToken, kladrUrl } from '@app-helpers';
import queryString from 'query-string';

const defaultQueryOptions = {
    contentType: 'building',
    oneString: true,
    limit: 10,
    token: kladrToken,
    query: '',
};

const fetchKladrItems = ({ options, beforeFetch, afterFetch, successCallback, errorCallback }) => {
    beforeFetch();

    fetchJsonp(`${kladrUrl}?${queryString.stringify(options)}`, {
        jsonCallbackFunction: 'callback',
    })
        .then((response) => response.json())
        .then((data) => successCallback(data))
        .catch((e) => errorCallback(e))
        .finally(() => afterFetch());
};

export function KladrAutocompleteBlock(props) {
    const { source } = props;
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const { input } = useInput({ source: source });
    const dispatch = useDispatch();
    const notify = useNotify();
    console.log('input', input);

    const handleChange = (e, value) => {
        console.log('e', e);
        console.log('value', value);
        input.onChange(value);
    };

    const showLoaders = () => {
        dispatch(fetchStart());
        setLoading(true);
    };
    const hideLoaders = () => {
        dispatch(fetchEnd());
        setLoading(false);
    };
    const errorCallback = (err) => {
        console.log(err);
        notify('Не удалось связаться с сервисом Кладр', { type: 'warning' });
    };
    const successCallback = (data) => {
        const results = data.result ?? [];
        setOptions(results);
    };

    React.useEffect(() => {
        fetchKladrItems({
            options: defaultQueryOptions,
            beforeFetch: showLoaders,
            afterFetch: hideLoaders,
            successCallback,
            errorCallback,
        });
    }, []);

    const loadingCallback = (e) => {
        fetchKladrItems({
            options: { ...defaultQueryOptions, query: e.target.value },
            beforeFetch: showLoaders,
            afterFetch: hideLoaders,
            successCallback,
            errorCallback,
        });
    };

    const throttledKladrFetch = useThrottle(loadingCallback, 2000);

    return (
        <KladrAutocomplete
            // value={value}
            label='Адрес забора товара'
            options={options}
            handleChange={handleChange}
            loading={loading}
            handleInput={throttledKladrFetch}
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.fullName}
        />
    );
}
