import {
  History,
  Home,
  Settings,
  ChartNoAxesCombined,
  Cctv,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Analysis",
    url: "/analysis",
    icon: ChartNoAxesCombined,
  },
  { title: "Monitor", url: "/monitor", icon: Cctv },
  {
    title: "History",
    url: "#",
    icon: History,
  },
  {
    title: "Settings",
    url: "/setting",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      className="h-screen bg-white/95 backdrop-blur-sm flex flex-col"
    >
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="">
          <SidebarTrigger className="size-10 pl-2 " />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
