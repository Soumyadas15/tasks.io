import { LoginButton } from "@/components/auth/login-button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Navbar } from "@/components/shared/navbar";
import { TasksClient } from "@/components/tasks/tasks-client";
import { Button } from "@/components/ui/button";
import { getTasks } from "@/data/task";
import Image from "next/image";

export default async function Home() {

  const tasks = await getTasks();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-[9%]">
        <Navbar/>
      </div>
      <div className="w-full h-[91%]  px-4 md:px-14 py-6">
        <TasksClient tasks={tasks!}/>
      </div>
    </div>

  );
}
