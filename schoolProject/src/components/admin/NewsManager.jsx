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
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { fetchNews, addNewsItem, updateNewsItem, deleteNewsItem } from "../../utils/adminService";
import LimitAlert from "../admin/submissions/ui/LimitAlert";
import useLimitAlert from "../../hooks/useLimitAlert";

const NewsManager = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const { showAlert, closeAlert, isAtLimit } = useLimitAlert(news, 4);

  useEffect(() => {
    loadNews();
  }, []);

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
      if (isAtLimit && !editingId) {
        return;
      }

      setSaveLoading(true);

      if (editingId) {
        await updateNewsItem(editingId, formData);
      } else {
        await addNewsItem(formData);
      }
      resetForm();
      loadNews();
    } catch (error) {
      console.error("Error saving news:", error);
    } finally {
      setSaveLoading(false);
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

  const confirmDelete = (id) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;

    try {
      setDeleteLoading(true);
      await deleteNewsItem(itemToDelete);
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
      loadNews();
    } catch (error) {
      console.error("Error deleting news:", error);
    } finally {
      setDeleteLoading(false);
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

      <LimitAlert show={showAlert} onClose={closeAlert} itemType="News" limit={4} />

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
                disabled={saveLoading || (isAtLimit && !editingId)}
              >
                {saveLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : editingId ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Button>
              {editingId && (
                <Button variant="outlined" onClick={resetForm} disabled={saveLoading}>
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
                    <IconButton
                      edge="end"
                      onClick={() => handleEdit(item)}
                      disabled={saveLoading || deleteLoading}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => confirmDelete(item.id)}
                      disabled={saveLoading || deleteLoading}
                    >
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

      <Dialog
        open={deleteConfirmOpen}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this news item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} disabled={deleteLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            disabled={deleteLoading}
            autoFocus
          >
            {deleteLoading ? <CircularProgress size={24} color="inherit" /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default NewsManager;
