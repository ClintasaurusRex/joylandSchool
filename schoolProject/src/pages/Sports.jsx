import React from "react";
import { Container, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

const Sports = () => {
  const sportsOffered = [
    {
      name: "Basketball",
      image: "/images/basketball.jpg",
      description:
        "Join our competitive basketball teams for both boys and girls. Practice sessions and regular tournaments throughout the year.",
    },
    {
      name: "Soccer",
      image: "/images/soccer.jpg",
      description:
        "Our soccer program includes junior and senior teams. Regular training and interschool competitions.",
    },
    {
      name: "Swimming",
      image: "/images/swimming.jpg",
      description:
        "Professional swimming instruction and competitive swim team opportunities available.",
    },
    {
      name: "Track & Field",
      image: "/images/track.jpg",
      description:
        "Comprehensive track and field program including sprinting, long-distance running, and field events.",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        School Sports Program
      </Typography>

      <Typography variant="h5" component="h2" align="center" sx={{ mb: 4 }}>
        Developing athletes and building character through sports excellence
      </Typography>

      <Grid container spacing={4}>
        {sportsOffered.map((sport, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image={sport.image}
                alt={sport.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  {sport.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {sport.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" component="h2" sx={{ mt: 6, mb: 3 }}>
        Sports Schedule
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h3">
                Fall Season (September - November)
              </Typography>
              <Typography variant="body1">
                • Soccer Practice: Mon & Wed 3:30-5:00 PM
                <br />
                • Swimming: Tue & Thu 3:30-5:00 PM
                <br />• Basketball Training: Fri 3:30-5:30 PM
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" component="h3">
                Spring Season (March - May)
              </Typography>
              <Typography variant="body1">
                • Track & Field: Mon & Wed 3:30-5:00 PM
                <br />
                • Basketball Games: Tue & Thu 4:00-6:00 PM
                <br />• Swimming Meets: Fri 3:30-5:30 PM
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Sports;
