import * as React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Box } from '@material-ui/core';

const formatDate = (date) => dayjs(date).format('DD-MM-YYYY');
const formatPriceName = (str) => str.slice(0, 25) + '...';

const ServiceOptionRenderer = ({ id, name, sum, price }) => {
    return (
        <Box key={id} width="100%">
            <Box display="flex" flexDirection="column">
                <Box display="flex" justifyContent="space-between" fontSize="0.9rem">
                    <div>{name}</div>
                    <div>{sum}</div>
                </Box>
                <Box display="flex" justifyContent="space-between" fontSize="0.7rem">
                    <div>{formatPriceName(price.name)}</div>
                    <Box display="flex" flexDirection="column" style={{ lineHeight: 1 }}>
                        <div>{formatDate(price.start)}</div>
                        <div>{formatDate(price.end)}</div>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

ServiceOptionRenderer.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    sum: PropTypes.number,
    price: PropTypes.object,
};

export default ServiceOptionRenderer;
