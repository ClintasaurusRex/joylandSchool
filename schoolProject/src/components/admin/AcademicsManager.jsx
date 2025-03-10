import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Alert,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  fetchAcademics,
  addAcademicContent,
  updateAcademicContent,
  deleteAcademicContent,
} from "../../utils/adminService";

const AcademicsManager = () => {
  const [academics, setAcademics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const [currentItem, setCurrentItem] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "",
    order: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const categories = ["Curriculum", "Programs", "Faculty", "Facilities", "Achievements", "Events"];

  useEffect(() => {
    loadAcademics();
  }, []);

  const loadAcademics = async () => {
    setLoading(true);
    try {
      const data = await fetchAcademics();
      setAcademics(data || []);
    } catch (error) {
      console.error("Error loading academics:", error);
      setSnackbar({
        open: true,
        message: "Failed to load academic content",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setCurrentItem(item);
      setIsEditing(true);
    } else {
      setCurrentItem({
        title: "",
        description: "",
        category: "",
        imageUrl: "",
        order: academics.length + 1,
      });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: value,
    });
  };

  const handleSaveItem = async () => {
    if (!currentItem.title || !currentItem.description || !currentItem.category) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        severity: "error",
      });
      return;
    }

    try {
      if (isEditing) {
        await updateAcademicContent(currentItem.id, currentItem);
        setSnackbar({
          open: true,
          message: "Academic content updated successfully",
          severity: "success",
        });
      } else {
        await addAcademicContent(currentItem);
        setSnackbar({
          open: true,
          message: "Academic content added successfully",
          severity: "success",
        });
      }
      handleCloseDialog();
      loadAcademics();
    } catch (error) {
      console.error("Error saving academic content:", error);
      setSnackbar({
        open: true,
        message: "Failed to save academic content",
        severity: "error",
      });
    }
  };

  const handleDeleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this academic content?")) {
      try {
        await deleteAcademicContent(id);
        setSnackbar({
          open: true,
          message: "Academic content deleted successfully",
          severity: "success",
        });
        loadAcademics();
      } catch (error) {
        console.error("Error deleting academic content:", error);
        setSnackbar({
          open: true,
          message: "Failed to delete academic content",
          severity: "error",
        });
      }
    }
  };

  const categoryItems = () => {
    const sorted = [...academics].sort((a, b) => {
      // First sort by category
      if (a.category < b.category) return -1;
      if (a.category > b.category) return 1;

      // Then by order if category is the same
      return (a.order || 0) - (b.order || 0);
    });

    let result = [];
    let currentCategory = null;

    sorted.forEach((item) => {
      if (item.category !== currentCategory) {
        currentCategory = item.category;
        result.push(
          <Grid item xs={12} key={`category-${currentCategory}`}>
            <Typography variant="h6" sx={{ mt: 3, mb: 1, borderBottom: "1px solid #eee", pb: 1 }}>
              {currentCategory}
            </Typography>
          </Grid>
        );
      }

      result.push(
        <Grid item xs={12} md={6} lg={4} key={item.id}>
          <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {item.imageUrl && (
              <Box sx={{ pt: "56.25%", position: "relative", overflow: "hidden" }}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{
                    position: "absolute",
                    top: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            )}
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {item.description.length > 150
                  ? `${item.description.substring(0, 150)}...`
                  : item.description}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => handleOpenDialog(item)} aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteItem(item.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      );
    });

    return result;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Grid item>
          <Typography variant="h4">Academics Management</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mr: 1 }}>
            Add Academic Content
          </Button>
          <Button variant="outlined" component={Link} to="/admin/dashboard">
            Back to Dashboard
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography>Loading academic content...</Typography>
        </Paper>
      ) : academics.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            No academic content found
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Get started by adding academic information for your school
          </Typography>
          <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mt: 2 }}>
            Add First Content
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {categoryItems()}
        </Grid>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? "Edit Academic Content" : "Add Academic Content"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={currentItem.title}
            onChange={handleInputChange}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={currentItem.category}
              label="Category"
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            rows={4}
            value={currentItem.description}
            onChange={handleInputChange}
          />

          <TextField
            margin="normal"
            fullWidth
            id="imageUrl"
            label="Image URL"
            name="imageUrl"
            value={currentItem.imageUrl || ""}
            onChange={handleInputChange}
            helperText="Optional: URL to an image for this academic content"
          />

          <TextField
            margin="normal"
            fullWidth
            id="order"
            label="Display Order"
            name="order"
            type="number"
            value={currentItem.order || 0}
            onChange={handleInputChange}
            helperText="Order in which this item appears within its category (lower numbers first)"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>

          <Button onClick={handleSaveItem} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
export default AcademicsManager;
