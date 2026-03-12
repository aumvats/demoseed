"use client";

import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, CreditCard } from "lucide-react";

export function UserMenu() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const initials =
    user.user_metadata?.full_name
      ?.split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-ds-bg-tertiary transition-colors outline-none">
        <Avatar className="w-7 h-7">
          <AvatarImage src={user.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-ds-accent text-white text-xs font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:block text-left">
          <p className="text-xs font-medium text-ds-text-primary leading-none">
            {user.user_metadata?.full_name ?? "User"}
          </p>
          <p className="text-[10px] text-ds-text-secondary leading-none mt-0.5">
            Free plan
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-ds-bg-secondary border-ds-border"
      >
        <DropdownMenuItem className="text-ds-text-secondary text-xs">
          <CreditCard className="w-3.5 h-3.5 mr-2" />
          Upgrade to Pro
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-ds-border" />
        <DropdownMenuItem
          onClick={signOut}
          className="text-ds-text-secondary text-xs"
        >
          <LogOut className="w-3.5 h-3.5 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
