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
    // Set the layout design for meeting info
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
            <span>{item.time}</span>
        </Box>

        <Typography variant="body2" sx={{mt:1, color: '#0a1929'}}>
            {item.location}
        </Typography>

        <Typography variant="body2" sx={{mt: 0.5, fontStyle: 'italic', color: '#ffd700'}}>
            {item.agenda}
        </Typography>

        {item.zoomlink && (<Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Zoom Link: </strong>{item.zoomlink}
        </Typography>
        )}
        </Paper>
           );
        }

        // If not a meeting, then return the layout for article content
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

        {item.content && (
        <Typography variant="body2" sx={{mt:1, color: '#0a1929'}}>
            {item.content}
        </Typography>
        )}
    </Paper>
    );
}
