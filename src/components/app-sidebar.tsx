
"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
  User,
  MessageSquare,
  ThumbsUp,
  Search,
  Users,
  LogOut,
  ChevronDown,
  ThumbsDown,
  Ban,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useState } from "react";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [actionsOpen, setActionsOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("404love_user");
    // We keep answers and questions in case the user logs back in
    router.push("/login");
  };

  return (
    <>
      <SidebarHeader>
        {/* The header is now handled by AppHeader to avoid duplication */}
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/profile"}
              tooltip="Profile"
            >
              <Link href="/profile">
                <User />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Collapsible open={actionsOpen} onOpenChange={setActionsOpen}>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <ThumbsUp />
                        <span>Actions</span>
                        <ChevronDown className={`ml-auto transition-transform duration-200 ${actionsOpen ? 'rotate-180' : ''}`} />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={pathname === '/actions/likes'}>
                                <Link href="/actions/likes">
                                    <ThumbsUp/>
                                    <span>Likes</span>
                                </Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={pathname === '/actions/dislikes'}>
                                <Link href="/actions/dislikes">
                                    <ThumbsDown/>
                                    <span>Dislikes</span>
                                </Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                         <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={pathname === '/actions/comments'}>
                                <Link href="/actions/comments">
                                    <MessageSquare/>
                                    <span>Comments</span>
                                </Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                         <SidebarMenuSubItem>
                            <SidebarMenuSubButton asChild isActive={pathname === '/actions/blocked'}>
                                <Link href="/actions/blocked">
                                    <Ban/>
                                    <span>Blocked</span>
                                </Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/search"}
              tooltip="Search"
            >
              <Link href="/search">
                <Search />
                <span>Search</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/view-others"}
              tooltip="View Others"
            >
              <Link href="/view-others">
                <Users />
                <span>View Others</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="mb-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut} tooltip="Sign Out">
              <LogOut />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
