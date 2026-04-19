// React component for the Chapter Updates page of the Nevada Faculty Alliance Chapter website. 
// Updates content contains three menu tabs that load different information
// imports
import { useState, useEffect } from 'react';
import { getUpdates } from '../services/updatesServices';
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import UpdateItem from '../components/updateSections';

// set the update tab accent colors
const tabColors = {
    'nfa-in-action': '#0a1929',
    'bargaining-updates': '#182748',
    'member-spotlight': '#d1a906',
    'meetings': '#2c3e50'
}

// Reference for Material UI components: https://mui.com/material-ui/react-grid/
export default function Updates() {
    // initialize variables for tabs and updates data
    const [selectedTab, setSelectedTab] = useState(null);
    const [updatesData, setUpdatesData] = useState(null);

    // load data from updatesServices
    useEffect(() => {
        getUpdates()
            .then(data => {
                setUpdatesData(data);
                setSelectedTab(data.categories[0]);
            })
            .catch(loadError => console.error('Error loading updates:', loadError));
    }, []);

    // Return the template and content for updates page
    return (
        <div className="home-container">
            <Grid container spacing={2}>
                {/* Left Column - Sidebar */}
                <Grid size={4}>
                    <Stack spacing={2}>
                        {/* Set the sidebar tab layout */}
                        {updatesData.categories.map(category => 
                            <Paper key={category.id}
                            sx={{ p: 2,
                                bgcolor: selectedTab.id === category.id ? '#d1a906' : '#f5f5f5',
                                color: selectedTab.id === category.id ? 'white' : 'inherit',
                                cursor: 'pointer',
                                borderLeft: `4px solid ${tabColors[category.id] || '#0a1929'}`,
                                '&:hover': { bgcolor: 'd0e4f7', color: 'white' }
                            }}
                            // tab navigation
                            onClick = {() => setSelectedTab(category)} >
                                <Typography variant="h6">{category.title}</Typography>
                            </Paper>
                        )}
                    </Stack>
                </Grid>
                
                {/* Right Column - Main Content */}
                <Grid size={8}>
                    <Paper sx={{ p: 3, height: '100%', boxSizing: 'border-box' }}>
                        <Typography variant="h4" gutterBottom>
                            {selectedTab.title}
                        </Typography>

                        <Stack spacing={2} sx={{ mt: 2 }}>
                        {/* Set the tabs to either the load the Meetings or Articles content */}
                        {selectedTab.articles.map(article => (
                            <UpdateItem 
                                key= {article.id}
                                item={article}
                                type={selectedTab.id === 'meetings' ? 'meeting' : 'article'}
                                />
                        ))}
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}



       




