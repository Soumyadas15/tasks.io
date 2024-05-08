"use client"

import { Task } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Check, Cross, MoreHorizontal, Pencil, Trash, Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { useModal } from "@/hooks/use-modal-store"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"




export const columns: ColumnDef<Task>[] = [

  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const task = row.original

        return (
            <span className="font-bold px-4">
                {task.title}
            </span>
        );
    }
  },

  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const task = row.original

        return (
            <span className="px-4">
                {task.priority}
            </span>
        );
    }
  },

  {
    accessorKey: "dueDate",
    header: "Due date",
    cell: ({ row }) => {
        const task = row.original

        return (
            <span className="">
                {format(new Date(task.dueDate), "MMM do yyyy")}
            </span>
        );
    }
  },
  {
    accessorKey: "hasCompleted",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const task = row.original

        return (
            <span className="px-4">
                {task.hasCompleted ? (
                    <Badge className="bg-emerald-500/15 text-green-600">
                        Complete
                    </Badge>
                ) : (
                    <Badge className="bg-destructive/15 text-destructive">
                        Incomplete
                    </Badge>
                )}
            </span>
        );
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const task = row.original

      const taskId = task.id;
      const { onOpen } = useModal();
      const router = useRouter();

      const markAsComplete = async(task : Task) => {
        axios.put(`/api/tasks/${task.id}`, { updatedStatus: true })
        .then(() => {
            router.refresh();
            toast.success('Marked as complete');
        }) .catch((error) => {
            toast.error(error.response.data);
        })
      }

      const markAsInComplete = async(task : Task) => {
        axios.put(`/api/tasks/${task.id}`, { updatedStatus: false })
        .then(() => {
            router.refresh();
            toast.success('Marked as incomplete');
        }) .catch((error) => {
            toast.error(error.response.data);
        })
      }

 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onOpen('editTaskModal', taskId, task)}
              className="flex items-center gap-2"
            >
             <Pencil size={20}/>
              Edit task
            </DropdownMenuItem>

            {!task.hasCompleted ? (
                <DropdownMenuItem
                    onClick={() => markAsComplete(task)}
                    className="flex items-center gap-2"
                >
                    <Check size={20}/>
                    Mark as complete
                </DropdownMenuItem>
            ) : (
                <DropdownMenuItem
                    onClick={() => markAsInComplete(task)}
                    className="flex items-center gap-2"
                >
                    <X size={20}/>
                    Mark as incomplete
                </DropdownMenuItem>
            )}
            

            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={() => onOpen('deleteModal', taskId)}
                className="text-destructive flex items-center gap-2"
            >
                <Trash2 size={20}/>
                Delete Task
            </DropdownMenuItem>


          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]