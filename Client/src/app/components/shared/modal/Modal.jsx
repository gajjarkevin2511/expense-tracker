import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import { Grid } from '@mui/material';

import Heading from '../typography/Heading';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
    maxHeight: '90%',
    maxWidth: '90%',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        width: '0.4em',
    },
};

export default function BasicModal({
    children,
    open,
    handleClose,
    label = 'Label',
}) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby={label}
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>
                <Button
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        minWidth: 'auto',
                        padding: 0,
                        borderRadius: '50%',
                    }}
                >
                    <CloseIcon />
                </Button>

                {/* Modal Content */}
                <Grid container rowGap={2}>
                    <Grid size={12}>
                        <Heading align='left' id={label}>
                            {label}
                        </Heading>
                    </Grid>
                    <Grid size={12}>{children}</Grid>
                </Grid>
            </Box>
        </Modal>
    );
}
