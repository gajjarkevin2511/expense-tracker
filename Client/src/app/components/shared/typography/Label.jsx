import { Typography } from '@mui/material';
import React from 'react';

const Label = ({
    children = null,
    variant = 'subtitle1',
    fontWeight = 600,
    component = 'label',
    htmlFor = '',
    sx = {},
    ...rest
}) => {
    return (
        <Typography
            variant={variant}
            fontWeight={fontWeight}
            component={component}
            htmlFor={htmlFor}
            mb='5px'
            sx={{
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                ...sx,
                ...rest,
            }}
        >
            {children}
        </Typography>
    );
};

export default Label;
