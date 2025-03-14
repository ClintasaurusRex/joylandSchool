<Grid container spacing={4} direction="column">
  <Grid item xs={12}>
    <Card
      sx={{
        position: "relative",
        height: 300,
        maxWidth: 800,
        mx: "auto",
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src="/blackboard.jpeg"
        alt="Academic Excellence"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.7)",
        }}
      />
      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          bgcolor: "rgba(255,255,255,0.8)",
          p: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Academic Excellence
        </Typography>
        <Typography>
          Our commitment to high academic standards ensures students reach their full potential.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate("/academic")}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  </Grid>

  {/* Repeat similar structure for other cards */}
</Grid>;
