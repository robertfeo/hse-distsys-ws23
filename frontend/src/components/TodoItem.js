import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { Button } from "@material-tailwind/react";

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
                    <Button variant='text' size='sm' className="rounded-full" onClick={() => onEdit(todo.id)}>
                        Edit
                    </Button>
                    <Button variant='text' size='sm' className="rounded-full" color='red' onClick={() => onDelete(todo.id)}>
                        Delete
                    </Button>
                    <Button variant='text' size='sm' color='red' className="rounded-full flex items-center gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                            />
                        </svg>
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}




export default TodoItem;
