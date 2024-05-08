import { Task } from "@prisma/client"
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface TasksClientProps{
    tasks: Task[];
}

export const TasksClient = ({
    tasks,
} : TasksClientProps) => {


    if(tasks.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <h1 className="text-3xl font-bold">No tasks yet</h1>
            </div>
        )
    }


    return (
        <div className="w-full h-full  flex flex-col">
            <div className="h-[10%] w-full flex items-center">
                <h1 className="text-3xl font-bold">Current tasks</h1>
            </div>
            <div className="h-[90%] w-full overflow-hidden overflow-y-scroll">
                <DataTable columns={columns} data={tasks}/>
            </div>
        </div>
    )
} 