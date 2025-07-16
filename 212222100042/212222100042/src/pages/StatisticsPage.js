
import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, Box, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getAllUrls } from '../services/urlService';
import logger from '../services/logger';

const Row = ({ row }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell><a href={row.shortUrl} target="_blank" rel="noopener noreferrer">{row.shortUrl}</a></TableCell>
                <TableCell sx={{ wordBreak: 'break-all' }}>{row.longUrl}</TableCell>
                <TableCell>{row.clicks}</TableCell>
                <TableCell>{new Date(row.creationDate).toLocaleString()}</TableCell>
                <TableCell>{new Date(row.expiryDate).toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom>Click History</Typography>
                            {row.clickDetails.length > 0 ? (
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Timestamp</TableCell>
                                            <TableCell>Source</TableCell>
                                            <TableCell>Location</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.clickDetails.map((detail, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{new Date(detail.timestamp).toLocaleString()}</TableCell>
                                                <TableCell>{detail.source}</TableCell>
                                                <TableCell>{detail.location}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (<Typography>No clicks recorded.</Typography>)}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};


const StatisticsPage = () => {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
        logger.info("Loading statistics page.");
        setUrls(getAllUrls());
    }, []);

    return (
        <>
            <Typography variant="h4" component="h1" gutterBottom>Statistics</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Short URL</TableCell>
                            <TableCell>Original URL</TableCell>
                            <TableCell>Clicks</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Expires</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {urls.map((url) => <Row key={url.shortcode} row={url} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default StatisticsPage;