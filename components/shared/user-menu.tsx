"use client"

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

import { UserAvatar } from "@/components/shared/user-avatar"
import { logout } from "@/actions/logout.action"


export const UserMenu = () => {

    const handleLogout = () => {
        logout()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleLogout}>
                    <p className="text-destructive">Logout</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}