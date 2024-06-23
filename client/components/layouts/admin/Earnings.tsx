import React from 'react';
import { Box, Typography, Select, MenuItem, FormControl } from '@mui/material';

const Earnings: IEarningsComponent<IEarningsComponentProps> = () => {
    return (
        <Box className="components__earnings">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" className="bold-text">
                    Earnings
                </Typography>
                <FormControl variant="outlined" size="small">
                    <Select defaultValue="This Week">
                        <MenuItem value="This Week">This Week</MenuItem>
                        <MenuItem value="Last Month">Last Month</MenuItem>
                        <MenuItem value="Last Year">Last Year</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box className="circle-chart" position="relative" width={100} height={100}>
                    <Box className="circle-chart__background" />
                    <Box className="circle-chart__foreground fashion" />
                    <Box className="circle-chart__foreground accessories" />
                </Box>
                <Box>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Box width={10} height={10} bgcolor="blue" borderRadius="50%" mr={1} />
                        <Typography>Fashion</Typography>
                        <Typography ml={1} color="textSecondary">
                            251K
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Box width={10} height={10} bgcolor="cyan" borderRadius="50%" mr={1} />
                        <Typography>Accessories</Typography>
                        <Typography ml={1} color="textSecondary">
                            176K
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Earnings;
