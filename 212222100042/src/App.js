
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box, TextField, Alert, Paper, Link as MuiLink } from '@mui/material';
import StatisticsPage from './pages/StatisticsPage';
import RedirectPage from './pages/RedirectPage';
import { createShortUrl } from './services/urlService';
import logger from './services/logger';

const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

const HomePage = () => {
    const [inputs, setInputs] = useState([{ longUrl: '', customShortcode: '', validity: '' }]);
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (index, event) => {
        const newInputs = [...inputs];
        newInputs[index][event.target.name] = event.target.value;
        setInputs(newInputs);
    };

    const handleAddInput = () => {
        if (inputs.length < 5) {
            setInputs([...inputs, { longUrl: '', customShortcode: '', validity: '' }]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        setResults([]);
        logger.info("Form submission initiated.");

        const createdUrls = [];
        const submissionErrors = [];

        for (const input of inputs) {
            if (!input.longUrl) continue;

            if (!URL_REGEX.test(input.longUrl)) {
                submissionErrors.push(`Invalid URL: ${input.longUrl}`);
                continue;
            }

            const result = createShortUrl(input.longUrl, input.customShortcode, input.validity ? parseInt(input.validity) : 30);
            if (result.error) {
                submissionErrors.push(result.error);
            } else {
                createdUrls.push(result.data);
            }
        }

        if (submissionErrors.length > 0) {
            setError(submissionErrors.join('. '));
            logger.error("Submission failed with errors:", submissionErrors);
        }
        if (createdUrls.length > 0) {
            setResults(createdUrls);
            setInputs([{ longUrl: '', customShortcode: '', validity: '' }]); // Reset form
            logger.info("Submission successful, displaying results.");
        }
    };

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>
                Shorten a URL
            </Typography>
            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                {inputs.map((input, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                        <TextField name="longUrl" label={`URL #${index + 1}`} value={input.longUrl} onChange={e => handleInputChange(index, e)} fullWidth required />
                        <TextField name="customShortcode" label="Custom Code" value={input.customShortcode} onChange={e => handleInputChange(index, e)} />
                        <TextField name="validity" label="Validity (Mins)" type="number" value={input.validity} onChange={e => handleInputChange(index, e)} placeholder="30" />
                    </Box>
                ))}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button onClick={handleAddInput} disabled={inputs.length >= 5}>Add URL</Button>
                    <Button type="submit" variant="contained">Shorten</Button>
                </Box>
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </Box>

            {/* Resullts */}
            {results.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" gutterBottom>Your Links</Typography>
                    {results.map((result, index) => (
                        <Paper key={index} sx={{ p: 2, mb: 2 }}>
                            <Typography sx={{ wordBreak: 'break-all' }}>Original: {result.longUrl}</Typography>
                            <Typography sx={{ mt: 1 }}>
                                Short: <MuiLink href={result.shortUrl} target="_blank">{result.shortUrl}</MuiLink>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Expires: {new Date(result.expiryDate).toLocaleString()}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            )}
        </>
    );
};

function App() {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>URL Shortener</Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/statistics">Statistics</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Box sx={{ my: 4 }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/statistics" element={<StatisticsPage />} />
                        <Route path="/:shortcode" element={<RedirectPage />} />
                    </Routes>
                </Box>
            </Container>
        </Router>
    );
}

export default App;