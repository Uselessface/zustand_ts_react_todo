import Grid2 from "@mui/material/Unstable_Grid2";
import {Paper, Typography} from "@mui/material";
import {useToDoState} from "./state/todoState.ts";
import {AddTask} from "./components/AddTask.tsx";
import TaskList from "./components/TaskList.tsx";

function App() {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask
    ] = useToDoState(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask
    ])

    console.log(tasks)
    return (<Grid2 container>
            <Grid2 >
                <Paper elevation={3} sx={{minWidth: 600, p: 3, textAlign: "center"}}>
                    <Typography variant={"h3"} sx={{mb: 1}}>To Do App</Typography>
                    <section>
                        <AddTask
                            onAdd={(title: string) => {
                                if (title) {
                                    createTask(title)
                                }
                            }}
                        />
                    </section>
                    <section>
                        {!tasks.length && (
                            <Typography variant={'body1'}>
                                There is no tasks
                            </Typography>
                        )}
                        {tasks.map((task) => (<TaskList
                            id={task.id}
                            title={task.title}
                            key={task.id}
                            onDone={removeTask}
                            onEditMode={updateTask}
                            remove={removeTask}
                        />))}
                    </section>
                </Paper>
            </Grid2>
        </Grid2>
    )


}

export default App
