import { Favorite, FavoriteBorder } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import TaskType from '../Types/TaskType';
import {
 addNewTask, deleteTask, toggleFavorite, updateTask 
} from '../store/modules/UserSlice';
import { updateUser } from '../store/modules/UsersSlice';

const Notes: React.FC = () => {
  const userLogged = useAppSelector((state) => state.user.user);
  const [task, setTask] = React.useState({} as TaskType);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  useEffect(() => {
    if (!userLogged) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    dispatch(updateUser({ id: userLogged.email, changes: userLogged }));
  }, [userLogged]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    dispatch(
      addNewTask({
        ...task,
        favorite: false,
        id: `${Date.now()}`,
      })
    );

    setOpen(false);
  };

  const handleFavorite = (item: TaskType) => {
    dispatch(toggleFavorite(item.id));
  };

  const handleEdit = (item: TaskType) => {
    setOpenEdit(true);
    setTask(item);
  };

  const handleDelete = (item: TaskType) => {
    dispatch(deleteTask(item.id));
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSaveEdit = () => {
    dispatch(updateTask(task));
    handleCloseEdit();
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <ResponsiveAppBar usuarioLogadoEmail={`Olá, ${userLogged.email}!`} />
        </Grid>

        <Grid item xs={12}>
          <Container sx={{ marginTop: '20px' }}>
            <Typography variant="h4">Meus recados:</Typography>
            <Divider />
            <Grid container gap={2} marginTop={3}>
              {userLogged.tasks.map((item) => (
                <Grid key={item.id} item xs={12} sm={6} md={3}>
                  <Card sx={{ maxWidth: 380 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.task}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.detail}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {item.favorite ? (
                        <IconButton onClick={() => handleFavorite(item)} color="error">
                          <Favorite />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => handleFavorite(item)} color="inherit">
                          <FavoriteBorder />
                        </IconButton>
                      )}
                      <IconButton onClick={() => handleEdit(item)} color="success">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(item)} color="warning">
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <Fab color="primary" aria-label="add" size="small" sx={{ position: 'fixed', right: '20px', bottom: '20px' }} onClick={handleClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Criar um novo recado:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="task"
            label="Tarefa"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTask((state) => ({ ...state, task: e.target.value }))}
          />
          <TextField
            autoFocus
            margin="dense"
            id="detail"
            label="Detalhamento"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTask((state) => ({ ...state, detail: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Editar um recado:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={task.task}
            margin="dense"
            id="task"
            label="Tarefa"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTask((state) => ({ ...state, task: e.target.value }))}
          />
          <TextField
            autoFocus
            value={task.detail}
            margin="dense"
            id="detail"
            label="Detalhamento"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTask((state) => ({ ...state, detail: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancelar</Button>
          <Button onClick={handleSaveEdit}>Editar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Notes;
