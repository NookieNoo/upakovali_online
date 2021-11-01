import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

function SimpleAccordion(props) {
    const { children, heading, secondaryHeading, mountOptions } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion TransitionProps={mountOptions}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content">
                    <Typography className={classes.heading}>{heading}</Typography>
                    <Typography className={classes.secondaryHeading}>{secondaryHeading}</Typography>
                </AccordionSummary>
                <AccordionDetails>{children}</AccordionDetails>
            </Accordion>
        </div>
    );
}

SimpleAccordion.defaultProps = {
    secondaryHeading: '',
    // по дефолту контент гармошки не монтируется, и размонтируется после закрытия
    mountOptions: { mountOnEnter: true, unmountOnExit: true },
};

SimpleAccordion.propTypes = {
    children: PropTypes.node.isRequired,
    heading: PropTypes.node,
    secondaryHeading: PropTypes.node,
    mountOptions: PropTypes.object,
};

export const SimpleAccordionMemo = React.memo(SimpleAccordion);
