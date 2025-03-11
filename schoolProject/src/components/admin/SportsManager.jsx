import React, { useState, useEffect } from 'react';
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
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  fetchSports,
  addSport,
  updateSport,
  deleteSport,
} from '../../utils/adminService';

const SportsManager = () => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    schedule: '',
    scheduleDays: [],
    scheduleStartHour: '3',
    scheduleStartMinute: '00',
    scheduleStartAmPm: 'PM',
    scheduleEndHour: '4',
    scheduleEndMinute: '00',
    scheduleEndAmPm: 'PM',
    coach: '',
    level: 'beginner',
    imageUrl: '',
  });

  // Dialog states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
  const [currentSportId, setCurrentSportId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sportToDelete, setSportToDelete] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  useEffect(() => {
    loadSports();
  }, []);

  const loadSports = async () => {
    try {
      setLoading(true);
      const sportsData = await fetchSports();
      setSports(sportsData);
    } catch (error) {
      console.error('Error loading sports:', error);
      setError('Failed to load sports. Please try again.');
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

  const handleAddClick = () => {
    setFormData({
      name: '',
      description: '',
      schedule: '',
      scheduleDays: [],
      scheduleStartHour: '3',
      scheduleStartMinute: '00',
      scheduleStartAmPm: 'PM',
      scheduleEndHour: '4',
      scheduleEndMinute: '00',
      scheduleEndAmPm: 'PM',
      coach: '',
      level: 'beginner',
      imageUrl: '',
    });
    setDialogMode('add');
    setDialogOpen(true);
  };

  const handleEditClick = (sport) => {
    let scheduleDays = [];
    let scheduleStartHour = '3';
    let scheduleStartMinute = '00';
    let scheduleStartAmPm = 'PM';
    let scheduleEndHour = '4';
    let scheduleEndMinute = '00';
    let scheduleEndAmPm = 'PM';

    if (sport.schedule) {
      try {
        const parts = sport.schedule.split('|');
        if (parts.length === 2) {
          scheduleDays = parts[0].trim().split(', ');

          const timeParts = parts[1].trim().split(' - ');
          if (timeParts.length === 2) {
            const startTime = timeParts[0].trim().split(' ');
            if (startTime.length === 2) {
              const [hour, minute] = startTime[0].split(':');
              scheduleStartHour = hour;
              scheduleStartMinute = minute;
              scheduleStartAmPm = startTime[1];
            }

            const endTime = timeParts[1].trim().split(' ');
            if (endTime.length === 2) {
              const [hour, minute] = endTime[0].split(':');
              scheduleEndHour = hour;
              scheduleEndMinute = minute;
              scheduleEndAmPm = endTime[1];
            }
          }
        }
      } catch (e) {
        console.error('Error parsing schedule:', e);
      }
    }

    setFormData({
      name: sport.name,
      description: sport.description,
      schedule: sport.schedule,
      scheduleDays,
      scheduleStartHour,
      scheduleStartMinute,
      scheduleStartAmPm,
      scheduleEndHour,
      scheduleEndMinute,
      scheduleEndAmPm,
      coach: sport.coach || '',
      level: sport.level || 'beginner',
      imageUrl: sport.imageUrl || '',
    });
    setCurrentSportId(sport.id);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleDeleteClick = (sport) => {
    setSportToDelete(sport);
    setDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setError('');
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSportToDelete(null);
  };

  const formatScheduleForDisplay = () => {
    if (formData.scheduleDays.length === 0) {
      return 'Schedule not specified';
    }

    const days = formData.scheduleDays.join(', ');
    const startTime = `${formData.scheduleStartHour}:${formData.scheduleStartMinute} ${formData.scheduleStartAmPm}`;
    const endTime = `${formData.scheduleEndHour}:${formData.scheduleEndMinute} ${formData.scheduleEndAmPm}`;

    return `${days} | ${startTime} - ${endTime}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setFormSubmitting(true);

    try {
      if (
        !formData.name ||
        !formData.description ||
        formData.scheduleDays.length === 0
      ) {
        throw new Error('Please fill out all required fields');
      }

      const formattedSchedule = formatScheduleForDisplay();

      const dataToSubmit = {
        ...formData,
        schedule: formattedSchedule,
      };

      if (dialogMode === 'add') {
        await addSport(dataToSubmit);
        setSuccess('Sport added successfully!');
      } else {
        await updateSport(currentSportId, dataToSubmit);
        setSuccess('Sport updated successfully!');
      }

      await loadSports();
      setDialogOpen(false);
    } catch (error) {
      console.error('Error submitting sport:', error);
      setError(error.message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      setFormSubmitting(true);
      await deleteSport(sportToDelete.id);
      setSuccess('Sport deleted successfully!');
      await loadSports();
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting sport:', error);
      setError('Failed to delete sport. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant='h5'>Sports Management</Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add New Sport
        </Button>
      </Box>

      {error && (
        <Alert severity='error' sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity='success' sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Paper elevation={2} sx={{ p: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : sports.length === 0 ? (
          <Typography variant='body1' sx={{ p: 2, textAlign: 'center' }}>
            No sports available. Click "Add New Sport" to create one.
          </Typography>
        ) : (
          <List>
            {sports.map((sport) => (
              <React.Fragment key={sport.id}>
                <ListItem
                  secondaryAction={
                    <Box>
                      <IconButton
                        edge='end'
                        aria-label='edit'
                        onClick={() => handleEditClick(sport)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => handleDeleteClick(sport)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={sport.name}
                    secondary={
                      <>
                        <Typography component='span' variant='body2'>
                          {sport.description.substring(0, 100)}
                          {sport.description.length > 100 ? '...' : ''}
                        </Typography>
                        <br />
                        <Typography
                          component='span'
                          variant='body2'
                          color='text.secondary'
                        >
                          Schedule: {sport.schedule}
                        </Typography>
                        {sport.coach && (
                          <>
                            <br />
                            <Typography
                              component='span'
                              variant='body2'
                              color='text.secondary'
                            >
                              Coach: {sport.coach}
                            </Typography>
                          </>
                        )}
                      </>
                    }
                  />
                </ListItem>
                <Divider component='li' />
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      {/* Add/Edit Sport Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>
          {dialogMode === 'add' ? 'Add New Sport' : 'Edit Sport'}
        </DialogTitle>
        <DialogContent>
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='name'
              label='Sport Name'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              multiline
              rows={4}
              id='description'
              label='Description'
              name='description'
              value={formData.description}
              onChange={handleChange}
            />
            <Typography variant='subtitle1' sx={{ mt: 2, mb: 1 }}>
              Schedule
            </Typography>
            <FormControl fullWidth margin='normal' required>
              <InputLabel id='scheduleDays-label' shrink>
                Days
              </InputLabel>
              <Select
                labelId='scheduleDays-label'
                id='scheduleDays'
                multiple
                value={formData.scheduleDays}
                onChange={(e) =>
                  setFormData({ ...formData, scheduleDays: e.target.value })
                }
                renderValue={(selected) => selected.join(', ')}
                displayEmpty
                label='Days'
                notched
              >
                <MenuItem value='Monday'>Monday</MenuItem>
                <MenuItem value='Tuesday'>Tuesday</MenuItem>
                <MenuItem value='Wednesday'>Wednesday</MenuItem>
                <MenuItem value='Thursday'>Thursday</MenuItem>
                <MenuItem value='Friday'>Friday</MenuItem>
                <MenuItem value='Saturday'>Saturday</MenuItem>
                <MenuItem value='Sunday'>Sunday</MenuItem>
              </Select>
            </FormControl>

            <Typography variant='subtitle2' sx={{ mt: 2, mb: 2 }}>
              Start Time
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id='start-hour-label' shrink>
                    Hour
                  </InputLabel>
                  <Select
                    labelId='start-hour-label'
                    id='scheduleStartHour'
                    value={formData.scheduleStartHour}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduleStartHour: e.target.value,
                      })
                    }
                    displayEmpty
                    label='Hour'
                    notched
                  >
                    {[...Array(12)].map((_, i) => (
                      <MenuItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id='start-minute-label' shrink>
                    Minute
                  </InputLabel>
                  <Select
                    labelId='start-minute-label'
                    id='scheduleStartMinute'
                    value={formData.scheduleStartMinute}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduleStartMinute: e.target.value,
                      })
                    }
                    displayEmpty
                    label='Minute'
                    notched
                  >
                    <MenuItem value='00'>00</MenuItem>
                    <MenuItem value='15'>15</MenuItem>
                    <MenuItem value='30'>30</MenuItem>
                    <MenuItem value='45'>45</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id='start-ampm-label' shrink>
                    AM/PM
                  </InputLabel>
                  <Select
                    labelId='start-ampm-label'
                    id='scheduleStartAmPm'
                    value={formData.scheduleStartAmPm}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduleStartAmPm: e.target.value,
                      })
                    }
                    displayEmpty
                    label='AM/PM'
                    notched
                  >
                    <MenuItem value='AM'>AM</MenuItem>
                    <MenuItem value='PM'>PM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Typography variant='subtitle2' sx={{ mt: 2, mb: 2 }}>
              End Time
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id='end-hour-label' shrink>
                    Hour
                  </InputLabel>
                  <Select
                    labelId='end-hour-label'
                    id='scheduleEndHour'
                    value={formData.scheduleEndHour}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduleEndHour: e.target.value,
                      })
                    }
                    displayEmpty
                    label='Hour'
                    notched
                  >
                    {[...Array(12)].map((_, i) => (
                      <MenuItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id='end-minute-label' shrink>
                    Minute
                  </InputLabel>
                  <Select
                    labelId='end-minute-label'
                    id='scheduleEndMinute'
                    value={formData.scheduleEndMinute}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduleEndMinute: e.target.value,
                      })
                    }
                    displayEmpty
                    label='Minute'
                    notched
                  >
                    <MenuItem value='00'>00</MenuItem>
                    <MenuItem value='15'>15</MenuItem>
                    <MenuItem value='30'>30</MenuItem>
                    <MenuItem value='45'>45</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id='end-ampm-label' shrink>
                    AM/PM
                  </InputLabel>
                  <Select
                    labelId='end-ampm-label'
                    id='scheduleEndAmPm'
                    value={formData.scheduleEndAmPm}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduleEndAmPm: e.target.value,
                      })
                    }
                    displayEmpty
                    label='AM/PM'
                    notched
                  >
                    <MenuItem value='AM'>AM</MenuItem>
                    <MenuItem value='PM'>PM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              margin='normal'
              fullWidth
              id='coach'
              label='Coach Name'
              name='coach'
              value={formData.coach}
              onChange={handleChange}
            />
            <FormControl fullWidth margin='normal'>
              <InputLabel id='level-label'>Level</InputLabel>
              <Select
                labelId='level-label'
                id='level'
                name='level'
                value={formData.level}
                label='Level'
                onChange={handleChange}
              >
                <MenuItem value='beginner'>Beginner</MenuItem>
                <MenuItem value='intermediate'>Intermediate</MenuItem>
                <MenuItem value='advanced'>Advanced</MenuItem>
                <MenuItem value='all'>All Levels</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin='normal'
              fullWidth
              id='imageUrl'
              label='Image URL (optional)'
              name='imageUrl'
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={formSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant='contained'
            disabled={formSubmitting}
            startIcon={formSubmitting ? <CircularProgress size={20} /> : null}
          >
            {formSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {sportToDelete?.name}? This action
            cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={formSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color='error'
            disabled={formSubmitting}
            startIcon={formSubmitting ? <CircularProgress size={20} /> : null}
          >
            {formSubmitting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SportsManager;
