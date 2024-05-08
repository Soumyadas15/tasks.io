import { DeleteModal } from "@/components/modals/delete-modal"
import { EditTaskModal } from "@/components/modals/edit-task-modal"
import { TaskModal } from "@/components/modals/task-modal"

export const ModalProvider = () => {
    return (
        <>
            <TaskModal/>
            <DeleteModal/>
            <EditTaskModal/>
        </>
    )
}