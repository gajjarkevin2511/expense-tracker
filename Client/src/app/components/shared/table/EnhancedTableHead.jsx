'use client';
import React, { useState } from 'react';
import { Box, Button, TableCell, Tooltip } from '@mui/material';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

const EnhancedTableHead = ({
    align,
    size = 'medium',
    sx = {
        borderBottom: '1px solid #e5eaef',
    },
    children,
    sort,
    onSort,
    sortParams,
    name,
}) => {
    const [hover, setHover] = useState(false);
    return (
        <TableCell
            align={align}
            size={size}
            sx={{
                ...sx,
                position: 'relative',
            }}
        >
            {sort ? (
                <>
                    <Tooltip title='Click to sort'>
                        <Button
                            onClick={() => {
                                onSort({
                                    sortBy: name,
                                    order:
                                        sortParams?.order == 'desc'
                                            ? 'asc'
                                            : 'desc',
                                });
                            }}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            sx={{
                                color: 'inherit',
                                display: 'flex',
                                alignItems: 'center',
                                padding: 0,
                            }}
                        >
                            {children}
                            <Box
                                sx={{
                                    width: 18, // Set a fixed width to prevent shifting
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {(hover || sortParams.sortBy == name) &&
                                    sortParams?.order === 'asc' && (
                                        <ArrowUpward fontSize='12px' />
                                    )}
                                {(hover || sortParams.sortBy == name) &&
                                    sortParams?.order === 'desc' && (
                                        <ArrowDownward fontSize='12px' />
                                    )}
                            </Box>
                        </Button>
                    </Tooltip>
                </>
            ) : (
                children
            )}
        </TableCell>
    );
};

export default EnhancedTableHead;
