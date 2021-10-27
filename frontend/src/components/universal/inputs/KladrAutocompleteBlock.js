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
    const { source, validate } = props;
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    console.log("validate", validate);

    const { input, meta } = useInput({ source: source, validate: validate });
    const dispatch = useDispatch();
    const notify = useNotify();
    console.log('meta', meta);
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

    const loadingCallback = (query) => {
        fetchKladrItems({
            options: { ...defaultQueryOptions, query },
            beforeFetch: showLoaders,
            afterFetch: hideLoaders,
            successCallback,
            errorCallback,
        });
    };

    const throttledKladrFetch = useThrottle(loadingCallback, 2000);

    const handleChange = (e, val) => input.onChange(val?.fullName);

    const handleInput = (e) => {
        input.onChange(e);
        throttledKladrFetch(e.target.value);
    };

    return (
        <KladrAutocomplete
            // value={value}
            label="Адрес забора товара"
            options={options}
            handleChange={handleChange}
            loading={loading}
            handleInput={handleInput}
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.fullName}
        />
    );
}
