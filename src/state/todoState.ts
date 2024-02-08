import {create} from "zustand";
import {v1} from "uuid";
import {persist, createJSONStorage, devtools} from "zustand/middleware";

interface Task {
    id: string;
    title: string;
    createdAt: number;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void
}

export const useToDoState = create<ToDoStore>()(
    devtools(
    persist(
        (set, get) => ({
            tasks: [],
            createTask: (title: string) => {
                const newTask = {
                    id: v1(),
                    title,
                    createdAt: Date.now()
                }
                set({tasks: [newTask, ...get().tasks]})
            },
            updateTask: (id: string, title: string) => {
                set({
                    tasks: get().tasks.map(task => ({
                        ...task,
                        title: task.id === id ? title : task.title
                    }))
                })
            },
            removeTask: (id: string) => set({tasks: get().tasks.filter((task) => task.id !== id)})
        }),
        {
            name: 'tasks-storage',
            storage: createJSONStorage(() => sessionStorage)
        }
    ),))

/*
export const useBearStore = create(
    persist(
        (set, get) => ({
            bears: 0,
            addABear: () => set({ bears: get().bears + 1 }),
        }),
        {
            name: 'food-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)*/
