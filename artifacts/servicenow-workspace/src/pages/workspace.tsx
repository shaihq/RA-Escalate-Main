import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  Home,
  Menu,
  Inbox,
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
  ChevronUp,
  Circle,
  Radio,
  Sparkles,
  Pin,
  Maximize2,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Download,
  FileText,
  Layers,
  Building2,
  User,
  Package,
  Hash,
  Zap,
  Shield,
} from "lucide-react";

type View = "inbox" | "active-call";

const TRANSCRIPT = [
  { side: "right" as const, text: "Hi David, thanks for calling. Let me pull up that order. What can I help you with today?" },
  { side: "left" as const, text: "Three of the six industrial pump units we ordered arrived damaged. The packaging looked fine from the outside but when we opened them, the housings are cracked." },
  { side: "right" as const, text: "I'm sorry to hear that. Can you confirm the product model and quantity damaged?" },
  { side: "left" as const, text: "Yeah, they're all model IP-5500-A. Three of them are damaged. We have photos as well." },
  { side: "right" as const, text: "Understood. I can help initiate a damage claim for this shipment." },
];

const ESCALATION_TRIGGER_INDEX = 1;
const MSG_DELAYS_MS = [800, 2200, 1600, 2000, 1800];

const DETAIL_TABS = [
  { id: "analytics", label: "Call Analytics" },
  { id: "details", label: "Details" },
  { id: "customer", label: "Customer Info" },
  { id: "history", label: "Customer History" },
  { id: "tasks", label: "Related tasks" },
  { id: "interactions", label: "Recent Interactions (8)" },
  { id: "cases", label: "Open cases (2)" },
];

function fmtTime(secs: number) {
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function EmptyStateIllustration() {
  return (
    <svg width="180" height="160" viewBox="0 0 180 160" fill="none" xmlns="http://www.w3.org/2000/svg">
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

function TopNav() {
  return (
    <header className="flex items-center h-11 bg-[#1a3a3a] text-white px-3 gap-4 shrink-0">
      <div className="flex items-center shrink-0">
        <div className="flex flex-col items-start leading-none">
          <span className="text-white font-bold text-sm tracking-tight">service</span>
          <span className="text-white font-bold text-sm tracking-tight -mt-1">now</span>
        </div>
      </div>
      <nav className="flex items-center gap-0.5">
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
          <Input
            placeholder="Search"
            className="h-7 w-44 pl-7 text-xs bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:border-white/40"
          />
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
          <div className="h-7 w-7 rounded-full bg-orange-400 flex items-center justify-center text-xs font-semibold text-white cursor-pointer select-none">
            A
          </div>
        </div>
      </div>
    </header>
  );
}

function IconStrip() {
  return (
    <div className="flex flex-col items-center w-10 bg-[#1f4a3a] pt-2 gap-1 shrink-0">
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-white/10">
        <Home className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-300 hover:text-white hover:bg-white/10">
        <Menu className="h-4 w-4" />
      </Button>
      <div className="relative">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-white bg-white/15 hover:bg-white/20">
          <Inbox className="h-4 w-4" />
        </Button>
        <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-green-400 border border-[#1f4a3a]" />
      </div>
    </div>
  );
}

export default function Workspace() {
  const [view, setView] = useState<View>("inbox");
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isHeld, setIsHeld] = useState(false);
  const [isRec, setIsRec] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState("details");
  const [interactionOpen, setInteractionOpen] = useState(true);

  const [formState, setFormState] = useState({
    number: "IMS0000123",
    state: "Work in Progress",
    type: "Phone",
    assignedTo: "Flora Smith",
    consumer: "Steve Rogers",
    verified: true,
    shortDescription: "User contact via phone +18587200477",
  });

  const [visibleCount, setVisibleCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastExiting, setToastExiting] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [nowAssistOpen, setNowAssistOpen] = useState(false);
  const [nowAssistExiting, setNowAssistExiting] = useState(false);
  const [aiStepsOpen, setAiStepsOpen] = useState(true);

  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view !== "active-call") {
      setSeconds(0);
      setIsMuted(false);
      setIsHeld(false);
      setIsRec(false);
      setVisibleCount(0);
      setShowToast(false);
      setToastExiting(false);
      return;
    }
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [view]);

  useEffect(() => {
    if (view !== "active-call") return;
    setVisibleCount(0);
    let accumulated = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    TRANSCRIPT.forEach((_, i) => {
      accumulated += MSG_DELAYS_MS[i] ?? 1500;
      const t = setTimeout(() => {
        setVisibleCount((c) => Math.max(c, i + 1));
      }, accumulated);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [view]);

  useEffect(() => {
    if (visibleCount > ESCALATION_TRIGGER_INDEX && !showToast && !toastExiting) {
      setShowToast(true);
      setToastExiting(false);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => dismissToast(), 5500);
    }
  }, [visibleCount]);

  function dismissToast() {
    setToastExiting(true);
    setTimeout(() => {
      setShowToast(false);
      setToastExiting(false);
    }, 240);
  }

  function openNowAssist() {
    dismissToast();
    setNowAssistExiting(false);
    setNowAssistOpen(true);
  }

  function closeNowAssist() {
    setNowAssistExiting(true);
    setTimeout(() => {
      setNowAssistOpen(false);
      setNowAssistExiting(false);
    }, 260);
  }

  useEffect(() => {
    if (view === "active-call" && transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [view, visibleCount]);

  if (view === "inbox") {
    return (
      <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
        <TopNav />
        <div className="flex flex-1 overflow-hidden">
          <IconStrip />
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
                  <CountdownBadge initialSeconds={135} />
                </div>
                <div className="flex gap-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 flex-1 text-[10px] px-1 text-destructive border-destructive/50 hover:bg-destructive/10"
                  >
                    Decline
                  </Button>
                  <Button
                    size="sm"
                    className="h-6 flex-1 text-[10px] px-1 bg-green-600 hover:bg-green-700 text-white border-green-700"
                    onClick={() => setView("active-call")}
                  >
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          </div>
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

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden relative">
      {showToast && (
        <div
          className={cn(
            "fixed top-14 right-4 z-50 w-80 rounded-lg border border-blue-200 bg-white shadow-lg shadow-blue-900/8 pointer-events-auto",
            toastExiting ? "toast-exit" : "toast-enter"
          )}
          style={{ backdropFilter: "blur(2px)" }}
        >
          <div className="flex items-start gap-3 px-3.5 py-3">
            <div className="mt-0.5 h-7 w-7 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-slate-700 leading-tight mb-0.5">Now Assist</p>
              <p className="text-xs text-slate-600 leading-snug">
                Now Assist has a plan for solving{" "}
                <span className="font-medium text-blue-600">IMS00000123</span>. Open Now Assist Panel to view the plan.
              </p>
              <div className="mt-2">
                <Button
                  size="sm"
                  className="h-6 px-2.5 text-[11px] bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={openNowAssist}
                >
                  Open
                </Button>
              </div>
            </div>
            <button
              className="mt-0.5 h-5 w-5 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
              onClick={dismissToast}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <IconStrip />

        {/* Left panel */}
        <div className="flex flex-col w-64 border-r shrink-0 overflow-hidden">
          {/* Tab bar */}
          <div className="flex items-center border-b bg-muted/20 shrink-0">
            <button
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground border-r transition-colors"
              onClick={() => setView("inbox")}
            >
              <Inbox className="h-3.5 w-3.5" />
              Inbox
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-foreground border-r border-b-2 border-b-primary bg-background flex-1">
              <Phone className="h-3.5 w-3.5 text-green-600" />
              Steve Rogers
            </button>
            <button
              className="flex items-center justify-center px-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setView("inbox")}
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <button className="flex items-center justify-center px-2 py-2 text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Active call info */}
          <div className="px-3 pt-3 pb-2 shrink-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={cn("h-2 w-2 rounded-full", isHeld ? "bg-amber-500" : "bg-green-500")} />
              <span className="text-xs font-medium">{isHeld ? "Call on hold" : "Active call"}</span>
              <span className="ml-auto text-xs text-muted-foreground font-mono tabular-nums">{fmtTime(seconds)}</span>
            </div>
            <p className="text-sm font-semibold">+1 650 555 0198</p>
          </div>

          {/* Call controls */}
          <div className="flex items-center gap-0.5 px-3 pb-3 shrink-0 flex-wrap">
            <Button
              variant={isRec ? "default" : "outline"}
              size="sm"
              className={cn("h-6 px-1.5 text-[10px] gap-1 font-semibold", isRec && "bg-red-600 hover:bg-red-700 border-red-700 text-white")}
              onClick={() => setIsRec((r) => !r)}
            >
              {isRec && <Circle className="h-2 w-2 fill-current animate-pulse" />}
              REC
            </Button>
            <Button
              variant={isMuted ? "default" : "ghost"}
              size="sm"
              className={cn("h-6 w-6 p-0", isMuted && "bg-amber-500 hover:bg-amber-600 border-amber-600 text-white")}
              onClick={() => setIsMuted((m) => !m)}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
            </Button>
            <Button
              variant={isHeld ? "default" : "ghost"}
              size="sm"
              className={cn("h-6 w-6 p-0", isHeld && "bg-amber-500 hover:bg-amber-600 border-amber-600 text-white")}
              onClick={() => setIsHeld((h) => !h)}
              title={isHeld ? "Resume" : "Hold"}
            >
              <Pause className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Grid3X3 className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><ArrowRightLeft className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><Flag className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
            <Button
              size="sm"
              className="h-6 w-6 p-0 bg-destructive hover:bg-destructive/90 ml-auto"
              onClick={() => setView("inbox")}
              title="End call"
            >
              <PhoneOff className="h-3.5 w-3.5 text-white" />
            </Button>
          </div>

          <Separator />

          {/* Transcript */}
          <div className="px-3 py-2 shrink-0">
            <span className="text-xs font-medium text-muted-foreground">Call transcript</span>
          </div>
          <div ref={transcriptRef} className="flex-1 overflow-y-auto px-3 pb-3 space-y-3">
            {TRANSCRIPT.slice(0, visibleCount).map((msg, i) => (
              <div key={i} className={cn("flex items-end gap-2 msg-animate-in", msg.side === "right" && "flex-row-reverse")}>
                <div className="h-6 w-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white bg-slate-400 select-none">
                  {msg.side === "left" ? "DP" : "A"}
                </div>
                <div className={cn(
                  "max-w-[80%] rounded-lg px-2.5 py-1.5 text-xs leading-relaxed",
                  msg.side === "left"
                    ? "bg-slate-100 text-foreground rounded-bl-none"
                    : "bg-blue-50 text-foreground rounded-br-none border border-blue-100"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
            {visibleCount < TRANSCRIPT.length && (
              <div className="flex items-center gap-1.5 px-1">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Work item header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-sm font-semibold truncate">User contact via phone +18587200477</h1>
              <Tag className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Button variant="outline" size="sm" className="h-7 text-xs">Compose message</Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">Discuss</Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">Create case</Button>
              <Button size="sm" className="h-7 text-xs">Save</Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Detail tab bar */}
          <div className="flex items-center border-b px-4 shrink-0 overflow-x-auto">
            {DETAIL_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDetailTab(tab.id)}
                className={cn(
                  "px-3 py-2 text-xs whitespace-nowrap border-b-2 -mb-px transition-colors",
                  activeDetailTab === tab.id
                    ? "border-primary text-foreground font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4">
              {activeDetailTab === "details" && (
                <div className="border rounded-md">
                  <button
                    className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-muted/30 w-full transition-colors"
                    onClick={() => setInteractionOpen((o) => !o)}
                  >
                    <span className="text-sm font-medium">Interaction</span>
                    {interactionOpen
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    }
                  </button>
                  {interactionOpen && (
                    <>
                      <Separator />
                      <div className="p-4 grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">Number</label>
                          <Input
                            value={formState.number}
                            onChange={(e) => setFormState((f) => ({ ...f, number: e.target.value }))}
                            className="h-8 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">State</label>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 w-full justify-between text-xs font-normal">
                                {formState.state}
                                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {["New", "Work in Progress", "Resolved", "Closed"].map((s) => (
                                <DropdownMenuItem key={s} onClick={() => setFormState((f) => ({ ...f, state: s }))}>
                                  {s}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">Type</label>
                          <div className="flex items-center h-8 px-3 border rounded-md bg-muted/40">
                            <span className="text-xs">{formState.type}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">Assigned to</label>
                          <div className="flex items-center h-8 border rounded-md overflow-hidden">
                            <Input
                              value={formState.assignedTo}
                              onChange={(e) => setFormState((f) => ({ ...f, assignedTo: e.target.value }))}
                              className="flex-1 h-full border-0 rounded-none text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <Button variant="ghost" size="sm" className="h-full w-7 p-0 rounded-none border-l shrink-0">
                              <Info className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-full w-7 p-0 rounded-none border-l shrink-0">
                              <Search className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-1 col-span-2">
                          <label className="text-xs text-muted-foreground">Consumer</label>
                          <div className="flex items-center h-8 border rounded-md overflow-hidden">
                            <Input
                              value={formState.consumer}
                              onChange={(e) => setFormState((f) => ({ ...f, consumer: e.target.value }))}
                              className="flex-1 h-full border-0 rounded-none text-xs focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                            <Button variant="ghost" size="sm" className="h-full w-7 p-0 rounded-none border-l shrink-0">
                              <Info className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-full w-7 p-0 rounded-none border-l shrink-0">
                              <Search className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 col-span-2">
                          <Checkbox
                            id="verified"
                            checked={formState.verified}
                            onCheckedChange={(c) => setFormState((f) => ({ ...f, verified: !!c }))}
                          />
                          <label htmlFor="verified" className="text-xs cursor-pointer select-none">Verified</label>
                        </div>
                        <div className="space-y-1 col-span-2">
                          <label className="text-xs text-muted-foreground">Short description</label>
                          <Input
                            value={formState.shortDescription}
                            onChange={(e) => setFormState((f) => ({ ...f, shortDescription: e.target.value }))}
                            className="h-8 text-xs"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeDetailTab === "analytics" && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium">Call Analytics</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Duration", value: fmtTime(seconds) },
                      { label: "Hold time", value: "00:00" },
                      { label: "Talk time", value: fmtTime(seconds) },
                    ].map((stat) => (
                      <div key={stat.label} className="border rounded-md p-3">
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                        <p className="text-lg font-mono font-semibold mt-0.5">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeDetailTab !== "details" && activeDetailTab !== "analytics" && (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {DETAIL_TABS.find((t) => t.id === activeDetailTab)?.label}
                  </p>
                  <p className="text-xs text-muted-foreground">No content to display.</p>
                </div>
              )}
            </div>

            {/* Sentiment Analysis sidebar */}
            <div className="w-52 border-l flex flex-col shrink-0">
              <div className="flex items-center justify-between px-3 py-2.5 border-b shrink-0">
                <span className="text-xs font-medium">Sentiment Analysis</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-amber-500" />
                </div>
                <p className="text-xs font-medium">Unable to display content</p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  The visualization has not been configured yet. Please contact your administrator for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Now Assist slide-over panel */}
      {nowAssistOpen && (
        <div
          className={cn(
            "fixed top-0 right-0 h-full w-[340px] bg-white border-l border-slate-200 shadow-2xl shadow-slate-900/15 z-40 flex flex-col",
            nowAssistExiting ? "now-assist-exit" : "now-assist-enter"
          )}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 shrink-0 bg-slate-50/60">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center shrink-0">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-800">Now Assist</span>
            </div>
            <div className="flex items-center gap-0.5">
              <button className="h-7 w-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
              <button className="h-7 w-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <Pin className="h-3.5 w-3.5" />
              </button>
              <button
                className="h-7 w-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                onClick={closeNowAssist}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto">
            {/* Section 1 — Plan title card */}
            <div className="mx-4 mt-4 mb-3 rounded-lg bg-[#eaf4fb] border border-blue-100 px-4 py-3.5">
              <p className="text-sm font-semibold text-slate-800 leading-snug mb-1">
                Damage Claim Escalation Plan
              </p>
              <p className="text-[11.5px] text-slate-500 leading-relaxed">
                Now Assist analyzed the conversation and prepared a recommended escalation workflow.
              </p>
            </div>

            {/* Section 2 — AI steps label */}
            <div className="px-4 mb-3">
              <button
                className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => setAiStepsOpen((o) => !o)}
              >
                <Sparkles className="h-3 w-3 text-blue-400" />
                <span className="font-medium tracking-wide uppercase">AI steps</span>
                <ChevronDown className={cn("h-3 w-3 transition-transform", aiStepsOpen && "rotate-180")} />
              </button>
            </div>

            {aiStepsOpen && (
              <>
                {/* Section 3 — Escalation guidance */}
                <div className="px-4 space-y-3 mb-4">
                  <p className="text-[12.5px] text-slate-700 leading-relaxed">
                    Based on the customer conversation, this issue qualifies as a{" "}
                    <span className="font-medium text-slate-800">B2B damage claim escalation</span>{" "}
                    for industrial equipment.
                  </p>
                  <p className="text-[12.5px] text-slate-700 leading-relaxed">
                    The customer reported that three{" "}
                    <span className="font-medium text-slate-800">IP-5500 industrial pump units</span>{" "}
                    arrived damaged. Because the order value is high and the account belongs to an enterprise customer, escalation handling is recommended.
                  </p>
                  <p className="text-[12.5px] text-slate-700 leading-relaxed">
                    Now Assist identified the required information needed to create a damage claim case.
                  </p>
                </div>

                {/* Section 4 — Extracted entities */}
                <div className="mx-4 mb-4 rounded-md border border-slate-200 overflow-hidden">
                  {[
                    { icon: <Building2 className="h-3 w-3" />, label: "Account", value: "Acme Manufacturing" },
                    { icon: <User className="h-3 w-3" />, label: "Customer", value: "David Park" },
                    { icon: <Hash className="h-3 w-3" />, label: "Order Number", value: "AC-PO-49281" },
                    { icon: <Package className="h-3 w-3" />, label: "Product", value: "IP-5500 Industrial Pump" },
                    { icon: <Layers className="h-3 w-3" />, label: "Qty Damaged", value: "3 units" },
                    { icon: <Zap className="h-3 w-3 text-amber-500" />, label: "Priority", value: <span className="text-amber-600 font-medium">High</span> },
                    { icon: <Shield className="h-3 w-3 text-blue-500" />, label: "Service Tier", value: <span className="text-blue-600 font-medium">Premium Enterprise</span> },
                  ].map((row, i, arr) => (
                    <div
                      key={row.label}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 text-[11.5px]",
                        i < arr.length - 1 && "border-b border-slate-100"
                      )}
                    >
                      <div className="flex items-center gap-2 text-slate-400 shrink-0 w-32">
                        {row.icon}
                        <span className="text-slate-500">{row.label}</span>
                      </div>
                      <span className="text-slate-800 text-right truncate">{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Section 5 — Suggested action */}
                <div className="mx-4 mb-4">
                  <button className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-md border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors text-left group">
                    <FileText className="h-4 w-4 text-blue-500 shrink-0" />
                    <span className="text-[12.5px] font-medium text-blue-700 group-hover:text-blue-800">
                      Generate escalation case draft
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Section 6 — Footer actions */}
          <div className="border-t border-slate-100 px-4 py-3 shrink-0 bg-slate-50/40">
            <div className="flex items-center gap-1">
              <button className="h-7 w-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <ThumbsUp className="h-3.5 w-3.5" />
              </button>
              <button className="h-7 w-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <ThumbsDown className="h-3.5 w-3.5" />
              </button>
              <button className="h-7 w-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <Copy className="h-3.5 w-3.5" />
              </button>
              <button className="h-7 w-7 flex items-center justify-center rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                <Download className="h-3.5 w-3.5" />
              </button>
              <div className="ml-auto">
                <button className="flex items-center gap-1.5 h-7 px-2.5 rounded-full border border-slate-200 bg-white text-[11px] text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-colors">
                  <span className="flex -space-x-1">
                    <span className="h-3 w-3 rounded-full bg-emerald-400 border border-white" />
                    <span className="h-3 w-3 rounded-full bg-blue-400 border border-white" />
                    <span className="h-3 w-3 rounded-full bg-violet-400 border border-white" />
                  </span>
                  Sources and more
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CountdownBadge({ initialSeconds }: { initialSeconds: number }) {
  const [secs, setSecs] = useState(initialSeconds);

  useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [secs]);

  const m = String(Math.floor(secs / 60)).padStart(1, "0");
  const s = String(secs % 60).padStart(2, "0");

  return (
    <Badge
      variant="secondary"
      className={cn("h-4 px-1.5 text-[10px] font-semibold tabular-nums transition-colors", secs <= 30 && "bg-red-100 text-red-700")}
    >
      {m}:{s}
    </Badge>
  );
}
