import React, { useState } from "react";
import { Box, Typography, Container, Paper, Tabs, Tab, Badge } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import NewsManager from "./NewsManager";
import FormSubmissions from "../admin/submissions/FormSubmissions";
import SportsManager from "./SportsManager";
import { useFormSubmissions } from "../../hooks/useFormSubmissions";

// TabPanel component to handle tab content display
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
  const { currentUser, isAdmin } = useAuth();
  const [tabValue, setTabValue] = useState(0);

  // Get form submissions data to check for notifications
  const { admissions, contacts } = useFormSubmissions();

  // Calculate total submissions count for notification badge
  const totalSubmissions = (admissions?.length || 0) + (contacts?.length || 0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Redirect if not logged in or not an admin
  if (!currentUser) {
    console.log("Dashboard redirecting: No current user");
    return <Navigate to="/admin/login" />;
  }

  if (!isAdmin) {
    console.log("Dashboard redirecting: Not an admin");
    return <Navigate to="/" />;
  }

  console.log("Dashboard rendering content");

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, boxShadow: "15px 21px 3px -2px rgba(0, 0, 0, 0.2)" }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        <Typography variant="body1" paragraph>
          Welcome to the admin dashboard, {currentUser.email}!
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin dashboard tabs">
            <Tab label="Overview" />
            <Tab label="News Management" />
            <Tab
              label={
                <Badge
                  badgeContent={totalSubmissions > 0 ? totalSubmissions : null}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": { fontSize: "0.8rem", height: "20px", minWidth: "20px" },
                  }}
                >
                  Form Submissions
                </Badge>
              }
            />
            <Tab label="Sports Management" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" paragraph>
              This dashboard allows you to manage various aspects of the school website.
            </Typography>

            <Box sx={{ mt: 4, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Available Features
              </Typography>
              <ul>
                <li>
                  News Management - Add, edit, and delete news items that appear on the homepage
                </li>
                <li>Form Submissions - View and manage admission requests and contact messages</li>
                <li>Sports Management - Add, edit, and delete sports programs</li>
              </ul>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <NewsManager />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <FormSubmissions />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <SportsManager />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Dashboard;
