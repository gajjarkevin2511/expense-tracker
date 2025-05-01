import React from 'react';
import { Controller } from 'react-hook-form';
import { Stack, TextField } from '@mui/material';
import Label from '../../typography/Label';

const InputField = ({
    name = '',
    control = {},
    defaultValue = '',
    variant = 'outlined',
    fullWidth = true,
    rules = {},
    sx = {},
    label = '',
    textAlign = 'start',
    required = false,
    onChange,
    type = 'text', // Ensure type is passed as a prop,
    disabled = false,
    readOnly = false, // Note : instead of disabled, disable attribute is removing value from state
    labelVariant = 'title',
    ...rest
}) => {
    const customRules = {
        required: required ? `${label} is required` : false,
        ...rules,
    };
    const customStyles = {
        '& .MuiInputBase-root': {
            borderRadius: '18px',
        },
        '& .MuiOutlinedInput-input': {
            padding: sx?.padding ?? '12px 14px',
            textAlign,
        },
        ...sx,
    };
    return (
        <Stack>
            {label && <Label variant={labelVariant}>{label}</Label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={customRules}
                disabled={disabled}
                render={({ field, fieldState: { error } }) => (
                    <TextField
                        {...field}
                        onChange={(e) => {
                            // For number type, restrict negative values
                            if (type === 'number') {
                                const value = e.target.value;
                                if (value === '' || value >= 0) {
                                    field.onChange(value);
                                    onChange && onChange(value);
                                }
                            } else {
                                field.onChange(e.target.value);
                                onChange && onChange(e.target.value);
                            }
                        }}
                        variant={variant}
                        fullWidth={fullWidth}
                        error={!!error}
                        helperText={error ? error.message : ''}
                        sx={customStyles}
                        type={type}
                        inputProps={{
                            ...rest.inputProps,
                            ...(rest?.min !== undefined
                                ? { min: rest?.min }
                                : {}),
                            ...(rest?.max !== undefined
                                ? { max: rest?.max }
                                : {}),
                            step: 'any', // To prevent using decrease button for negative numbers
                            readOnly,
                        }}
                        {...rest}
                    />
                )}
            />
        </Stack>
    );
};

export default InputField;
