import React from 'react';
import { Button, Typography, Box, Grid} from '@mui/material';

function TodoItem({ todo, onDelete, onEdit }) {
    return (
        <Box bgcolor="#e8eaf6" sx={{ minWidth: 500, padding: 2, borderBottom: '1px solid #e0e0e0', marginBottom: 1 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                    <Typography sx={{ fontSize: 16 }}>
                        {todo.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {todo.description ? todo.description : 'No description provided.'}
                    </Typography>
                </Grid>
                <Grid item xs={4} container alignItems="center" justifyContent="flex-end">
                    <Button size="small" variant="outlined" color="primary" onClick={() => onEdit(todo.id)}>
                        Edit
                    </Button>
                    <Button size="small" variant="outlined" color="error" onClick={() => onDelete(todo.id)} style={{ marginLeft: '10px' }}>
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}




export default TodoItem;
