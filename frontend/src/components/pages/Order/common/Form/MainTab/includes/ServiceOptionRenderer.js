import * as React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const styles = {
    div: {
        width: '100%',
    },
    flex: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'space-between',
    },
    firstStr: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: '0.9rem',
        justifyContent: 'space-between',
        alignItems: 'space-between',
    },
    secondStr: {
        fontSize: '0.7rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'space-between',
    },
};
const formatDate = (date) => dayjs(date).format('DD-MM-YYYY');
const ServiceOptionRenderer = ({ id, name, sum, price }) => {
    return (
        <div key={id} style={styles.div}>
            <div style={styles.flex}>
                <div style={styles.firstStr}>
                    <div>{name}</div>
                    <div>{sum}</div>
                </div>
                <div style={styles.secondStr}>
                    <div>{price.name}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                        <div>{formatDate(price.start)}</div>
                        <div>{formatDate(price.end)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ServiceOptionRenderer.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    sum: PropTypes.number,
    price: PropTypes.object,
};

export default ServiceOptionRenderer;
