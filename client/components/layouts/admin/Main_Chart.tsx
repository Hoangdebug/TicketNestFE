import React from 'react';
import { Card, CardContent, Typography, Box, MenuItem, Select, FormControl } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Main_Chart: IMainChartComponent<IMainChartComponentProps> = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
            {
                label: 'Sales',
                data: [60, 72, 81, 90, 99, 90, 81, 72],
                borderColor: '#3f51b5',
                backgroundColor: 'rgba(63, 81, 181, 0.2)',
                fill: true,
            },
            {
                label: 'Cost',
                data: [40, 55, 63, 72, 81, 72, 63, 55],
                borderColor: '#00bcd4',
                backgroundColor: 'rgba(0, 188, 212, 0.2)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <Card className="components__main-chart">
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h4" component="h2">
                            $855.8K
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Gross Sales
                        </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                        <Box mr={2} display="flex" alignItems="center">
                            <Box bgcolor="#3f51b5" width={10} height={10} borderRadius="50%" mr={1} />
                            <Typography variant="body2">Sales</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Box bgcolor="#00bcd4" width={10} height={10} borderRadius="50%" mr={1} />
                            <Typography variant="body2">Cost</Typography>
                        </Box>
                    </Box>
                    <FormControl variant="outlined" size="small">
                        <Select defaultValue="This Week">
                            <MenuItem value="This Week">This Week</MenuItem>
                            <MenuItem value="Last Month">Last Month</MenuItem>
                            <MenuItem value="Last Year">Last Year</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box mt={3}>
                    <Line data={data} options={options} />
                </Box>
            </CardContent>
        </Card>
    );
};

export default Main_Chart;
