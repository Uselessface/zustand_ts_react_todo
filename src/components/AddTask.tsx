import { Button, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";
import React, {useCallback, useState} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";

interface AddTaskProps {
    onAdd: (title: string) => void
}



export const AddTask: React.FC<AddTaskProps> = (props) => {
    const [inputValue, setInputValue] = useState("")
    const addTask = useCallback(() => {
        props.onAdd(inputValue);
        setInputValue('')
    }, [inputValue])
    return <Grid2 container sx={{alignItems:'stretch', justifyContent:'center', mb:2}}>
        <TextField
            size={'small'}
            variant={"outlined"}
            label={"Add new task"}
            value={inputValue}
            onChange={(e) => {
                setInputValue(e.target.value)
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    addTask()
                }
            }}
        ></TextField>
        <Button onClick={addTask} variant={'contained'} sx={{alignItems: 'stretch'}}>
            <Add></Add>
        </Button>
    </Grid2>
}

