import React from 'react';
import { Typography } from '@mui/material';

const HeadText = ({
    children = null,
    variant = 'h6',
    fontWeight = 600,
    component = 'span',
    textAlign = 'left',
    ...rest
}) => {
    return (
        <Typography
            variant={variant}
            component={component}
            fontWeight={fontWeight}
            textAlign={textAlign}
            {...rest}
        >
            {children}
        </Typography>
    );
};

export default HeadText;
