// React component for the Chapter Updates page of the Nevada Faculty Alliance Chapter website. 

import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

// Reference for Material UI components: https://mui.com/material-ui/react-grid/
export default function Updates() {
    return (
        <div className="home-container">
            <Grid container spacing={2}>
                {/* Left Column - Sidebar */}
                <Grid size={4}>
                    <Stack spacing={2}>
                        <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                            <Typography variant="h6">NFA in Action!</Typography>
                        </Paper>
                        <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                            <Typography variant="h6">Bargaining Updates</Typography>
                        </Paper>
                        <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                            <Typography variant="h6">Upcoming Meetings</Typography>
                        </Paper>
                    </Stack>
                </Grid>
                
                {/* Right Column - Main Content */}
                <Grid size={8}>
                    <Paper sx={{ p: 3, height: '100%', boxSizing: 'border-box' }}>
                        <Typography variant="h4" gutterBottom>
                            Your Union in Action
                        </Typography>

                        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
                            State Employee Benefits Premiums Set to Rise!
                        </Typography>

                        <Typography variant="caption" display="block" sx={{ mb: 2, color: 'text.secondary' }}>
                            March 4, 2025<br />
                            by: Rachelle Bassen, Union President
                        </Typography>

                        <Typography paragraph>
                            The Union is actively negotiating with the state to address the rising costs of employee benefits. We are committed to ensuring that our members receive fair and affordable healthcare coverage.
                        </Typography>
                        
                        <Typography paragraph>
                            Stay tuned for updates on the progress of these negotiations and how they may impact your benefits.
                        </Typography>
                        
                        <Typography paragraph>
                            Join the next union meeting to learn more about how you can get involved and support our efforts to secure better benefits for all state employees.
                        </Typography>

                        {/* Second Article */}
                        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                            Legislative Update: Education Funding
                        </Typography>

                        <Typography variant="caption" display="block" sx={{ mb: 2, color: 'text.secondary' }}>
                            March 1, 2025<br />
                            by: Rachelle Bassen, Union President
                        </Typography>

                        <Typography paragraph>
                            The Nevada Legislature is currently reviewing the higher education budget. Your NFA team is monitoring several key bills that would impact faculty working conditions and compensation.
                        </Typography>
                        
                        <Typography paragraph>
                            We encourage all members to stay informed and participate in upcoming advocacy days at the legislature.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}


       




