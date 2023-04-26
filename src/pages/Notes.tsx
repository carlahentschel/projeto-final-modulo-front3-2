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
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import TaskType from '../Types/TaskType';
import { selectAll, setUser } from '../store/modules/UserSlice';

const MockTasks: TaskType[] = [
  {
    id: '1',
    task: 'Recado 1',
    detail: 'Teste teste teste teste teste',
    favorite: false,
  },
  {
    id: '2',
    task: 'Recado 2',
    detail: 'Teste teste teste teste teste',
    favorite: true,
  },
  {
    id: '3',
    task: 'Recado 3',
    detail: 'Teste teste teste teste teste',
    favorite: false,
  },
  {
    id: '4',
    task: 'Recado 4',
    detail: 'Teste teste teste teste teste',
    favorite: false,
  },
  {
    id: '5',
    task: 'Recado 5',
    detail: 'Teste teste teste teste teste',
    favorite: false,
  },
];

const Notes: React.FC = () => {
  const userLogged = useAppSelector((state) => state.user.user);
  const [open, setOpen] = React.useState(false);
  const tasksRedux = useAppSelector(selectAll);

  useEffect(() => {
    console.log(userLogged);
  }, [userLogged]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <Grid container gap={3} marginTop={3}>
              {userLogged.tasks.map((item) => (
                <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{ maxWidth: 350 }}>
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
                        <IconButton>
                          <Favorite />
                        </IconButton>
                      ) : (
                        <IconButton>
                          <FavoriteBorder />
                        </IconButton>
                      )}

                      <IconButton color="success">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="warning">
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
      <Fab
        color="primary"
        aria-label="add"
        size="small"
        sx={{ position: 'fixed', right: '20px', bottom: '20px' }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Criar um novo recado:</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="task" label="Tarefa" type="text" fullWidth variant="standard" />
          <TextField
            autoFocus
            margin="dense"
            id="detail"
            label="Detalhamento"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Notes;
