import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Welcome, {currentUser?.email}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* News Management */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                News Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add, edit, or delete news items for the homepage
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/admin/news">
                Manage News
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Academics Management */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Academics Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage academic content and information
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/admin/academics">
                Manage Academics
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Sports Management */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Sports Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage sports content, teams and events
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/admin/sports">
                Manage Sports
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Form Submissions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Form Submissions
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage admission and contact form submissions
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/admin/submissions">
                View Submissions
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* User Management */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                User Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage admin users and permissions
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" component={Link} to="/admin/users">
                Manage Users
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
