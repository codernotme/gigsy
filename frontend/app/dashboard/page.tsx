'use client';

import React, { useState } from 'react';
import { Container, Grid, Paper, Box, Typography, Button, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import TaskCoinStats from '@/components/dashboard/TaskCoinStats';
import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';
import { format } from 'date-fns';
import RefreshIcon from '@mui/icons-material/Refresh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const DashboardContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(8),
}));

const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  background: theme.palette.mode === 'dark' ? 'linear-gradient(45deg, #1a237e 30%, #283593 90%)' : 'linear-gradient(45deg, #3f51b5 30%, #5c6bc0 90%)',
  color: theme.palette.common.white,
  '&:hover': {
    transform: 'translateY(-4px)',
    transition: 'transform 0.3s ease-in-out',
  },
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: 400,
  marginBottom: theme.spacing(4),
}));

// Sample data for charts
const earningsData = [
  {
    id: 'earnings',
    data: Array.from({ length: 30 }, (_, i) => ({
      x: format(new Date(2025, 0, i + 1), 'MMM dd'),
      y: Math.floor(Math.random() * 1000) + 500,
    })),
  },
];

const projectDistribution = [
  { id: 'Web Development', value: 35, color: '#3f51b5' },
  { id: 'Design', value: 25, color: '#f50057' },
  { id: 'Content Writing', value: 20, color: '#00bcd4' },
  { id: 'Marketing', value: 15, color: '#4caf50' },
  { id: 'Other', value: 5, color: '#ff9800' },
];

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <DashboardContainer maxWidth="xl">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Dashboard
        </Typography>
        <Tooltip title="Refresh data">
          <IconButton onClick={handleRefresh} className={isRefreshing ? 'animate-spin' : ''}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} md={4}>
          <StatsCard elevation={3}>
            <Box display="flex" alignItems="center" mb={2}>
              <TrendingUpIcon fontSize="large" />
              <Box ml={2}>
                <Typography variant="h6">Total Earnings</Typography>
                <Typography variant="h4">₹24,500</Typography>
              </Box>
            </Box>
            <Typography variant="body2">+15% from last month</Typography>
          </StatsCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard elevation={3}>
            <Box display="flex" alignItems="center" mb={2}>
              <WorkIcon fontSize="large" />
              <Box ml={2}>
                <Typography variant="h6">Active Projects</Typography>
                <Typography variant="h4">7</Typography>
              </Box>
            </Box>
            <Typography variant="body2">2 due this week</Typography>
          </StatsCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StatsCard elevation={3}>
            <Box display="flex" alignItems="center" mb={2}>
              <EmojiEventsIcon fontSize="large" />
              <Box ml={2}>
                <Typography variant="h6">Ranking</Typography>
                <Typography variant="h4">#42</Typography>
              </Box>
            </Box>
            <Typography variant="body2">Top 10% of freelancers</Typography>
          </StatsCard>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <ChartContainer>
            <Typography variant="h6" gutterBottom>Earnings Overview</Typography>
            <Box height={350}>
              <ResponsiveLine
                data={earningsData}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                curve="cardinal"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: -45,
                  legend: 'Date',
                  legendOffset: 40,
                  legendPosition: 'middle',
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Earnings (₹)',
                  legendOffset: -40,
                  legendPosition: 'middle',
                }}
                enablePoints={false}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]}
              />
            </Box>
          </ChartContainer>
        </Grid>

        <Grid item xs={12} lg={4}>
          <ChartContainer>
            <Typography variant="h6" gutterBottom>Project Distribution</Typography>
            <Box height={350}>
              <ResponsivePie
                data={projectDistribution}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                  },
                ]}
              />
            </Box>
          </ChartContainer>
        </Grid>

        <Grid item xs={12}>
          <TaskCoinStats
            completedTasks={24}
            pendingTasks={7}
            totalCoinsEarned={4850}
            weeklyProgress={75}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h5" gutterBottom>Recent Activity</Typography>
        <Paper elevation={2}>
          <Box p={3}>
            <Grid container spacing={2}>
              {[
                { title: 'Website Redesign Project', status: 'Completed', date: '2025-02-15', amount: '₹4,500' },
                { title: 'Logo Design for Student Club', status: 'In Progress', date: '2025-02-14', amount: '₹1,200' },
                { title: 'Content Writing Task', status: 'Under Review', date: '2025-02-13', amount: '₹800' },
              ].map((activity, index) => (
                <Grid item xs={12} key={index}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">{activity.title}</Typography>
                      <Typography variant="body2" color="textSecondary">{activity.date}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Typography
                        variant="body2"
                        sx={{
                          px: 2,
                          py: 0.5,
                          borderRadius: '16px',
                          bgcolor: activity.status === 'Completed' ? 'success.light' : 'warning.light',
                          color: activity.status === 'Completed' ? 'success.dark' : 'warning.dark',
                        }}
                      >
                        {activity.status}
                      </Typography>
                      <Typography variant="subtitle2" fontWeight="bold">{activity.amount}</Typography>
                    </Box>
                  </Box>
                  {index < 2 && <Box borderBottom={1} borderColor="divider" />}
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Box>
    </DashboardContainer>
  );
}