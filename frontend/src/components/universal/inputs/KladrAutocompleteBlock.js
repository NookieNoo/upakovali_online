import React from 'react';
import PropTypes from 'prop-types';
import KladrAutocomplete from './KladrAutocomplete';
import fetchJsonp from 'fetch-jsonp';
import { useThrottle } from '@app-hooks';
import { useInput, useNotify, fetchStart, fetchEnd, useTranslate } from 'react-admin';
import { useDispatch } from 'react-redux';
import { kladrToken, kladrUrl } from '@app-helpers';
import queryString from 'query-string';

const defaultQueryOptions = {
    contentType: 'building',
    oneString: true,
    limit: 10,
    token: kladrToken,
    query: 'А',
    // parentType: 'region',
    regionId: 7700000000000
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
    const { source, validate, id, label, ...rest } = props;
    const dispatch = useDispatch();
    const notify = useNotify();
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const translate = useTranslate();

    const getValidationMsg = (msg) => {
        if (!msg) return null;
        return typeof msg === 'string' ? translate(msg) : translate(msg.message);
    };

    const useInputObj = useInput({ source: source, validate });
    const { input, meta } = useInputObj;

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
        if (!query) return;

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
            value={input.value}
            options={options}
            handleChange={handleChange}
            loading={loading}
            handleInput={handleInput}
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.fullName)}
            error={meta.submitFailed || meta.submitSucceeded ? meta.invalid : false}
            helperText={getValidationMsg(meta.error)}
            id={id}
            label={label}
            {...rest}
        />
    );
}
