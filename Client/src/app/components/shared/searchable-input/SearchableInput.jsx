import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
import Label from '../typography/Label';

export default function SearchableInput({
    control = {},
    name = '',
    defaultValue = null,
    placeholder = 'Select',
    label = '',
    data = [],
    onSelectChange = () => {},
    sx = {},
    required = false,
    rules = {},
    disabled = false,
    onSearch = () => {},
    loading = false,
    labelVariant = 'title',
    ...rest
}) {
    const customStyles = {
        '& .MuiInputBase-root': {
            borderRadius: '18px',
            height: '44px',
            '&.MuiInputBase-sizeSmall': {
                height: '36px',
            },
        },
        '& .MuiOutlinedInput-input': {
            padding: '12px 14px',
        },
        ...sx,
    };
    const customRules = {
        required: required && `${label} is required`,
        ...rules,
    };
    return (
        <Stack width={'100%'}>
            {label && <Label variant={labelVariant}>{label}</Label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={customRules}
                render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                        disablePortal
                        options={data}
                        disabled={disabled}
                        sx={{ width: '100%' }}
                        clearIcon={false}
                        onChange={(e, newValue) => {
                            const selectedId = String(newValue?.id) || null;
                            field.onChange(selectedId);
                            onSelectChange(selectedId);
                        }}
                        value={
                            data.find(
                                (item) =>
                                    String(item.id) === String(field.value)
                            ) || null
                        }
                        onChangeCapture={(e) => {
                            onSearch(String(e.target.value));
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={customStyles}
                                placeholder={placeholder}
                                error={!!error}
                                helperText={error?.message ?? ''}
                            />
                        )}
                        {...rest}
                    />
                )}
            />
        </Stack>
    );
}
