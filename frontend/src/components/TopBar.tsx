import {  SignedOut, UserButton } from "@clerk/clerk-react";
import { CiMusicNote1 } from "react-icons/ci";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const TopBar = () => {
    const {isAdmin} = useAuthStore();
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
        <div className="flex gap-2 items-center ">
            <CiMusicNote1 className="size-8 text-emerald-400"/>
            Tune Chat
        </div>
        <div className="flex items-center gap-4">
            {isAdmin && (
                <Link to={`/admin`} className={cn(buttonVariants({variant: "outline"}))}>
                    <LayoutDashboardIcon className="size-4 mr-2">
                    <p>Admin Dashboard</p>
                    </LayoutDashboardIcon>
                </Link>
            )}
            <SignedOut>
                <SignInOAuthButtons />
            </SignedOut>

            <UserButton />
        </div>
    </div>
  )
}

export default TopBar