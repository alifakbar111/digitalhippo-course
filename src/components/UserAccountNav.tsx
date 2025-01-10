"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import useAuth from "@/hooks/use-auth";
import { User } from "@/payload-types";
import Link from "next/link";

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button className="relative" variant="ghost" size="sm">
          My Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-60" align="end">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/sell">Seller Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onAbort={signOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
