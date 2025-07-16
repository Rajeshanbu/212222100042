
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, CircularProgress } from '@mui/material';
import { getUrlAndLogClick } from '../services/urlService';
import logger from '../services/logger';

const RedirectPage = () => {
    const { shortcode } = useParams();
    const [message, setMessage] = useState('Redirecting...');
    
    useEffect(() => {
        const urlData = getUrlAndLogClick(shortcode);

        if (urlData) {
            logger.info(`Redirecting ${shortcode} to ${urlData.longUrl}`);
            let fullUrl = urlData.longUrl;
            if (!/^https?:\/\//.test(fullUrl)) {
                fullUrl = 'http://' + fullUrl;
            }
            window.location.href = fullUrl;
        } else {
            logger.error(`Redirect failed. Shortcode ${shortcode} is invalid or expired.`);
            setMessage('Error: Link is invalid or has expired.');
        }
    }, [shortcode]);

    return (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h5">{message}</Typography>
            {message === 'Redirecting...' && <CircularProgress sx={{ mt: 2 }} />}
        </Box>
    );
};

export default RedirectPage;