import React from 'react';
import { Box, Typography, Select, MenuItem, FormControl } from '@mui/material';

const Conversions: IConversionsComponent<IConversionsComponentProps> = () => {
    const data = [
        { day: 'S', top: 60, bottom: 30 },
        { day: 'M', top: 80, bottom: 40 },
        { day: 'T', top: 70, bottom: 50 },
        { day: 'W', top: 90, bottom: 60 },
        { day: 'T', top: 30, bottom: 60 },
        { day: 'F', top: 20, bottom: 50 },
        { day: 'S', top: 90, bottom: 50 },
    ];

    return (
        <Box className="components__conversions">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Conversions</Typography>
                <FormControl variant="outlined" size="small">
                    <Select defaultValue="This Week">
                        <MenuItem value="This Week">This Week</MenuItem>
                        <MenuItem value="Last Month">Last Month</MenuItem>
                        <MenuItem value="Last Year">Last Year</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box className="chart" mt={2}>
                {data.map((item, index) => (
                    <Box key={index} className="bar">
                        <Box className="bar__top" style={{ height: `${item.top}px` }} />
                        <Box className="bar__bottom" style={{ height: `${item.bottom}px` }} />
                        <Typography variant="body2">{item.day}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Conversions;
