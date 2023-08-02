import React from 'react';
import Typography from '@mui/material/Typography';
import Button, {ButtonProps} from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {FormattedMessage} from "react-intl";

interface PageHeaderProps {
    title: string;
    buttonLabel: string;
    buttonColor?: ButtonProps['color']; // Use the ButtonProps type to get the color options
    buttonOnClick?: () => void;
    to?: string;
}

// @ts-ignore
const CustomLink = React.forwardRef<any, Omit<React.ComponentProps<Link>, 'to' | 'component'>>(({
                                                                                                    to,
                                                                                                    ...props
                                                                                                }, ref) => (
    <Link to={to} {...props} ref={ref}/>
));

const PageHeader: React.FC<PageHeaderProps> = ({
                                                   title,
                                                   buttonLabel,
                                                   buttonColor = 'primary',
                                                   buttonOnClick,
                                                   to,
                                               }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
            }}
        >
            <Typography variant="h5" align="left">
                <FormattedMessage id={title}/>
            </Typography>
            {buttonOnClick ? (
                <Button
                    variant="outlined"
                    color={buttonColor}
                    onClick={buttonOnClick}
                    style={{
                        textTransform: 'none',
                    }}
                >
                    <FormattedMessage id={buttonLabel}/>
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    color={buttonColor}
                    component={CustomLink}
                    to={to}
                    style={{
                        textTransform: 'none',
                    }}
                >
                    <FormattedMessage id={buttonLabel}/>
                </Button>
            )}
        </div>
    );
};

export default PageHeader;
