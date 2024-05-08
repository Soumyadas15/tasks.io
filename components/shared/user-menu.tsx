"use client"

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"

import { UserAvatar } from "@/components/shared/user-avatar"
import { logout } from "@/actions/logout.action"
import { useRouter } from "next/navigation"
import { User } from "@prisma/client"

interface UserMenuProps{
    user: User;
}
export const UserMenu = ({
    user,
} : UserMenuProps) => {

    const router = useRouter();

    const handleLogout = () => {
        logout()
        .then(() => {
            router.refresh();
        })
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar user={user}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleLogout}>
                    <p className="text-destructive">Logout</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}