import React from 'react';
import { Card, Grid, Typography, Box, LinearProgress, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Types
interface TaskCoinStatsProps {
  completedTasks: number;
  pendingTasks: number;
  totalCoinsEarned: number;
  weeklyProgress: number; // Percentage of weekly goal
}

// Styled components
const StatsCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: 48,
  height: 48,
  marginRight: theme.spacing(2),
}));

const TaskCoinStats: React.FC<TaskCoinStatsProps> = ({
  completedTasks = 12,
  pendingTasks = 5,
  totalCoinsEarned = 345,
  weeklyProgress = 68,
}) => {
  const totalTasks = completedTasks + pendingTasks;
  
  return (
    <Grid container spacing={3}>
      {/* Task Statistics */}
      <Grid item xs={12} md={6}>
        <StatsCard>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
            Task Progress
          </Typography>
          
          <StatItem>
            <IconBox sx={{ bgcolor: 'success.light' }}>
              <CheckCircleIcon color="success" fontSize="medium" />
            </IconBox>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                Completed Tasks
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {completedTasks}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
            </Typography>
          </StatItem>
          
          <StatItem>
            <IconBox sx={{ bgcolor: 'warning.light' }}>
              <PendingIcon color="warning" fontSize="medium" />
            </IconBox>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight="medium">
                Pending Tasks
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {pendingTasks}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {totalTasks > 0 ? Math.round((pendingTasks / totalTasks) * 100) : 0}%
            </Typography>
          </StatItem>
          
          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Weekly Goal Progress
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={weeklyProgress} 
              sx={{ height: 10, borderRadius: 5 }} 
            />
            <Typography variant="body2" sx={{ mt: 1 }} align="right">
              {weeklyProgress}% Completed
            </Typography>
          </Box>
        </StatsCard>
      </Grid>
      
      {/* Coin Statistics */}
      <Grid item xs={12} md={6}>
        <StatsCard>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
            Coin Earnings
          </Typography>
          
          <StatItem>
            <IconBox sx={{ bgcolor: 'info.light' }}>
              <AttachMoneyIcon color="info" fontSize="medium" />
            </IconBox>
            <Box>
              <Typography variant="subtitle1" fontWeight="medium">
                Total Coins Earned
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="info.main">
                {totalCoinsEarned}
              </Typography>
            </Box>
          </StatItem>
          
          <Divider sx={{ my: 2 }} />
          
          <StatItem>
            <IconBox sx={{ bgcolor: 'secondary.light' }}>
              <AccessTimeIcon color="secondary" fontSize="medium" />
            </IconBox>
            <Box>
              <Typography variant="subtitle1" fontWeight="medium">
                Average Earnings
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {completedTasks > 0 ? Math.round(totalCoinsEarned / completedTasks) : 0} coins per task
              </Typography>
            </Box>
          </StatItem>
          
          <Box sx={{ mt: 'auto', bgcolor: 'background.default', p: 2, borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Complete more tasks to earn additional coins and unlock premium features!
            </Typography>
          </Box>
        </StatsCard>
      </Grid>
    </Grid>
  );
};

export default TaskCoinStats;
