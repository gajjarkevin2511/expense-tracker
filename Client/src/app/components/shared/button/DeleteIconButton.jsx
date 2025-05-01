import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import { IconTrashX } from '@tabler/icons-react';

const DeleteButton = (props) => {
    const theme = useTheme();
    return (
        <IconButton {...props}>
            <IconTrashX color={theme.palette.error.main} />
        </IconButton>
    );
};

export default DeleteButton;
