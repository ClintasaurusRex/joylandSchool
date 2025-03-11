import { Box, Typography, Card, CardContent, Grid2, Button } from "@mui/material";
import "../styles/Contribute.scss";
import { useNavigate } from "react-router-dom";

const Contribute = () => {
  const navigate = useNavigate();
  const opportunities = [
    {
      title: "Teaching Assistant",
      description:
        "Support teachers by preparing lessons, encouraging students, marking assignments, awarding marks, and teaching. Help improve student performance, boost motivation, and enhance structured learning.",
    },
    {
      title: "Extracurricular Assistant",
      description:
        "Assist in either coaching football, athletics, music, drama, scouting, or environmental activities. Foster teamwork, creativity, discipline, and skill-building among students.",
    },
    {
      title: "Administrative Assistant",
      description:
        "Provide general office support by organizing files, managing communications, and assisting with scheduling. Ensure smooth operations, efficiency, and effective school administration.",
    },
    {
      title: "Artisans",
      description:
        "Carpenters make or repair furniture, plasterers plaster walls, tile setters lay tiles, and painters paint walls. Improve learning spaces, safety, and overall school aesthetics.",
    },
    {
      title: "Community Workers",
      description:
        "Social workers engage the community in supporting girls' education, while photographers capture impactful photos and videos. Strengthen fundraising, awareness, and documentation of school programs.",
    },
    {
      title: "Health Workers",
      description:
        "Assist with either health screenings, refer sick students to hospitals, implement health education programs, or prepare nutritious meals for nursery children. Improve student well-being, nutrition, and access to healthcare.",
    },
    {
      title: "Gardening Assistant",
      description:
        "Plant and maintain trees and flowers within the school, creating a greener, healthier environment. Enhance sustainability, aesthetics, and environmental awareness.",
    },
  ];

  const remoteOpportunities = [
    {
      title: "Grant Writer & Fundraiser",
      description:
        "Raise funds to build three additional toilets, ensuring safe and hygienic sanitation for students. Reduce congestion, prevent the spread of intestinal worms, and strengthen infrastructure to improve health conditions and enhance student safety.",
    },
    {
      title: "Social Media & Content Creator",
      description:
        "Manage social media platforms, create compelling content, and promote school initiatives to increase awareness and support. Boost engagement, attract donors, and inspire community involvement to strengthen educational programs and infrastructure.",
    },
  ];

  return (
    <Box sx={{ p: 6 }}>
      <Card>
        <Typography className="onsite-card" variant="h3" gutterBottom>
          Onsite Volunteer Opportunities
        </Typography>
        <Grid2
          className="job-grid"
          container
          spacing={3}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {opportunities.map((opportunity, index) => (
            <Grid2 item size={{ xs: 12, sm: 6, md: 7, lg: 3 }} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {opportunity.title}
                  </Typography>
                  <Typography variant="body1">{opportunity.description}</Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}

          <Button
            className="content-card-btn"
            variant="contained"
            color="primary"
            sx={{ mt: 20 }}
            onClick={() => navigate("/contact")}
          >
            Learn More
          </Button>
        </Grid2>
      </Card>

      <Card className="remote-card">
        <Typography className="onsite-card" variant="h3" sx={{ mt: 6, mb: 3 }}>
          Remote Volunteer Opportunities
        </Typography>
        <Grid2 className="job-grid" container spacing={3}>
          {remoteOpportunities.map((opportunity, index) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 7, lg: 3 }} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {opportunity.title}
                  </Typography>
                  <Typography variant="body1">{opportunity.description}</Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <Button
          className="content-card-btn"
          variant="contained"
          color="primary"
          sx={{ mb: 20, display: "block", mx: "auto" }}
          onClick={() => navigate("/contact")}
        >
          Learn More
        </Button>
      </Card>
    </Box>
  );
};

export default Contribute;
