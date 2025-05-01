import { Typography } from '@mui/material';

const Heading = ({
    children,
    align = 'center',
    variant = 'h4',
    fontWeight = 700,
    component = 'h4',
    htmlFor = '',
    sx = {},
    ...rest
}) => {
    return (
        <Typography
            width={'100%'}
            variant={variant}
            fontWeight={fontWeight}
            component={component}
            htmlFor={htmlFor}
            align={align}
            sx={sx}
            {...rest}
        >
            {children}
        </Typography>
    );
};

export default Heading;
