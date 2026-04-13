// References: https://mui.com/material-ui/react-typography/
// React component - UpdateItem
// Project code modified from the CS - 465 template and my final project(2025)
// Reference for Material UI components: https://mui.com/material-ui/react-paper/
// Reference for Material UI styling: https://mui.com/material-ui/customization/the-sx-prop/


// import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

// header component 
// designed with union logo and navigation bar
export default function UpdateItem({item, type, color}) {
    if (type === 'meeting') {
           return (
            // Reference: https://mui.com/material-ui/react-paper/
        <Paper elevation = {2}
        sx = {{
            p: 2,
            borderLeft: `4px solid ${color}`,
            '&:hover': {boxShadow: 6}
        }}>

        <Typography variant="subtitle1" sx={{fontWeight: 'bold', color: '#0a1929'}}>
            {item.title}
        </Typography>

        <Box sx={{ display: 'flex', gap:2, mt:1, fontSize: '0.875rem', color: '#666'}}>
            <span>{item.date} </span>
            <span>{item.item}</span>
        </Box>

        <Typography variant="body2" sx={{mt:1, color: '#0a1929'}}>
            {item.title}
        </Typography>

        <Typography variant="body2" sx={{mt: 0.5, fontStyle: 'italic', color: '#ffd700'}}>
            {item.title}
        </Typography>

        </Paper>
           );
        }

        return (
            <Paper elevation={2}
            sx={{
                p: 2, 
                borderLeft: `4px solid ${color}`,
                '&:hover': {boxShadow: 6}
            }}
        >
        <Typography variant="subtitle1" sx={{fontWeight: 'bold', color: '#0a1929'}}>
            {item.title}
        </Typography>

        <Box sx={{ display: 'flex', gap:2, mt:1, fontSize: '0.875rem', color: '#666'}}>
            <span>{item.date} </span>
            {item.author && <span> 
                {item.author}
                </span>}
        </Box>

        {item.excerpt && (
            <Typography variant="body2" sx={{mt:1, color: '#0a1929'}}>
                {item.excerpt}
            </Typography>
        )}
        </Paper>
        );
    }
