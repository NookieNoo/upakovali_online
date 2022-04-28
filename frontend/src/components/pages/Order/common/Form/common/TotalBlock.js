import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { formatMoney } from '@app-helpers';

export default function TotalBlock({ deliveryTotal, pickupTotal, giftsTotal, additionalTotal }) {
    const total = giftsTotal + additionalTotal + deliveryTotal + pickupTotal;
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Итого:
            </Typography>
            Подарки ({giftsTotal}) + Допы ({additionalTotal}) + Доставка ({deliveryTotal}) + Забор ({pickupTotal}) ={' '}
            {formatMoney(total)}
        </>
    );
}

TotalBlock.defaultProps = {
    deliveryTotal: 0,
    pickupTotal: 0,
    giftsTotal: 0,
    additionalTotal: 0,
};

TotalBlock.propTypes = {
    deliveryTotal: PropTypes.number,
    pickupTotal: PropTypes.number,
    giftsTotal: PropTypes.number,
    additionalTotal: PropTypes.number,
};
