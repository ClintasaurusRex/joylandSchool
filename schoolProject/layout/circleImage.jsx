<Grid container spacing={4}>
  <Grid item xs={12} md={4}>
    <Card
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        component="img"
        src="/blackboard.jpeg"
        alt="Academic Excellence"
        sx={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          objectFit: "cover",
          mb: 2,
          border: "4px solid #2196F3",
        }}
      />
      <Typography variant="h5" gutterBottom align="center">
        Academic Excellence
      </Typography>
      <Typography align="center">
        Our commitment to high academic standards ensures students reach their full potential.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: "auto", pt: 2 }}
        onClick={() => navigate("/academic")}
      >
        Learn More
      </Button>
    </Card>
  </Grid>

  {/* Repeat similar structure for other cards, but in a row instead of column */}
</Grid>;
