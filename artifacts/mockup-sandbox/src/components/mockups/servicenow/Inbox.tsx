import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Menu,
  Inbox as InboxIcon,
  Plus,
  Settings,
  ChevronDown,
  Phone,
  MoreHorizontal,
  Star,
  Search,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Bell,
} from "lucide-react";
import { ActiveCall } from "./ActiveCall";

function EmptyStateIllustration() {
  return (
    <svg
      width="180"
      height="160"
      viewBox="0 0 180 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="48" cy="30" rx="18" ry="12" fill="#e2e8f0" />
      <ellipse cx="62" cy="24" rx="14" ry="10" fill="#e2e8f0" />
      <ellipse cx="76" cy="30" rx="16" ry="11" fill="#e2e8f0" />
      <ellipse cx="118" cy="22" rx="14" ry="9" fill="#e2e8f0" />
      <ellipse cx="130" cy="17" rx="12" ry="8" fill="#e2e8f0" />
      <ellipse cx="142" cy="22" rx="13" ry="9" fill="#e2e8f0" />
      <rect x="38" y="42" width="72" height="88" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
      <path d="M94 42 L110 58 L94 58 Z" fill="#e2e8f0" />
      <path d="M94 42 L110 58 L94 58" stroke="#cbd5e1" strokeWidth="2" />
      <line x1="50" y1="72" x2="82" y2="72" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
      <line x1="50" y1="82" x2="88" y2="82" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
      <line x1="50" y1="92" x2="76" y2="92" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" />
      <circle cx="84" cy="96" r="24" fill="white" stroke="#94a3b8" strokeWidth="2.5" />
      <circle cx="80" cy="92" r="14" fill="white" stroke="#0ea5e9" strokeWidth="3" />
      <line x1="90" y1="102" x2="102" y2="114" stroke="#0ea5e9" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="116" y="90" width="44" height="36" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="120" y="86" width="44" height="36" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="124" y="82" width="44" height="36" rx="3" fill="white" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="132" y1="96" x2="158" y2="96" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="132" y1="104" x2="154" y2="104" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="110" x2="36" y2="110" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="28" y1="118" x2="38" y2="118" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="90" y1="140" x2="102" y2="140" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="108" y1="140" x2="118" y2="140" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="162" y1="76" x2="172" y2="76" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <line x1="162" y1="84" x2="170" y2="84" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  );
}

export function Inbox() {
  const [accepted, setAccepted] = useState(false);

  if (accepted) {
    return <ActiveCall onHangup={() => setAccepted(false)} />;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* Top Navigation Bar */}
      <header className="flex items-center h-11 bg-[#1a3a3a] text-white px-3 gap-4 shrink-0">
        <div className="flex items-center gap-1 shrink-0">
          <div className="flex flex-col items-start leading-none">
            <span className="text-white font-bold text-sm tracking-tight">service</span>
            <span className="text-white font-bold text-sm tracking-tight -mt-1">now</span>
          </div>
        </div>
        <nav className="flex items-center gap-0.5 text-xs text-gray-300">
          {["All", "Favorites", "History", "Workspaces", "Studio"].map((item) => (
            <Button key={item} variant="ghost" size="sm" className="h-7 px-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/10">
              {item}
            </Button>
          ))}
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-300 hover:text-white hover:bg-white/10">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </nav>
        <div className="flex-1 flex justify-center">
          <Button variant="ghost" size="sm" className="h-7 px-3 text-xs text-gray-200 hover:text-white hover:bg-white/10 gap-1.5 border border-white/20">
            CSM/FSM Configurable Workspace
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          </Button>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <Input placeholder="Search" className="h-7 w-44 pl-7 text-xs bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-white/40" />
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-300 hover:text-white hover:bg-white/10 relative">
              <PhoneCall className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 text-[9px] flex items-center justify-center font-bold text-white">1</span>
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-300 hover:text-white hover:bg-white/10">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-300 hover:text-white hover:bg-white/10">
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-300 hover:text-white hover:bg-white/10">
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-300 hover:text-white hover:bg-white/10">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="h-7 w-7 rounded-full bg-orange-400 flex items-center justify-center text-xs font-semibold text-white cursor-pointer">A</div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Narrow icon strip */}
        <div className="flex flex-col items-center w-10 bg-[#1f4a3a] pt-2 gap-1 shrink-0">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-white/10">
            <Home className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-white/10">
            <Menu className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white bg-white/15 hover:bg-white/20">
              <InboxIcon className="h-4 w-4" />
            </Button>
            <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-green-400 border border-[#1f4a3a]" />
          </div>
        </div>

        {/* Inbox panel */}
        <div className="flex flex-col w-44 bg-muted/30 border-r shrink-0">
          <div className="flex items-center justify-between px-3 py-2 shrink-0">
            <span className="text-sm font-semibold">Inbox</span>
            <div className="flex items-center gap-0.5">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Plus className="h-3.5 w-3.5" /></Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
          <div className="flex items-center justify-between px-3 pb-2 shrink-0">
            <span className="text-xs text-muted-foreground">Status</span>
            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
              <Settings className="h-3 w-3 text-muted-foreground" />
            </Button>
          </div>
          <div className="px-3 pb-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-1.5 text-xs gap-1 font-normal">
                  <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                  Available
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Available</DropdownMenuItem>
                <DropdownMenuItem>Busy</DropdownMenuItem>
                <DropdownMenuItem>Away</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Separator />
          <div className="p-2">
            <div className="rounded-md border bg-card p-2.5 shadow-sm">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Phone className="h-3 w-3 text-muted-foreground shrink-0" />
                <span className="text-[10px] text-muted-foreground truncate">IMS0000123</span>
              </div>
              <p className="text-xs font-semibold leading-tight">David Park</p>
              <p className="text-xs text-muted-foreground mt-0.5">+1 650 555 0198</p>
              <div className="flex items-center gap-1.5 mt-2 mb-2">
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">Time to accept:</span>
                <Badge variant="secondary" className="h-4 px-1.5 text-[10px] font-semibold">2:15</Badge>
              </div>
              <div className="flex gap-1.5">
                <Button variant="outline" size="sm" className="h-6 flex-1 text-[10px] px-1 text-destructive border-destructive/50 hover:bg-destructive/10">
                  Decline
                </Button>
                <Button
                  size="sm"
                  className="h-6 flex-1 text-[10px] px-1 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setAccepted(true)}
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-3 text-center max-w-xs">
            <EmptyStateIllustration />
            <h2 className="text-base font-semibold text-foreground">Check your Inbox</h2>
            <p className="text-sm text-muted-foreground leading-snug">
              Click a card in the Inbox to open a work item in this workspace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
