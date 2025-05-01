import React from 'react';
import { IconButton, useTheme } from '@mui/material';
import { IconPencil } from '@tabler/icons-react';

const EditButton = (props) => {
    const theme = useTheme();

    return (
        <IconButton {...props}>
            <IconPencil color={theme.palette.primary.main} />
        </IconButton>
    );
};

export default EditButton;
