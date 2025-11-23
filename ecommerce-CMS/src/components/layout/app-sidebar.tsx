import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ShoppingCart } from "lucide-react"
import { url } from "zod"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Cadastros",
      url: "#",
      items: [
        {
          title: "Categorias",
          url: "/categories",
        },
        {
          title: "Marcas",
          url: "/brands",
        },
        {
          title: "Produtos",
          url: "/products",
        },
      ],
    },
    {
      title: "Vendas",
      url: "#",
      items: [
        {
          title: "Clientes",
          url: "/customers",
        },
        {
          title: "Pedidos",
          url: "/orders",
        },
        
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuSubItem>
                <SidebarMenuButton size="lg" asChild>
                    <a href="/">
                        <div
                            className="bg-sidebar-primary text-sidebar-foreground
                            flex aspect-square size-8 items-center
                            justify-center rounded-lg"
                        >
                            <ShoppingCart className="text-white size-4"/>
                        </div>
                        <div>
                            <span>E-commerce CMS</span>
                        </div>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuSubItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarMenu className="gap-2">
                {data.navMain.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <a href={item.url} className="font-medium">
                                {item.title}
                            </a>
                        </SidebarMenuButton>
                        {item.items.length ? (
                            <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                                {item.items.map((subitem) => (
                                    <SidebarMenuSubItem key={subitem.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={subitem.url}>
                                                {subitem.title}
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        ) : null}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>          
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
