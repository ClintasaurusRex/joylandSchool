import React, { useState } from "react";
import { Box, Tab, Tabs, Typography, Container, Paper } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import NewsManager from "./NewsManager";
import AcademicsManager from "./AcademicsManager";
import SportsManager from "./SportsManager";
import FormSubmissions from "./FormSubmissions";
import UserManager from "./UserManager";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const { currentUser, isAdmin } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Redirect if not logged in or not an admin
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin dashboard tabs">
            <Tab label="News" />
            <Tab label="Academics" />
            <Tab label="Sports" />
            <Tab label="Form Submissions" />
            <Tab label="User Management" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <NewsManager />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <AcademicsManager />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <SportsManager />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <FormSubmissions />
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <UserManager />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Dashboard;
