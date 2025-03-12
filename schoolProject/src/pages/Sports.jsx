import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import { fetchSports } from "../utils/adminService";

const Sports = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSports = async () => {
      try {
        setLoading(true);
        const sportsData = await fetchSports();
        setSports(sportsData);
      } catch (error) {
        console.error("Error loading sports:", error);
        setError("Failed to load sports information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadSports();
  }, []);

  // Default image if none is provided
  const defaultImage = "https://source.unsplash.com/random/300x200/?sports";

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Sports Programs
      </Typography>

      <Typography variant="h6" paragraph align="center" sx={{ mb: 4 }}>
        Discover our diverse range of sports activities for students of all ages and skill levels
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : sports.length === 0 ? (
        <Typography align="center">
          No sports programs are currently available. Please check back later.
        </Typography>
      ) : (
        <Grid container sx={{ justifyContent: "center" }}>
          {sports.map((sport) => (
            <Grid
              item
              xs={12}
              md={4}
              key={sport.id}
              sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={sport.imageUrl || defaultImage}
                  alt={sport.name}
                />
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {sport.name}
                  </Typography>

                  <Chip
                    label={sport.level.charAt(0).toUpperCase() + sport.level.slice(1)}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />

                  <Typography variant="body1" paragraph>
                    {sport.description}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Schedule:
                    </Typography>
                    <Typography variant="body2">{sport.schedule}</Typography>
                  </Box>

                  {sport.coach && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Coach:
                      </Typography>
                      <Typography variant="body2">{sport.coach}</Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Sports;
