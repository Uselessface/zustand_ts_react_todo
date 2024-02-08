import React, {useState} from 'react';
import {Checkbox, IconButton, TextField, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import ModeEditSharpIcon from '@mui/icons-material/ModeEditSharp';
import Grid2 from "@mui/material/Unstable_Grid2";
import AddTaskIcon from '@mui/icons-material/AddTask';

interface TaskListProps {
    id: string,
    title: string,
    onDone: (id: string) => void,
    onEditMode: (id: string, title: string) => void,
    remove: (id: string) => void
}

const TaskList: React.FC<TaskListProps> = (props) => {

    const [taskTitle, setTaskTitle] = useState(props.title)
    const [checkedState, setCheckedState] = useState(false);
    const [editMode, setEditMode] = useState(false)
    const checkTask = () => setCheckedState(!checkedState)
    return (
        <Grid2 container
               sx={{alignItems: "center", justifyContent: 'space-around', maxWidth: "80%", marginInline: "auto"}}>
            <Checkbox
                color={'primary'}
                checked={checkedState}
                onClick={checkTask}
                disabled={editMode}
                onChange={(e) => {
                    if (e.target.checked) {
                        props.onDone(props.id)
                    }
                }}
            ></Checkbox>
            <Grid2 xs={8}>
                {editMode
                    ?
                    (<TextField
                        variant={'standard'}
                        value={taskTitle}
                        onChange={(event) => {
                            setTaskTitle(event.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                props.onEditMode(props.id, taskTitle);
                                setEditMode(false)
                            }
                        }}
                    >
                    </TextField>)
                    :
                    <Typography
                        variant={'h6'}
                    >
                        {taskTitle}
                    </Typography>}
            </Grid2>
            {editMode ? (
                    <IconButton
                        color={'primary'}
                        onClick={() => {
                            props.onEditMode(props.id, taskTitle);
                            setEditMode(false)
                        }}
                    >
                        <AddTaskIcon/>
                    </IconButton>
                ) :
                (<IconButton
                    color={'primary'}
                    onClick={() => {
                        setEditMode(true)
                    }}
                >
                    <ModeEditSharpIcon/>
                </IconButton>)
            }
            <IconButton
                color={'primary'}
                onClick={() => {
                    if (confirm('delete task ?')) {
                        props.remove(props.id)
                    }
                }}
            >
                <Delete/>
            </IconButton>
        </Grid2>
    );
};

export default TaskList;