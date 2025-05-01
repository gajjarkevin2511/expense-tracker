import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import PrimaryButton from '../button/PrimaryButton';
import SecondaryButton from '../button/SecondaryButton';

export default function AlertDialog({
    heading = 'Delete Organization?',
    alertText = 'Are you sure you want to delete this organization?',
    onConfirm = () => {},
    open = false,
    handleClose = () => {},
}) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '18px',
                },
            }}
        >
            <DialogTitle id='alert-dialog-title'>{heading}</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    {alertText}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: '0 24px 16px' }}>
                <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
                <PrimaryButton
                    onClick={() => {
                        onConfirm();
                        handleClose();
                    }}
                    autoFocus
                >
                    Confirm
                </PrimaryButton>
            </DialogActions>
        </Dialog>
    );
}
