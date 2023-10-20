import React from 'react';
import { Button, Typography, Box, Grid } from '@mui/material';

function TodoItem({ todo, onDelete, onEdit }) {
    return (
        <Box sx={{ minWidth: 500, padding: 2, borderBottom: '1px solid #e0e0e0', marginBottom: 1 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                    <Typography sx={{ fontSize: 16 }}>
                        {todo.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {todo.description}
                    </Typography>
                </Grid>
                <Grid item xs={4} container justifyContent="flex-end">
                    <Button size="small" variant="contained" color="primary" onClick={() => onEdit(todo.id)}>
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
