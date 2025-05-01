import React from 'react';
import { Button } from '@mui/material';

const PrimaryButtonComponent = ({
    variant = 'contained',
    disableElevation = true,
    size = 'large',
    children = null,
    sx = {},
    ...props
}) => {
    const customStyles = {
        '&.MuiButtonBase-root': {
            minWidth: 'max-content',
        },
        ...sx,
    };
    return (
        <Button
            variant={variant}
            disableElevation={disableElevation}
            color='primary'
            role='button'
            sx={customStyles}
            {...props}
        >
            {children}
        </Button>
    );
};

export default PrimaryButtonComponent;
