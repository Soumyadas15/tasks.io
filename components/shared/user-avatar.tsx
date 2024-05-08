"use client"

import { 
    Avatar, 
    AvatarFallback, 
    AvatarImage 
} from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/use-current-user"

export const UserAvatar = () => {

    const user = useCurrentUser();

    return (
        <Avatar>
            <AvatarImage src={user?.image ? user.image : "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}