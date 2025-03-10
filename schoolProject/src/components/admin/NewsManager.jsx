import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { fetchNews, addNewsItem, updateNewsItem, deleteNewsItem } from "../../utils/adminService";

const NewsManager = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentNews, setCurrentNews] = useState({ title: "", content: "", imageUrl: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const newsData = await fetchNews();
      setNews(newsData || []);
    } catch (error) {
      console.error("Error loading news:", error);
      setSnackbar({
        open: true,
        message: "Failed to load news items",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item = null) => {
    if (item) {
      setCurrentNews(item);
      setIsEditing(true);
    } else {
      setCurrentNews({ title: "", content: "", imageUrl: "" });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentNews({
      ...currentNews,
      [name]: value,
    });
  };

  const handleSaveNews = async () => {
    try {
      if (isEditing) {
        await updateNewsItem(currentNews.id, currentNews);
        setSnackbar({
          open: true,
          message: "News item updated successfully",
          severity: "success",
        });
      } else {
        await addNewsItem(currentNews);
        setSnackbar({
          open: true,
          message: "News item added successfully",
          severity: "success",
        });
      }
      handleCloseDialog();
      loadNews();
    } catch (error) {
      console.error("Error saving news:", error);
      setSnackbar({
        open: true,
        message: "Failed to save news item",
        severity: "error",
      });
    }
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      try {
        await deleteNewsItem(id);
        setSnackbar({
          open: true,
          message: "News item deleted successfully",
          severity: "success",
        });
        loadNews();
      } catch (error) {
        console.error("Error deleting news:", error);
        setSnackbar({
          open: true,
          message: "Failed to delete news item",
          severity: "error",
        });
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Grid item>
          <Typography variant="h4">News Management</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => handleOpenDialog()} sx={{ mr: 1 }}>
            Add News Item
          </Button>
          <Button variant="outlined" component={Link} to="/admin/dashboard">
            Back to Dashboard
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Typography>Loading news items...</Typography>
      ) : (
        <Grid container spacing={3}>
          {news.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 2, textAlign: "center" }}>
                <Typography>No news items found. Add your first news item!</Typography>
              </Paper>
            </Grid>
          ) : (
            news.map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item.id}>
                <Card>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                  )}
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {item.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => handleOpenDialog(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteNews(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? "Edit News Item" : "Add News Item"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            name="title"
            value={currentNews.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Content"
            name="content"
            multiline
            rows={4}
            value={currentNews.content}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Image URL"
            name="imageUrl"
            value={currentNews.imageUrl || ""}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveNews} variant="contained">
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
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default NewsManager;
