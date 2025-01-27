import {
  Box,
  Boxes,
  ChartNoAxesGantt,
  Home,
  Newspaper,
  PenLine,
  Settings,
  UsersRound,
} from "lucide-react";
import { CollapsibleMenuItems } from "@/components/dashboard/Sidebar";

export const PROFILE_SIDEBAR: CollapsibleMenuItems[] = [
  {
    title: "Profile",
    url: "/dashboard",
    icon: Home,
  },
  { title: "Articles", url: "/dashboard/articles", icon: PenLine },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];
export const ADMIN_SIDEBAR: CollapsibleMenuItems[] = [
  {
    title: "Manage",
    icon: ChartNoAxesGantt,
    subItems: [
      {
        title: "User",
        url: "/dashboard/admin/manage/users",
        icon: UsersRound,
      },
      {
        title: "articles",
        url: "/dashboard/admin/manage/articles",
        icon: Newspaper,
      },
      {
        title: "Upcoming Program",
        url: "/dashboard/admin/manage/upcoming-programs",
        icon: Box,
      },
      {
        title: "Programs",
        url: "/dashboard/admin/manage/programs",
        icon: Boxes,
      },
    ],
  },
  {
    title: "Settings",
    url: "/dashboard/admin/settings",
    icon: Settings,
  },
];
