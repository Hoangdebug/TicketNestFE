import React from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    LinearProgress,
    Avatar,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Enterprise_Clients: IEnterpriseClientsComponent<IEnterpriseClientsComponentProps> = () => {
    const clients = [
        {
            company: 'Addidas Sportwear',
            logo: 'https://via.placeholder.com/40',
            contacts: ['SP', 'PP', 'MM'],
            order: '$14,000',
            completion: 60,
        },
        {
            company: 'Netflix',
            logo: 'https://via.placeholder.com/40',
            contacts: ['SP', 'MM'],
            order: '$30,000',
            completion: 25,
        },
        {
            company: 'Shopifi Stores',
            logo: 'https://via.placeholder.com/40',
            contacts: ['PP', 'TP'],
            order: '$8,500',
            completion: 100,
        },
        {
            company: 'Boostrap Technologies',
            logo: 'https://via.placeholder.com/40',
            contacts: ['SP', 'PP', 'MM', 'TP'],
            order: '$20,500',
            completion: 100,
        },
        {
            company: 'Community First',
            logo: 'https://via.placeholder.com/40',
            contacts: ['MM'],
            order: '$9,800',
            completion: 75,
        },
    ];

    return (
        <Box className="components__enterprise-clients">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h6">Enterprise Clients</Typography>
                    <CheckCircleIcon color="primary" style={{ marginLeft: 8 }} />
                    <Typography variant="body2" color="textSecondary" style={{ marginLeft: 4 }}>
                        15 New Acquired this month
                    </Typography>
                </Box>
                <ExpandMoreIcon />
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>COMPANIES</TableCell>
                            <TableCell>CONTACTS</TableCell>
                            <TableCell>ORDER</TableCell>
                            <TableCell>COMPLETION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clients.map((client, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Avatar src={client.logo} style={{ marginRight: 8 }} />
                                        {client.company}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" flexDirection="row">
                                        {client.contacts.map((contact, idx) => (
                                            <Avatar
                                                key={idx}
                                                style={{
                                                    marginRight: 4,
                                                    backgroundColor: '#E3F2FD',
                                                    color: '#0D47A1',
                                                    fontSize: '0.875rem',
                                                }}
                                            >
                                                {contact}
                                            </Avatar>
                                        ))}
                                    </Box>
                                </TableCell>
                                <TableCell>{client.order}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="body2" style={{ marginRight: 8 }}>{`${client.completion}%`}</Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={client.completion}
                                            style={{ width: '100%', height: 8, borderRadius: 5 }}
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Enterprise_Clients;
