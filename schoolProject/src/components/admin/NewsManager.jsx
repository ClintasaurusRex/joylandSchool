import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Alert,
  Collapse,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { fetchNews, addNewsItem, updateNewsItem, deleteNewsItem } from "../../utils/adminService";

const NewsManager = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [editingId, setEditingId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    // Check if news items count reached the limit
    if (news.length >= 15) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [news]);

  const loadNews = async () => {
    try {
      setLoading(true);
      const newsData = await fetchNews();
      setNews(newsData);
    } catch (error) {
      console.error("Error loading news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (news.length >= 10 && !editingId) {
        // Show alert without submitting if trying to add a new item when already at limit
        setShowAlert(true);
        return;
      }

      if (editingId) {
        await updateNewsItem(editingId, formData);
      } else {
        await addNewsItem(formData);
      }
      resetForm();
      loadNews();
    } catch (error) {
      console.error("Error saving news:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      content: item.content,
      date: item.date,
    });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNewsItem(id);
      loadNews();
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        News Management
      </Typography>

      <Collapse in={showAlert}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          News limit reached (10 items). Please delete some older news items to free up space.
        </Alert>
      </Collapse>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {editingId ? "Edit News Item" : "Add News Item"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mr: 1 }}
                disabled={news.length >= 5 && !editingId}
              >
                {editingId ? "Update" : "Save"}
              </Button>
              {editingId && (
                <Button variant="outlined" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>
        News Items
      </Typography>

      {loading ? (
        <Typography>Loading news items...</Typography>
      ) : (
        <List>
          {news.length === 0 ? (
            <Typography>No news items found. Create your first one!</Typography>
          ) : (
            news.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <Box>
                    <IconButton edge="end" onClick={() => handleEdit(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
                sx={{ borderBottom: "1px solid #eee" }}
              >
                <ListItemText
                  primary={item.title}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {item.date}
                      </Typography>
                      {" — " + item.content.substring(0, 100) + "..."}
                    </>
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      )}
    </Box>
  );
};

export default NewsManager;
