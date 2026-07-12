import { Link, useLocation } from "react-router-dom";
import { useState, type ReactNode } from "react";

import {
  LayoutDashboard,
  Search,
  TrendingUp,
  Users,
  MessageSquareWarning,
  Puzzle,
  Trophy,
  FileBarChart,
  Bell,
  Settings,
  Menu,
  Moon,
  Sun,
  Sparkles,
} from "lucide-react";

import { useTheme } from "@/lib/theme";


const nav = [
  {
    to: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/search",
    label: "Search Opportunity",
    icon: Search,
  },
  {
    to: "/market-trends",
    label: "Market Trends",
    icon: TrendingUp,
  },
  {
    to: "/competitors",
    label: "Competitor Analysis",
    icon: Users,
  },
  {
    to: "/customer-pain-points",
    label: "Customer Pain Points",
    icon: MessageSquareWarning,
  },
  {
    to: "/market-gap",
    label: "Market Gap",
    icon: Puzzle,
  },
  {
    to: "/opportunity-rankings",
    label: "Opportunity Rankings",
    icon: Trophy,
  },
  {
    to: "/reports",
    label: "Reports",
    icon: FileBarChart,
  },
  {
    to: "/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    to: "/settings",
    label: "Settings",
    icon: Settings,
  },
];


export function AppShell({
  children,
}: {
  children: ReactNode;
}) {

  const [open, setOpen] = useState(false);

  const {
    theme,
    toggle
  } = useTheme();


  const {
    pathname
  } = useLocation();



  return (

    <div className="min-h-screen bg-background text-foreground">


      {/* Sidebar */}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >


        <div className="flex h-16 items-center gap-2 px-5 border-b border-sidebar-border">

          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">

            <Sparkles className="h-5 w-5"/>

          </div>


          <div>

            <div className="text-sm font-bold">
              OpportunIQ
            </div>

            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              AI Discovery
            </div>

          </div>

        </div>



        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">


          {nav.map((item)=>{


            const active =
              pathname === item.to;



            return (

              <Link

                key={item.to}

                to={item.to}

                onClick={() => setOpen(false)}

                className={`
                flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium
                ${
                  active
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-accent"
                }
                `}

              >

                <item.icon className="h-4 w-4"/>

                <span>
                  {item.label}
                </span>


              </Link>

            );


          })}


        </nav>


      </aside>




      {open && (

        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={()=>setOpen(false)}
        />

      )}





      {/* Main Content */}


      <div className="lg:pl-64">


        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background px-4">


          <button

            className="lg:hidden rounded-lg p-2"

            onClick={()=>setOpen(true)}

          >

            <Menu className="h-5 w-5"/>

          </button>



          <div className="flex-1">

            <input

              placeholder="Search opportunities..."

              className="w-full rounded-xl border px-3 py-2"

            />

          </div>




          <button

            className="rounded-xl p-2"

            onClick={toggle}

          >

            {
              theme==="dark"
              ?
              <Sun/>
              :
              <Moon/>
            }


          </button>



          <Link

            to="/notifications"

            className="p-2"

          >

            <Bell/>

          </Link>



        </header>



        <main className="p-4 md:p-8">

          {children}

        </main>



      </div>


    </div>

  );

}




export function PageHeader({
  title,
  subtitle,
  action
}:{
  title:string;
  subtitle?:string;
  action?:ReactNode;
}){


return (

<div className="mb-6">

<h1 className="text-3xl font-bold">
{title}
</h1>


{
subtitle &&
<p className="text-gray-500 mt-2">
{subtitle}
</p>
}


{action}


</div>

);


}




export function Card({
className="",
children
}:{
className?:string;
children:ReactNode;
}){


return (

<div
className={`rounded-2xl border bg-card p-5 shadow ${className}`}
>

{children}

</div>

);

}




export function Badge({
children
}:{
children:ReactNode;
}){


return (

<span className="rounded-full px-3 py-1 text-xs bg-muted">

{children}

</span>

);

}



export function statusTone(
s:string
){

if(
s==="High" ||
s==="Positive"
)
return "success";


if(
s==="Medium" ||
s==="Neutral"
)
return "warning";


if(
s==="Low" ||
s==="Negative"
)
return "destructive";


return "default";

}