'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import TaskCoinStats from '@/components/dashboard/TaskCoinStats';
import AddTaskIcon from '@mui/icons-material/AddTask';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';

// Styled components
const DashboardContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
}));

const PageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
}));

const WelcomeSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundImage: 'linear-gradient(to right, #3a7bd5, #6abbff)',
  color: 'white',
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  textTransform: 'none',
  boxShadow: theme.shadows[2],
}));

const DashboardSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const ActivityItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  '&:last-child': {
    marginBottom: 0,
  },
}));

const Dashboard = () => {
  // Mock data - In a real app, this would come from an API or context
  const [dashboardData] = useState({
    completedTasks: 12,
    pendingTasks: 5,
    totalCoinsEarned: 345,
    weeklyProgress: 68,
    userName: 'Alex',
    recentActivities: [
      { id: 1, title: 'Completed "Website Redesign" task', time: '2 hours ago', coins: 50 },
      { id: 2, title: 'Started "SEO Optimization" task', time: 'Yesterday', coins: 0 },
      { id: 3, title: 'Earned achievement: "Task Streak"', time: '2 days ago', coins: 25 },
    ]
  });

  // Simulate data fetch
  useEffect(() => {
    // In a real app, you'd fetch data from an API here
    // Commented out to avoid unused variable warnings
    // const fetchDashboardData = async () => {
    //   // const response = await fetch('/api/dashboard');
    //   // const data = await response.json();
    //   // setDashboardData(data);
    // };
    // fetchDashboardData();
  }, []);

  return (
    <DashboardContainer maxWidth="lg">
      <PageHeader>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back, {dashboardData.userName}! Here&apos;s your task progress and earnings.
          </Typography>
        </Box>
        <Box>
          <ActionButton 
            variant="contained" 
            color="primary" 
            startIcon={<AddTaskIcon />}
          >
            New Task
          </ActionButton>
          <ActionButton 
            variant="outlined"
            startIcon={<NotificationsIcon />}
          >
            Notifications
          </ActionButton>
        </Box>
      </PageHeader>

      <WelcomeSection elevation={3}>
        <Typography variant="h5" gutterBottom>
          You&apos;re doing great!
        </Typography>
        <Typography variant="body1">
          You&apos;ve completed {dashboardData.completedTasks} tasks this month and earned {dashboardData.totalCoinsEarned} coins.
          Keep up the good work!
        </Typography>
      </WelcomeSection>

      <DashboardSection>
        <SectionHeader>
          <Box display="flex" alignItems="center">
            <DashboardIcon color="primary" fontSize="medium" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Your Statistics
            </Typography>
          </Box>
        </SectionHeader>

        <TaskCoinStats 
          completedTasks={dashboardData.completedTasks}
          pendingTasks={dashboardData.pendingTasks}
          totalCoinsEarned={dashboardData.totalCoinsEarned}
          weeklyProgress={dashboardData.weeklyProgress}
        />
      </DashboardSection>

      <DashboardSection>
        <SectionHeader>
          <Box display="flex" alignItems="center">
            <ListAltIcon color="primary" fontSize="medium" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Recent Activity
            </Typography>
          </Box>
          <Button color="primary" size="small">View All</Button>
        </SectionHeader>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            {dashboardData.recentActivities.map((activity) => (
              <ActivityItem key={activity.id} elevation={1}>
                <Box flexGrow={1}>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {activity.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activity.time}
                  </Typography>
                </Box>
                {activity.coins > 0 && (
                  <Box display="flex" alignItems="center">
                    <Typography variant="subtitle1" color="primary" fontWeight="bold">
                      +{activity.coins}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                      coins
                    </Typography>
                  </Box>
                )}
              </ActivityItem>
            ))}
          </Grid>
        </Grid>
      </DashboardSection>
    </DashboardContainer>
  );
};

export default Dashboard;
