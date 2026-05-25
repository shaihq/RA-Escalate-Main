import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Home,
  Menu,
  Inbox as InboxIcon,
  Plus,
  Star,
  Search,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Bell,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Phone,
  Mic,
  MicOff,
  Pause,
  Grid3X3,
  ArrowRightLeft,
  Flag,
  PhoneOff,
  X,
  Tag,
  Info,
  AlertTriangle,
} from "lucide-react";

interface ActiveCallProps {
  onHangup?: () => void;
}

function TopNav() {
  return (
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
  );
}

const transcriptMessages = [
  { side: "left", text: "Hi, this is David Park from Acme Manufacturing. I'm calling about order number AC-PO-49281 that arrived yesterday." },
  { side: "right", text: "Hi David, thanks for calling. Let me pull up that order. What can I help you with today?" },
  { side: "left", text: "Three of the six industrial pump units we ordered arrived damaged. The packaging looked fine from the outside but when we opened them, the housings are cracked, looks like impact damage. We need to file a claim." },
  { side: "right", text: "I'm sorry to hear that, David. That's serious. Can you confirm the part numbers of the damaged units?" },
  { side: "left", text: "Yeah, they're all model IP-5500-A. Three of them. We have photos." },
];

export function ActiveCall({ onHangup }: ActiveCallProps) {
  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      <TopNav />

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

        {/* Left panel */}
        <div className="flex flex-col w-64 border-r shrink-0 overflow-hidden">
          {/* Tabs: Inbox + Steve Rogers */}
          <div className="flex items-center border-b bg-muted/20 shrink-0">
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground border-r">
              <InboxIcon className="h-3.5 w-3.5" />
              Inbox
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-foreground border-r border-b-2 border-b-primary bg-background">
              <Phone className="h-3.5 w-3.5 text-green-600" />
              Steve Rogers
            </button>
            <button className="flex items-center justify-center px-2 py-2 text-muted-foreground hover:text-foreground ml-auto">
              <X className="h-3.5 w-3.5" />
            </button>
            <button className="flex items-center justify-center px-2 py-2 text-muted-foreground hover:text-foreground">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Active call badge + number */}
          <div className="px-3 pt-3 pb-2 shrink-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs font-medium">Active call</span>
              <span className="ml-auto text-xs text-muted-foreground font-mono">00:00</span>
            </div>
            <p className="text-sm font-semibold">+1 650 555 0198</p>
          </div>

          {/* Call controls */}
          <div className="flex items-center gap-1 px-3 pb-3 shrink-0">
            <Badge variant="outline" className="text-[10px] h-6 px-1.5 cursor-pointer">REC</Badge>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Mic className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><MicOff className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Pause className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Grid3X3 className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><ArrowRightLeft className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Flag className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
            <Button
              size="sm"
              className="h-6 w-6 p-0 bg-destructive hover:bg-destructive/90 ml-auto"
              onClick={onHangup}
            >
              <PhoneOff className="h-3.5 w-3.5 text-white" />
            </Button>
          </div>

          <Separator />

          {/* Call transcript */}
          <div className="px-3 py-2 shrink-0">
            <span className="text-xs font-medium text-muted-foreground">Call transcript</span>
          </div>
          <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-3">
            {transcriptMessages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-2 ${msg.side === "right" ? "flex-row-reverse" : ""}`}>
                <div className="h-6 w-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white bg-slate-400">
                  {msg.side === "left" ? "SR" : "A"}
                </div>
                <div className={`max-w-[80%] rounded-lg px-2.5 py-1.5 text-xs leading-relaxed ${
                  msg.side === "left"
                    ? "bg-slate-100 text-foreground rounded-bl-none"
                    : "bg-blue-100 text-foreground rounded-br-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Work item header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b shrink-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold">User contact via phone +18587200477</h1>
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" className="h-7 text-xs">Compose message</Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">Discuss</Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">Create case</Button>
              <Button size="sm" className="h-7 text-xs">Save</Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex items-center border-b px-4 shrink-0 overflow-x-auto">
            {[
              { label: "Call Analytics" },
              { label: "Details", active: true },
              { label: "Customer Info" },
              { label: "Customer History" },
              { label: "Related tasks" },
              { label: "Recent Interactions (8)" },
              { label: "Open cases (2)" },
            ].map((tab) => (
              <button
                key={tab.label}
                className={`px-3 py-2 text-xs whitespace-nowrap border-b-2 -mb-px ${
                  tab.active
                    ? "border-primary text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Details panel */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Interaction collapsible */}
              <div className="border rounded-md">
                <div className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-muted/30">
                  <span className="text-sm font-medium">Interaction</span>
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <Separator />
                <div className="p-4 grid grid-cols-2 gap-4">
                  {/* Number */}
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Number</label>
                    <Input value="IMS0000123" readOnly className="h-8 text-xs" />
                  </div>
                  {/* State */}
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">State</label>
                    <Input value="Work in Progress" readOnly className="h-8 text-xs" />
                  </div>
                  {/* Type */}
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Type</label>
                    <div className="flex items-center h-8 px-3 border rounded-md bg-muted/40">
                      <span className="text-xs">Phone</span>
                    </div>
                  </div>
                  {/* Assigned to */}
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Assigned to</label>
                    <div className="flex items-center h-8 border rounded-md overflow-hidden">
                      <span className="flex-1 text-xs px-3">Flora Smith</span>
                      <Button variant="ghost" size="sm" className="h-full w-7 p-0 rounded-none border-l">
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-full w-7 p-0 rounded-none border-l">
                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                  {/* Consumer - full width */}
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs text-muted-foreground">Consumer</label>
                    <div className="flex items-center h-8 border rounded-md overflow-hidden">
                      <span className="flex-1 text-xs px-3">Steve Rogers</span>
                      <Button variant="ghost" size="sm" className="h-full w-7 p-0 rounded-none border-l">
                        <Info className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-full w-7 p-0 rounded-none border-l">
                        <Search className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                  {/* Verified */}
                  <div className="flex items-center gap-2 col-span-2">
                    <Checkbox id="verified" defaultChecked />
                    <label htmlFor="verified" className="text-xs cursor-pointer">Verified</label>
                  </div>
                  {/* Short description - full width */}
                  <div className="space-y-1 col-span-2">
                    <label className="text-xs text-muted-foreground">Short description</label>
                    <Input value="User contact via phone +18587200477" readOnly className="h-8 text-xs" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sentiment Analysis sidebar */}
            <div className="w-52 border-l flex flex-col shrink-0">
              <div className="flex items-center justify-between px-3 py-2.5 border-b">
                <span className="text-xs font-medium">Sentiment Analysis</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center gap-2">
                <div className="h-12 w-12 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <p className="text-xs font-medium">Unable to display content</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  The visualization has not been configured yet. Please contact your administrator for assistance.
                </p>
              </div>
              {/* Right edge icon buttons */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 p-1">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
