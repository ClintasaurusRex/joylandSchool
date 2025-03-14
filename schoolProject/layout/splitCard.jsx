<Grid container spacing={4} direction="column">
  <Grid item xs={12}>
    <Card
      sx={{
        display: "flex",
        maxWidth: 800,
        mx: "auto",
        height: 250,
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: "40%", position: "relative" }}>
        <Box
          component="img"
          src="/blackboard.jpeg"
          alt="Academic Excellence"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
          sx={{ mt: 2, alignSelf: "flex-start" }}
          onClick={() => navigate("/academic")}
        >
          Learn More
        </Button>
      </Box>
    </Card>
  </Grid>

  {/* Repeat similar structure for other cards */}
</Grid>;
