import { Typography } from '@mui/material';
import React from 'react';

const RowText = ({
    children = null,
    variant = 'subtitle2',
    fontWeight = 400,
    component = 'span',
    textAlign = 'left',
    ...rest
}) => {
    return (
        <Typography
            variant={variant}
            fontWeight={fontWeight}
            component={component}
            textAlign={textAlign}
            {...rest}
        >
            {children}
        </Typography>
    );
};

export default RowText;
