import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { 
  Search, 
  Filter, 
  FileDown, 
  PlusCircle, 
  RefreshCcw, 
  LayoutDashboard, 
  Ticket as TicketIcon, 
  UserCircle, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  ArrowRight,
  Eye,
  Mail,
  Bell,
  ArrowLeft,
  X,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Upload,
  XCircle,
  Info,
  History,
  ClipboardList,
  FileSearch,
  Pencil,
  Trash2,
  Building2,
  MousePointerClick,
  Save,
  FileText,
  AlertTriangle,
  MailX,
  Plus,
  Check,
  FileSpreadsheet,
  Download,
  Paperclip,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Order, Ticket, OrderStatus, TicketStatus, Transaction, DisputeLookupRecord } from "./types";

// --- Mock Data ---
const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    bkOrderId: "BK_3B2666052D25",
    mrcOrderId: "IWXQ_1774518113",
    createdTime: "26/03/2026 16:41",
    updatedTime: "26/03/2026 16:41",
    status: OrderStatus.PROCESSING,
    value: 15000000,
    fee: 0,
    discount: 0,
    netReceived: 0,
    content: "",
    method: "BNPL",
    source: "Portal",
    branch: "Main",
    mrcCode: "b2bthiither158",
    store: "Store A",
    staff: "Staff 1",
    productName: "Thông tin sản phẩm app",
    customer: { name: "hi hi", phone: "0383800000" },
    note: ""
  },
  {
    id: "2",
    bkOrderId: "BK_3BC61CBBE7E6",
    mrcOrderId: "TT1774404040",
    createdTime: "26/03/2026 08:56",
    updatedTime: "26/03/2026 08:56",
    status: OrderStatus.SUCCESS,
    value: 3000000,
    fee: 2500,
    discount: 0,
    netReceived: 2998000,
    content: "Mua iPhone",
    method: "Chuyển khoản VietQR",
    source: "Portal",
    branch: "Main",
    mrcCode: "apple_store_vn",
    store: "Apple Store Vincom",
    staff: "Staff 2",
    productName: "iPhone 15 Pro",
    customer: { name: "Nguyen Van A", phone: "0344555666" },
    note: ""
  },
  {
    id: "3",
    bkOrderId: "BK_3BA617BA8136",
    mrcOrderId: "TT1774403749",
    createdTime: "25/03/2026 08:55",
    updatedTime: "25/03/2026 08:56",
    status: OrderStatus.REFUNDED,
    value: 1200000,
    fee: 2500,
    discount: 0,
    netReceived: -19200,
    content: "Mua Tai nghe",
    method: "Chuyển khoản VietQR",
    source: "Portal",
    branch: "Main",
    mrcCode: "samsung_vnm",
    store: "Samsung Center",
    staff: "Staff 3",
    productName: "Galaxy Buds 2 Pro",
    customer: { name: "Tran Thi B", phone: "0988777666" },
    note: ""
  },
  {
    id: "4",
    bkOrderId: "BK_3B6618BA1308",
    mrcOrderId: "TT1774403718",
    createdTime: "25/03/2026 08:55",
    updatedTime: "25/03/2026 08:56",
    status: OrderStatus.SUCCESS,
    value: 450000,
    fee: 2500,
    discount: 0,
    netReceived: 447500,
    content: "Thanh toan Shopee",
    method: "Thẻ nội địa Napas",
    source: "Portal",
    branch: "Main",
    mrcCode: "shopee_mall",
    store: "Shopee Online",
    staff: "System",
    productName: "Giày Adidas",
    customer: { name: "Le Van C", phone: "0911222333" },
    note: ""
  },
  {
    id: "5",
    bkOrderId: "BK_3B6618BA1309",
    mrcOrderId: "TT1774403719",
    createdTime: "27/03/2026 10:20",
    updatedTime: "27/03/2026 10:25",
    status: OrderStatus.SUCCESS,
    value: 85000,
    fee: 1000,
    discount: 10000,
    netReceived: 74000,
    content: "Đặt đồ ăn",
    method: "Ví điện tử Momo",
    source: "App",
    branch: "Hanoi",
    mrcCode: "grab_food",
    store: "Cửa hàng Phở",
    staff: "Shipper 1",
    productName: "Phở Bò",
    customer: { name: "Pham Van D", phone: "0909090909" },
    note: ""
  },
  {
    id: "6",
    bkOrderId: "BK_3B6618BA1310",
    mrcOrderId: "TT1774403720",
    createdTime: "27/03/2026 11:00",
    updatedTime: "27/03/2026 11:05",
    status: OrderStatus.SUCCESS,
    value: 2500000,
    fee: 5000,
    discount: 0,
    netReceived: 2495000,
    content: "Mua sách Tiki",
    method: "Thẻ quốc tế Visa",
    source: "Portal",
    branch: "Main",
    mrcCode: "tiki_official",
    store: "Tiki Trading",
    staff: "System",
    productName: "Combo Sách Kinh Tế",
    customer: { name: "Hoang Thi E", phone: "0888999000" },
    note: ""
  },
  {
    id: "7",
    bkOrderId: "BK_3B6618BA1311",
    mrcOrderId: "TT1774403721",
    createdTime: "28/03/2026 14:30",
    updatedTime: "28/03/2026 14:35",
    status: OrderStatus.SUCCESS,
    value: 850000,
    fee: 2000,
    discount: 50000,
    netReceived: 798000,
    content: "Mua quần áo",
    method: "Chuyển khoản VietQR",
    source: "Portal",
    branch: "Chi nhánh 1",
    mrcCode: "uniqlo_vn",
    store: "Uniqlo Vincom",
    staff: "NV Ban hang",
    productName: "Áo khoác",
    customer: { name: "Do Van F", phone: "0777666555" },
    note: ""
  },
  {
    id: "8",
    bkOrderId: "BK_3B6618BA1312",
    mrcOrderId: "TT1774403722",
    createdTime: "28/03/2026 15:00",
    updatedTime: "28/03/2026 15:10",
    status: OrderStatus.SUCCESS,
    value: 450000,
    fee: 1000,
    discount: 0,
    netReceived: 449000,
    content: "Vé tham quan",
    method: "BNPL",
    source: "App",
    branch: "Main",
    mrcCode: "klook_vn",
    store: "Online",
    staff: "System",
    productName: "Vé Sunworld",
    customer: { name: "Bui Van G", phone: "0966555444" },
    note: ""
  },
  {
    id: "9",
    bkOrderId: "BK_3B6618BA1313",
    mrcOrderId: "TT1774403723",
    createdTime: "29/03/2026 09:00",
    updatedTime: "29/03/2026 09:05",
    status: OrderStatus.SUCCESS,
    value: 120000,
    fee: 500,
    discount: 0,
    netReceived: 119500,
    content: "Thanh toán điện",
    method: "Chuyển khoản VietQR",
    source: "Portal",
    branch: "Main",
    mrcCode: "evn_hcm",
    store: "Online",
    staff: "System",
    productName: "Tiền điện tháng 3",
    customer: { name: "Nguyen Van H", phone: "0977888999" },
    note: ""
  },
  {
    id: "10",
    bkOrderId: "BK_3B6618BA1314",
    mrcOrderId: "TT1774403724",
    createdTime: "29/03/2026 10:00",
    updatedTime: "29/03/2026 10:10",
    status: OrderStatus.SUCCESS,
    value: 550000,
    fee: 1500,
    discount: 0,
    netReceived: 548500,
    content: "Mua vé xem phim",
    method: "Ví điện tử Momo",
    source: "App",
    branch: "Main",
    mrcCode: "cgv_cinemas",
    store: "CGV Vincom",
    staff: "System",
    productName: "Vé phim Dune 2",
    customer: { name: "Tran Van I", phone: "0944333222" },
    note: ""
  }
];

// --- SLA Helpers ---
const calculateDeadline = (createdTime: string) => {
  const [datePart, timePart] = createdTime.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  const date = new Date(year, month - 1, day, hour, minute);
  date.setDate(date.getDate() + 3);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

const isOverdue = (deadline: string) => {
  const [datePart, timePart] = deadline.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  const deadlineDate = new Date(year, month - 1, day, hour, minute);
  return new Date() > deadlineDate;
};

const MOCK_TICKETS: Ticket[] = [
  {
    id: "1",
    bkId: "131",
    ticketId: "672771908",
    csId: "229963",
    formType: "Tra soát",
    merchantId: "apple_store_vn",
    ticketType: "Yêu cầu hoàn tiền",
    status: TicketStatus.WAITING_RESPONSE,
    source: "Admin",
    creator: "nv@gmail.com",
    updatedTime: "25/03/2026 08:48:47",
    createdTime: "25/03/2026 08:48:46",
    deadline: calculateDeadline("25/03/2026 08:48:46"),
    receivedTime: "25/03/2026 08:00:00",
    provider: "Napas",
    receptionMethod: "Email",
    transactionCount: 1,
    transactions: [
      { id: "tx1", bkId: "BK123", mrcOrderId: "MRC123", service: "Thu hộ", amount: 100000, time: "25/03/2026 07:30:00" }
    ],
    isRefunded: false,
    sendEmailToMerchant: true,
    timeline: [
      { type: "Created", time: "25/03/2026 08:48:46", content: "Tạo ticket tra soát" },
      { type: "Email Sent", time: "25/03/2026 08:50:00", content: "Gửi email cho merchant" }
    ],
    syncStatus: "Đã đồng bộ",
    lastSyncTime: "25/03/2026 08:55:00"
  },
  {
    id: "2",
    bkId: "130",
    ticketId: "631524097",
    csId: "190981",
    formType: "Tra soát",
    merchantId: "shopee_mall",
    ticketType: "Giao dịch gian lận giả mạo",
    status: TicketStatus.OVERDUE,
    source: "Admin",
    creator: "lead@gmail.com",
    updatedTime: "15/10/2025 15:18:45",
    createdTime: "15/10/2025 15:18:44",
    deadline: calculateDeadline("15/10/2025 15:18:44"),
    receivedTime: "15/10/2025 14:00:00",
    provider: "Bank",
    receptionMethod: "Portal",
    transactionCount: 2,
    transactions: [
      { id: "tx2", bkId: "BK456", mrcOrderId: "MRC456", service: "POS", amount: 200000, time: "15/10/2025 12:30:00" },
      { id: "tx3", bkId: "BK457", mrcOrderId: "MRC457", service: "POS", amount: 300000, time: "15/10/2025 13:00:00" }
    ],
    isRefunded: false,
    sendEmailToMerchant: true,
    timeline: [
      { type: "Created", time: "15/10/2025 15:18:44", content: "Tạo ticket tra soát" },
      { type: "Overdue", time: "18/10/2025 15:18:44", content: "Ticket quá hạn phản hồi" }
    ],
    syncStatus: "Đã đồng bộ",
    lastSyncTime: "15/10/2025 15:20:00"
  },
  {
    id: "3",
    bkId: "132",
    ticketId: "672771909",
    csId: "229964",
    formType: "Tra soát",
    merchantId: "grab_food",
    ticketType: "Yêu cầu hoàn tiền",
    status: TicketStatus.RESPONDED,
    source: "Portal",
    creator: "system@baokim.vn",
    updatedTime: "27/03/2026 10:48:47",
    createdTime: "27/03/2026 09:48:46",
    deadline: calculateDeadline("27/03/2026 09:48:46"),
    receivedTime: "27/03/2026 09:00:00",
    provider: "Momo",
    receptionMethod: "Portal",
    transactionCount: 1,
    transactions: [
      { id: "tx4", bkId: "BK789", mrcOrderId: "MRC789", service: "Ví điện tử", amount: 85000, time: "27/03/2026 08:30:00" }
    ],
    isRefunded: true,
    sendEmailToMerchant: false,
    timeline: [
      { type: "Created", time: "27/03/2026 09:48:46", content: "Tạo ticket tra soát" },
      { type: "Responded", time: "27/03/2026 10:45:00", content: "Merchant đã phản hồi" }
    ],
    syncStatus: "Đã đồng bộ",
    lastSyncTime: "27/03/2026 10:50:00"
  },
  {
    id: "4",
    bkId: "133",
    ticketId: "672771910",
    csId: "229965",
    formType: "Tra soát",
    merchantId: "tiki_official",
    ticketType: "Giao dịch không thành công",
    status: TicketStatus.CREATED,
    source: "Admin",
    creator: "cs_staff@baokim.vn",
    updatedTime: "28/03/2026 11:48:47",
    createdTime: "28/03/2026 11:48:46",
    deadline: calculateDeadline("28/03/2026 11:48:46"),
    receivedTime: "28/03/2026 11:00:00",
    provider: "Bank",
    receptionMethod: "Email",
    transactionCount: 1,
    transactions: [
      { id: "tx5", bkId: "BK012", mrcOrderId: "MRC012", service: "Cổng thanh toán", amount: 2500000, time: "28/03/2026 10:30:00" }
    ],
    isRefunded: false,
    sendEmailToMerchant: true,
    timeline: [
      { type: "Created", time: "28/03/2026 11:48:46", content: "Tạo ticket tra soát" }
    ],
    syncStatus: "Chưa đồng bộ",
    lastSyncTime: ""
  }
];

// --- Components ---

const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'Chưa nhập') return null;
  const configs: Record<string, { color: string, bg: string }> = {
    'Đã nhập': { color: 'text-green-600', bg: 'bg-green-50' },
    'Thiếu thông tin': { color: 'text-amber-600', bg: 'bg-amber-50' },
    'Lỗi duplicate': { color: 'text-red-600', bg: 'bg-red-50' },
    'Không đủ điều kiện': { color: 'text-slate-500', bg: 'bg-slate-200' },
  };
  const config = configs[status] || { color: 'text-slate-400', bg: 'bg-slate-100' };
  return (
    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider ${config.color} ${config.bg} border border-current opacity-70`}>
      {status}
    </span>
  );
};

const Badge = ({ status, type, deadline }: { status: string, type: 'order' | 'ticket', deadline?: string }) => {
  const getColors = () => {
    if (type === 'order') {
      switch (status) {
        case OrderStatus.PROCESSING: return "bg-orange-100 text-orange-600";
        case OrderStatus.SUCCESS: return "bg-green-100 text-green-600";
        case OrderStatus.REFUNDED: return "bg-gray-100 text-gray-600";
        default: return "bg-gray-100 text-gray-600";
      }
    } else {
      const isTicketOverdue = deadline ? isOverdue(deadline) : false;
      if (isTicketOverdue && status !== TicketStatus.CLOSED) {
        return "bg-red-100 text-red-600";
      }
      switch (status) {
        case TicketStatus.CREATED: return "bg-cyan-100 text-cyan-600";
        case TicketStatus.WAITING_RESPONSE: return "bg-yellow-100 text-yellow-600";
        case TicketStatus.RESPONDED: return "bg-blue-100 text-blue-600";
        case TicketStatus.OVERDUE: return "bg-red-100 text-red-600";
        case TicketStatus.CLOSED: return "bg-green-100 text-green-600";
        default: return "bg-gray-100 text-gray-600";
      }
    }
  };

  const displayStatus = () => {
    if (type === 'ticket' && deadline && isOverdue(deadline) && status !== TicketStatus.CLOSED) {
      return TicketStatus.OVERDUE;
    }
    return status;
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getColors()}`}>
      {displayStatus()}
    </span>
  );
};

const TicketActions = ({ ticket, onAction }: { ticket: Ticket, onAction: (action: string, ticket: Ticket) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
      >
        <MoreHorizontal size={16} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-slate-200 z-20 py-1 overflow-hidden"
            >
              <button 
                onClick={() => { onAction('view', ticket); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Eye size={16} className="text-slate-400" />
                <span>Xem chi tiết</span>
              </button>
              <button 
                onClick={() => { onAction('edit', ticket); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <Pencil size={16} className="text-slate-400" />
                <span>Sửa</span>
              </button>
              <button 
                onClick={() => { onAction('view_history', ticket); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <History size={16} className="text-slate-400" />
                <span>Xem lịch sử</span>
              </button>
              <div className="border-t border-slate-100 my-1"></div>
              <button 
                onClick={() => { onAction('delete', ticket); setIsOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} className="text-red-400" />
                <span>Xoá ticket</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [role, setRole] = useState<'portal' | 'admin' | 'filum'>('portal');
  const [orders] = useState<Order[]>(MOCK_ORDERS);
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);
  const [view, setView] = useState<'list' | 'create' | 'detail' | 'manual_create'>('list');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [history, setHistory] = useState<DisputeLookupRecord[]>([]);

  // --- Handlers ---
  const handleCreateTicket = (newTicket: Ticket) => {
    setTickets([newTicket, ...tickets]);
    setView('list');
  };

  const handleUpdateTicket = (updatedTicket: Ticket) => {
    setTickets(tickets.map(t => t.id === updatedTicket.id ? updatedTicket : t));
    if (selectedTicket?.id === updatedTicket.id) {
      setSelectedTicket(updatedTicket);
    }
  };

  const handleUpdateTicketStatus = (id: string, status: TicketStatus) => {
    const now = new Date().toLocaleString();
    setTickets(tickets.map(t => {
      if (t.id === id) {
        const newTimeline = [...(t.timeline || []), { type: "Status Updated", time: now, content: `Trạng thái thay đổi thành: ${status}` }];
        return { ...t, status, updatedTime: now, timeline: newTimeline };
      }
      return t;
    }));
  };

  const handleAdminAction = (action: string, ticket?: Ticket) => {
    if (action === 'create') {
      setView('create');
    } else if (action === 'view' && ticket) {
      setSelectedTicket(ticket);
      setView('detail');
    } else if (action === 'resend_email' && ticket) {
      const now = new Date().toLocaleString();
      const updatedTicket = {
        ...ticket,
        timeline: [...(ticket.timeline || []), { type: "Email Sent", time: now, content: "Gửi lại email cho merchant" }]
      };
      handleUpdateTicket(updatedTicket);
      alert(`Đã gửi lại email cho merchant của ticket #${ticket.ticketId}`);
    } else if (action === 'resend_notify' && ticket) {
      const now = new Date().toLocaleString();
      const updatedTicket = {
        ...ticket,
        timeline: [...(ticket.timeline || []), { type: "Notify Sent", time: now, content: "Đẩy lại notification cho merchant" }]
      };
      handleUpdateTicket(updatedTicket);
      alert(`Đã đẩy lại notification cho ticket #${ticket.ticketId}`);
    } else if (action === 'edit' && ticket) {
      alert(`Sửa ticket #${ticket.ticketId}`);
    } else if (action === 'delete' && ticket) {
      if (confirm(`Bạn có chắc chắn muốn xoá ticket #${ticket.ticketId}?`)) {
        setTickets(prev => prev.filter(t => t.id !== ticket.id));
      }
    } else if (action === 'view_history' && ticket) {
      alert(`Xem lịch sử ticket #${ticket.ticketId}`);
    } else if (action === 'close' && ticket) {
      handleUpdateTicketStatus(ticket.id, TicketStatus.CLOSED);
      alert(`Đã đóng ticket #${ticket.ticketId}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      {/* Sidebar Role Switcher */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-cyan-400" />
            System Roles
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => { setRole('portal'); setView('list'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${role === 'portal' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <UserCircle className="w-5 h-5" />
            Portal (Merchant)
          </button>
          <button 
            onClick={() => { setRole('admin'); setView('list'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${role === 'admin' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <TicketIcon className="w-5 h-5" />
            Admin (Back-office)
          </button>
          <button 
            onClick={() => { setRole('filum'); setView('list'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${role === 'filum' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <RefreshCcw className="w-5 h-5" />
            Admin (Phản hồi TS)
          </button>
          <button 
            onClick={() => { setRole('portal_dispute'); setView('list'); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${role === 'portal_dispute' ? 'bg-cyan-600 text-white' : 'hover:bg-slate-800 text-slate-400'}`}
          >
            <History className="w-5 h-5" />
            Portal (Phản hồi TS)
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-4 py-2 text-xs text-slate-500 uppercase font-bold tracking-widest">
            Current Role: {role === 'filum' ? 'Admin (Phản hồi TS)' : role === 'portal_dispute' ? 'Portal (Phản hồi TS)' : role}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {role === 'portal' && (
            <motion.div 
              key="portal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-8"
            >
              <PortalView orders={orders} tickets={tickets} onRespond={(id) => handleUpdateTicketStatus(id, TicketStatus.RESPONDED)} />
            </motion.div>
          )}

          {role === 'portal_dispute' && (
            <motion.div 
              key="portal_dispute"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-8"
            >
              <PortalDisputeManagement />
            </motion.div>
          )}

          {role === 'admin' && (
            <motion.div 
              key="admin"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-8"
            >
              {view === 'list' ? (
                <AdminListView tickets={tickets} onAction={handleAdminAction} onManualCreate={() => setView('manual_create')} />
              ) : view === 'create' ? (
                <CreateDisputeWorkspace onBack={() => setView('list')} history={history} setHistory={setHistory} />
              ) : view === 'manual_create' ? (
                <ManualDisputeCreationWorkspace onBack={() => setView('list')} history={history} setHistory={setHistory} />
              ) : (
                selectedTicket && <AdminDetailView ticket={selectedTicket} onBack={() => setView('list')} onUpdate={handleUpdateTicket} />
              )}
            </motion.div>
          )}

          {role === 'filum' && (
            <motion.div 
              key="filum"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-8"
            >
              <FilumView tickets={tickets} onProcess={(id) => handleUpdateTicketStatus(id, TicketStatus.CLOSED)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Portal View ---
interface DisputeFormState {
  orderStatus: string;
  provider: string;
  method: string;
  disputeType: string;
  orderValue: number;
  disputeValue: number;
  receptionMethod: string;
  isRefunded: boolean;
  sendEmail: boolean;
  note: string;
  time: string;
  status: string;
  attachments?: File[];
}

interface MerchantSettingsState {
  sendEmail: boolean;
  emailSubject: string;
  emailBody: string;
  erpEmail: string;
}

// --- Dispute Mapping Constants ---
const DISPUTE_METHODS = [
  "VA", "ATM", "BNPL", "Thẻ tín dụng", "Trả góp thẻ", "VNPAY", "Chi hộ"
];

const DISPUTE_CATEGORIES_MAPPING: Record<string, string[]> = {
  COMMON: [
    "Kiểm tra trạng thái giao dịch",
    "Khách hàng bị trừ tiền nhưng giao dịch không thành công",
    "Hỗ trợ hoàn huỷ giao dịch",
    "GD chưa được đối soát",
    "Phản ánh chất lượng dịch vụ",
    "Không nhận được thông báo giao dịch",
    "Sai phí giao dịch",
    "Khác"
  ],
  ATM_CREDIT_EXTRA: ["Kiểm tra nguyên nhân lỗi giao dịch"],
  VA_EXTRA: ["Kiểm tra thông tin người chuyển tiền"],
  BNPL_EXTRA: ["Cung cấp số liên hệ của Tổ chức tài chính (TCTC)", "Kiểm tra kết quả thẩm định"],
  TRA_GOP_THE: [
    "Kiểm tra trạng thái giao dịch",
    "Khách hàng bị trừ tiền nhưng giao dịch không thành công",
    "Hỗ trợ huỷ chuyển đổi giao dịch",
    "GD chưa được đối soát",
    "Phản ánh chất lượng dịch vụ",
    "Điều chỉnh thông tin giao dịch trả góp (Tên khách hàng…)",
    "Không nhận được thông báo giao dịch",
    "Sai phí giao dịch",
    "Khác"
  ],
  CHI_HO: [
    "Kiểm tra trạng thái giao dịch",
    "Giao dịch thành công nhưng khách hàng không nhận được tiền",
    "Thu hồi giao dịch do chuyển nhầm",
    "GD chưa được đối soát",
    "Phản ánh chất lượng dịch vụ",
    "Không nhận được thông báo giao dịch",
    "Sai phí giao dịch",
    "Cung cấp giấy báo nợ / báo có",
    "Khác"
  ]
};

function getDisputeCategories(method: string): string[] {
  if (!method) return [];
  if (method === "Trả góp thẻ") return DISPUTE_CATEGORIES_MAPPING.TRA_GOP_THE;
  if (method === "Chi hộ") return DISPUTE_CATEGORIES_MAPPING.CHI_HO;
  
  const common = [...DISPUTE_CATEGORIES_MAPPING.COMMON];
  if (method === "ATM" || method === "Thẻ tín dụng") {
    common.push(...DISPUTE_CATEGORIES_MAPPING.ATM_CREDIT_EXTRA);
  }
  if (method === "VA") {
    common.push(...DISPUTE_CATEGORIES_MAPPING.VA_EXTRA);
  }
  if (method === "BNPL") {
    common.push(...DISPUTE_CATEGORIES_MAPPING.BNPL_EXTRA);
  }
  return common;
}

// --- Searchable Select Component ---
function SearchableSelect({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  disabled, 
  error 
}: { 
  value: string, 
  onChange: (val: string) => void, 
  options: string[], 
  placeholder: string, 
  disabled?: boolean,
  error?: string
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <div 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 border rounded-xl text-sm flex items-center justify-between cursor-pointer bg-white transition-all ${disabled ? 'bg-slate-50 cursor-not-allowed text-slate-400' : 'hover:border-slate-300'} ${error ? 'border-red-500' : 'border-slate-200'}`}
      >
        <div className="flex-1 truncate">
          {value ? (
            <span className="text-slate-700 font-medium">{value}</span>
          ) : (
            <span className="text-slate-400">{placeholder}</span>
          )}
        </div>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-3 border-b border-slate-100 flex items-center gap-2 sticky top-0 bg-white">
                <Search size={14} className="text-slate-400" />
                <input 
                  autoFocus
                  className="w-full text-sm outline-none font-medium"
                  placeholder="Tìm nội dung..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onClick={e => e.stopPropagation()}
                />
              </div>
              <div className="max-h-60 overflow-y-auto divide-y divide-slate-50">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map(opt => (
                    <div 
                      key={opt}
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(opt);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      className={`p-3 text-sm cursor-pointer transition-colors ${value === opt ? 'bg-cyan-50 text-cyan-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {opt}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-xs text-slate-300 font-black uppercase tracking-widest">Không có kết quả</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {error && <p className="mt-1 text-[10px] font-black text-red-500 uppercase ml-1 animate-pulse tracking-wide">{error}</p>}
    </div>
  );
}

// --- Create Dispute Workspace (4-Step Flow) ---
function CreateDisputeWorkspace({ onBack, history, setHistory }: { onBack: () => void, history: DisputeLookupRecord[], setHistory: Dispatch<SetStateAction<DisputeLookupRecord[]>> }) {
  const [searchType, setSearchType] = useState('bk');
  const [originalService, setOriginalService] = useState('Thu hộ');
  const [searchCodes, setSearchCodes] = useState('');
  const [searchResults, setSearchResults] = useState<Order[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFormActive, setIsFormActive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [historyFilter, setHistoryFilter] = useState('');
  const [selectedHistoryRecord, setSelectedHistoryRecord] = useState<DisputeLookupRecord | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [activeTransactionId, setActiveTransactionId] = useState<string | null>(null);
  const [expandedMerchants, setExpandedMerchants] = useState<string[]>([]);
  const [disputeForms, setDisputeForms] = useState<Record<string, DisputeFormState>>({});
  const [merchantSettings, setMerchantSettings] = useState<Record<string, MerchantSettingsState>>({});
  const [saveStatus, setSaveStatus] = useState<Record<string, 'success' | 'error' | null>>({});

  const [editingEmailMerchantId, setEditingEmailMerchantId] = useState<string | null>(null);

  const handleSearch = () => {
    if (!searchCodes.trim()) return;
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      const codes = searchCodes.split(/[\n,]+/).map(c => c.trim()).filter(c => c);
      const results = MOCK_ORDERS.filter(o => 
        codes.includes(o.bkOrderId) || codes.includes(o.mrcOrderId)
      );
      // If no mock matches, create some fake ones for demo
      if (results.length === 0) {
        setSearchResults(codes.map((code, i) => ({
          ...MOCK_ORDERS[0],
          id: `fake-${i}`,
          bkOrderId: code,
          mrcOrderId: `MRC-${code}`,
          customer: { name: "Khách hàng demo", phone: "0900000000" }
        })));
      } else {
        setSearchResults(results);
      }
      setIsSearching(false);
      setSelectedIds([]);
      setIsFormActive(false);
    }, 600);
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedOrders = searchResults.filter(r => selectedIds.includes(r.id));
  const distinctMerchants = Array.from(new Set(selectedOrders.map(o => o.mrcCode)));
  const hasMerchantError = distinctMerchants.length > 1;

  const handleOpenForm = () => {
    if (selectedOrders.length === 0) return;
    
    const newDisputeForms: Record<string, DisputeFormState> = {};
    const newMerchantSettings: Record<string, MerchantSettingsState> = {};
    const mrcIds = Array.from(new Set(selectedOrders.map(o => o.mrcCode)));

    selectedOrders.forEach(order => {
      newDisputeForms[order.id] = {
        orderStatus: order.status,
        provider: 'Napas',
        method: DISPUTE_METHODS.includes(order.method) ? order.method : '',
        disputeType: '',
        orderValue: order.value,
        disputeValue: order.value,
        receptionMethod: 'Qua Portal',
        isRefunded: false,
        sendEmail: true,
        note: '',
        time: new Date().toISOString().slice(0, 16),
        status: 'Chưa nhập'
      };
    });

    (mrcIds as string[]).forEach((mrcId: string) => {
      newMerchantSettings[mrcId] = {
        sendEmail: true,
        emailSubject: 'Thông báo về yêu cầu tra soát giao dịch',
        emailBody: `Kính gửi Quý đối tác ${mrcId},

Chúng tôi xin thông báo về yêu cầu tra soát mới cho giao dịch của Quý đối tác.

Quý đối tác vui lòng kiểm tra và phản hồi thông tin qua hệ thống Portal trong vòng 24h làm việc.

Trân trọng,
Đội ngũ hỗ trợ Baokim.`,
        erpEmail: `contact@${mrcId.toLowerCase()}.com`
      };
    });

    setDisputeForms(newDisputeForms);
    setMerchantSettings(newMerchantSettings);
    setActiveTransactionId(selectedOrders[0].id);
    setExpandedMerchants(mrcIds);
    setIsFormActive(true);
    
    // Scroll to form
    setTimeout(() => {
      document.getElementById('dispute-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSaveTransaction = (id: string) => {
    const form = disputeForms[id];
    if (!form.disputeValue || form.disputeValue <= 0) {
      setSaveStatus({ ...saveStatus, [id]: 'error' });
      return;
    }
    
    setDisputeForms({
      ...disputeForms,
      [id]: { ...form, status: 'Đã nhập' }
    });
    setSaveStatus({ ...saveStatus, [id]: 'success' });
    setTimeout(() => setSaveStatus({ ...saveStatus, [id]: null }), 3000);
  };

  const handleCreateDispute = () => {
    const validIds = Object.keys(disputeForms).filter(id => disputeForms[id].status === 'Đã nhập');
    if (validIds.length === 0) {
      alert("Vui lòng nhập và lưu ít nhất một giao dịch hợp lệ trước khi tạo tra soát.");
      return;
    }

    const newRecords: DisputeLookupRecord[] = selectedOrders
      .filter(o => validIds.includes(o.id))
      .map((order, idx) => {
        const form = disputeForms[order.id];
        const mrcSettings = merchantSettings[order.mrcCode];
        
        return {
          id: Math.random().toString(36).substr(2, 9),
          stt: history.length + idx + 1,
          idTraSoat: `TS${Math.floor(Math.random() * 1000000)}`,
          idGiaoDich: order.bkOrderId,
          idDonHang: order.mrcOrderId,
          donHangMrc: order.mrcOrderId,
          trangThaiGD: order.status,
          thoiGianGD: order.createdTime,
          maMerchant: order.mrcCode,
          phuongThuc: form.method,
          dichVuGoc: originalService,
          loaiYeuCau: "Tra soát",
          phanLoai: form.disputeType,
          giaTriDonHang: form.orderValue,
          thoiGianNhan: form.time.replace('T', ' '),
          thoiGianTao: new Date().toLocaleString(),
          thoiGianPhanHoi: form.isRefunded ? new Date().toLocaleString() : "-",
          thoiGianHoanThanh: form.isRefunded ? new Date().toLocaleString() : "-",
          trangThai: form.isRefunded ? "Hoàn thành" : "Đã gửi yêu cầu",
          ketQua: form.isRefunded ? "Đã hoàn tiền (Admin (Phản hồi TS) xử lý nội bộ)" : "Đang xử lý",
          isRefunded: form.isRefunded,
          sendEmailToMrc: mrcSettings.sendEmail,
          emailSubject: mrcSettings.emailSubject,
          emailBody: mrcSettings.emailBody,
          attachments: form.attachments
        };
      });

    setHistory([...newRecords, ...history]);
    alert(`Đã tạo thành công ${newRecords.length} yêu cầu tra soát!`);
    
    setIsFormActive(false);
    setSelectedIds([]);
    setDisputeForms({});
    setMerchantSettings({});
    setActiveTransactionId(null);
    setErrors({});
    // Scroll to lookup
    setTimeout(() => {
      document.getElementById('lookup-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const filteredHistory = history.filter(r => 
    r.idTraSoat.toLowerCase().includes(historyFilter.toLowerCase()) ||
    r.idGiaoDich.toLowerCase().includes(historyFilter.toLowerCase()) ||
    r.maMerchant.toLowerCase().includes(historyFilter.toLowerCase())
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-600 rounded-lg text-white">
            <PlusCircle size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Tạo tra soát</h1>
            <p className="text-sm text-slate-500">Quy trình 4 bước tạo và quản lý khiếu nại giao dịch</p>
          </div>
        </div>
        <button onClick={onBack} className="px-4 py-2 text-slate-500 hover:text-slate-800 font-medium flex items-center gap-2">
          <ArrowLeft size={16} /> Quay lại
        </button>
      </div>

      {/* STEP 1: TẠO GIAO DỊCH TRA SOÁT */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">1</span>
            <h2 className="font-bold text-slate-800 uppercase tracking-tight">Tạo giao dịch tra soát</h2>
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Loại mã giao dịch</label>
              <select 
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none bg-white"
              >
                <option value="bk">Mã giao dịch Baokim</option>
                <option value="mrc">Mã giao dịch Merchant</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Dịch vụ gốc</label>
              <select 
                value={originalService}
                onChange={(e) => setOriginalService(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none bg-white"
              >
                <option value="Chi hộ">Chi hộ</option>
                <option value="Thu hộ">Thu hộ</option>
                <option value="Cổng thanh toán">Cổng thanh toán</option>
                <option value="Ví điện tử">Ví điện tử</option>
                <option value="Agent Banking">Agent Banking</option>
                <option value="Trả góp">Trả góp</option>
                <option value="BNPL">BNPL</option>
                <option value="Hàng hoá số">Hàng hoá số</option>
                <option value="DV chung">DV chung</option>
                <option value="Leadgen">Leadgen</option>
                <option value="B2B">B2B</option>
                <option value="Retail">Retail</option>
              </select>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Ô nhập mã giao dịch</label>
              <textarea 
                value={searchCodes}
                onChange={(e) => setSearchCodes(e.target.value)}
                rows={4}
                placeholder="Nhập 1 hoặc nhiều mã giao dịch, cách nhau bằng dấu phẩy hoặc xuống dòng..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <p className="text-[11px] text-slate-400 italic">• Cho phép nhập 1 hoặc nhiều mã giao dịch</p>
                  <p className="text-[11px] text-slate-400 italic">• Hỗ trợ nhiều mã cách nhau bằng dấu phẩy</p>
                  <p className="text-[11px] text-slate-400 italic">• Có thể paste danh sách từ Excel</p>
                </div>
                {searchCodes.split(/[\n,]+/).filter(c => c.trim()).length > 1 && (
                  <span className="px-2 py-0.5 bg-cyan-50 text-cyan-600 text-[10px] font-bold rounded uppercase">Nhiều mã giao dịch</span>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button 
                onClick={() => { setSearchCodes(''); setSearchResults([]); setSelectedIds([]); }}
                className="px-6 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors"
              >
                Làm mới
              </button>
              <button 
                onClick={handleSearch}
                disabled={isSearching || !searchCodes.trim()}
                className="px-8 py-2.5 bg-cyan-600 text-white font-bold text-sm rounded-xl hover:bg-cyan-700 shadow-lg shadow-cyan-100 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSearching ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STEP 2: THÔNG TIN GIAO DỊCH */}
      <section className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all ${searchResults.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">2</span>
            <h2 className="font-bold text-slate-800 uppercase tracking-tight">Thông tin giao dịch</h2>
          </div>
          <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
            <span className="text-slate-400">Đã tìm thấy: <span className="text-cyan-600">{searchResults.length}</span></span>
            <span className="text-slate-400">Đã chọn: <span className="text-cyan-600">{selectedIds.length}</span></span>
          </div>
        </div>
        <div className="p-0">
          {hasMerchantError && (
            <div className="m-4 p-3 bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2 rounded-xl">
              <XCircle size={18} />
              Chỉ được gộp các giao dịch cùng merchant trong một yêu cầu tra soát
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="p-4 w-12">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.length === searchResults.length && searchResults.length > 0}
                      onChange={() => setSelectedIds(selectedIds.length === searchResults.length ? [] : searchResults.map(r => r.id))}
                      className="rounded text-cyan-600"
                    />
                  </th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">STT</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Mã merchant</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Mã GD Baokim</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Mã GD NCC</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Mã đơn hàng MRC</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Trạng thái</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Thời gian GD</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Phương thức</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {searchResults.map((row, idx) => (
                  <tr key={row.id} className={`hover:bg-slate-50 transition-colors ${selectedIds.includes(row.id) ? 'bg-cyan-50/30' : ''}`}>
                    <td className="p-4">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        className="rounded text-cyan-600"
                      />
                    </td>
                    <td className="p-4 text-sm text-slate-500">{idx + 1}</td>
                    <td className="p-4 text-sm font-bold text-slate-700">{row.mrcCode}</td>
                    <td className="p-4 text-sm font-medium text-cyan-600">{row.bkOrderId}</td>
                    <td className="p-4 text-sm text-slate-600">NCC-{row.bkOrderId.slice(-6)}</td>
                    <td className="p-4 text-sm text-slate-600">{row.mrcOrderId}</td>
                    <td className="p-4"><Badge status={row.status} type="order" /></td>
                    <td className="p-4 text-sm text-slate-500">{row.createdTime}</td>
                    <td className="p-4 text-sm text-slate-600">{row.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-slate-100 flex justify-end">
            <button 
              onClick={handleOpenForm}
              disabled={selectedIds.length === 0 || hasMerchantError}
              className="px-8 py-3 bg-cyan-600 text-white font-bold text-sm rounded-xl hover:bg-cyan-700 shadow-lg shadow-cyan-100 transition-all disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
            >
              Yêu cầu tra soát <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* STEP 3: YÊU CẦU TRA SOÁT */}
      <section id="dispute-form" className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-500 ${!isFormActive ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">3</span>
            <h2 className="font-bold text-slate-800 uppercase tracking-tight">Yêu cầu tra soát</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Tiến độ:</span>
            <span className="text-xs font-bold text-cyan-600">
              {Object.values(disputeForms).filter((f: DisputeFormState) => f.status === 'Đã nhập').length} / {selectedOrders.length} giao dịch
            </span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* LEFT COLUMN: MASTER LIST */}
          <div className="w-full lg:w-1/3 border-r border-slate-100 bg-slate-50/30 overflow-y-auto max-h-[800px]">
            <div className="p-4 space-y-4">
              {distinctMerchants.map((mrcId: string) => {
                const mrcOrders = selectedOrders.filter(o => o.mrcCode === mrcId);
                const settings = merchantSettings[mrcId] || { sendEmail: true, erpEmail: '', emailSubject: '', emailBody: '' };
                const isExpanded = expandedMerchants.includes(mrcId);
                
                return (
                  <div key={mrcId} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Merchant Header */}
                    <div 
                      onClick={() => setExpandedMerchants(prev => isExpanded ? prev.filter(id => id !== mrcId) : [...prev, mrcId])}
                      className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400">
                          <Building2 size={18} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-800">{mrcId}</h3>
                          <div className="flex flex-col">
                            <p className="text-[10px] text-slate-500 font-medium">{mrcOrders.length} giao dịch</p>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingEmailMerchantId(mrcId);
                                setActiveTransactionId(null);
                              }}
                              className="text-[10px] text-cyan-600 font-bold hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <Mail size={10} /> Xem nội dung email
                            </button>
                          </div>
                        </div>
                      </div>
                      <ChevronDown size={16} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                    
                    {isExpanded && (
                      <div className="p-2 space-y-1">
                        {mrcOrders.map(order => {
                          const form = disputeForms[order.id] || {};
                          const isActive = activeTransactionId === order.id;
                          
                          return (
                            <div 
                              key={order.id}
                              onClick={() => {
                                setActiveTransactionId(order.id);
                                setEditingEmailMerchantId(null);
                              }}
                              className={`p-3 rounded-lg transition-all cursor-pointer flex items-center justify-between group ${isActive ? 'bg-cyan-50 border-cyan-200 border' : 'hover:bg-slate-50 border-transparent border'}`}
                            >
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-700">{order.bkOrderId}</span>
                                <span className="text-[10px] text-slate-400">{order.value.toLocaleString()} VND</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <StatusBadge status={form.status} />
                                <ArrowRight size={14} className={`text-cyan-500 transition-transform ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* RIGHT COLUMN: DETAIL FORM */}
          <div className="flex-1 bg-white p-8 overflow-y-auto max-h-[800px]">
            {editingEmailMerchantId ? (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Nội dung email – {editingEmailMerchantId}</h3>
                    <p className="text-sm text-slate-500 mt-1">Xem và chỉnh sửa nội dung email gửi cho merchant khi tạo tra soát</p>
                  </div>
                  <button 
                    onClick={() => setEditingEmailMerchantId(null)}
                    className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                    <input 
                      type="checkbox" 
                      id="sendEmailMerchant"
                      checked={merchantSettings[editingEmailMerchantId]?.sendEmail}
                      onChange={(e) => setMerchantSettings({
                        ...merchantSettings, 
                        [editingEmailMerchantId]: {...merchantSettings[editingEmailMerchantId], sendEmail: e.target.checked}
                      })}
                      className="w-5 h-5 rounded text-cyan-600 focus:ring-cyan-500"
                    />
                    <label htmlFor="sendEmailMerchant" className="text-sm font-bold text-cyan-900 cursor-pointer">Gửi email tổng hợp cho merchant này</label>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Tiêu đề email</label>
                    <input 
                      type="text" 
                      value={merchantSettings[editingEmailMerchantId]?.emailSubject}
                      onChange={(e) => setMerchantSettings({
                        ...merchantSettings, 
                        [editingEmailMerchantId]: {...merchantSettings[editingEmailMerchantId], emailSubject: e.target.value}
                      })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nội dung email</label>
                    <textarea 
                      rows={12}
                      value={merchantSettings[editingEmailMerchantId]?.emailBody}
                      onChange={(e) => setMerchantSettings({
                        ...merchantSettings, 
                        [editingEmailMerchantId]: {...merchantSettings[editingEmailMerchantId], emailBody: e.target.value}
                      })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none resize-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    onClick={() => setEditingEmailMerchantId(null)}
                    className="px-6 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    Đóng
                  </button>
                  <button 
                    onClick={() => {
                      setEditingEmailMerchantId(null);
                    }}
                    className="px-8 py-2.5 bg-cyan-600 text-white font-bold text-sm rounded-xl hover:bg-cyan-700 shadow-lg shadow-cyan-100 transition-all"
                  >
                    Lưu cấu hình email
                  </button>
                </div>
              </div>
            ) : activeTransactionId ? (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">Yêu cầu tra soát – {selectedOrders.find(o => o.id === activeTransactionId)?.bkOrderId}</h3>
                    <p className="text-sm text-slate-500 mt-1">Vui lòng hoàn tất thông tin tra soát cho giao dịch này</p>
                  </div>
                  {saveStatus[activeTransactionId] === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100"
                    >
                      <CheckCircle2 size={16} />
                      <span className="text-xs font-bold">Đã lưu</span>
                    </motion.div>
                  )}
                </div>
                
                {/* Read-only Info */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Merchant</p>
                    <p className="text-xs font-bold text-slate-700">{selectedOrders.find(o => o.id === activeTransactionId)?.mrcCode}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Mã giao dịch</p>
                    <p className="text-xs font-bold text-slate-700">{selectedOrders.find(o => o.id === activeTransactionId)?.bkOrderId}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Dịch vụ gốc</p>
                    <p className="text-xs font-bold text-slate-700">{originalService}</p>
                  </div>
                </div>
                
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Trạng thái đơn hàng</label>
                    <input 
                      type="text" 
                      value={disputeForms[activeTransactionId]?.orderStatus}
                      onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], orderStatus: e.target.value}})}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nhà cung cấp</label>
                    <select 
                      value={disputeForms[activeTransactionId]?.provider}
                      onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], provider: e.target.value}})}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none bg-white"
                    >
                      <option value="Napas">Napas</option>
                      <option value="VPBank">VPBank</option>
                      <option value="Momo">Momo</option>
                      <option value="Bank khác">Bank khác</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phương thức <span className="text-red-500">*</span></label>
                    <select 
                      value={disputeForms[activeTransactionId]?.method}
                      onChange={(e) => {
                        const newMethod = e.target.value;
                        setDisputeForms({
                          ...disputeForms, 
                          [activeTransactionId]: {
                            ...disputeForms[activeTransactionId], 
                            method: newMethod,
                            disputeType: '' // Reset logic
                          }
                        });
                      }}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none bg-white font-medium"
                    >
                      <option value="">-- Chọn phương thức --</option>
                      {DISPUTE_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Phân loại tra soát <span className="text-red-500">*</span></label>
                    <SearchableSelect 
                      value={disputeForms[activeTransactionId]?.disputeType}
                      onChange={(val) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], disputeType: val}})}
                      options={getDisputeCategories(disputeForms[activeTransactionId]?.method)}
                      placeholder={disputeForms[activeTransactionId]?.method ? "Chọn phân loại..." : "Chọn phương thức trước"}
                      disabled={!disputeForms[activeTransactionId]?.method}
                      error={disputeForms[activeTransactionId]?.method && !getDisputeCategories(disputeForms[activeTransactionId]?.method).includes(disputeForms[activeTransactionId]?.disputeType) && disputeForms[activeTransactionId]?.disputeType ? "Phân loại không phù hợp với phương thức đã chọn" : ""}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Giá trị đơn hàng</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={disputeForms[activeTransactionId]?.orderValue}
                        onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], orderValue: Number(e.target.value)}})}
                        className="w-full pl-4 pr-12 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                      <span className="absolute right-4 top-2.5 text-xs font-bold text-slate-400">VND</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Giá trị tra soát</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={disputeForms[activeTransactionId]?.disputeValue}
                        onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], disputeValue: Number(e.target.value)}})}
                        className="w-full pl-4 pr-12 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                      <span className="absolute right-4 top-2.5 text-xs font-bold text-slate-400">VND</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Hình thức tiếp nhận</label>
                    <select 
                      value={disputeForms[activeTransactionId]?.receptionMethod}
                      onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], receptionMethod: e.target.value}})}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none bg-white"
                    >
                      <option value="Qua Portal">Qua Portal</option>
                      <option value="Qua Email">Qua Email</option>
                    </select>
                  </div>
                  
                  {/* Checkboxes Section */}
                  <div className="flex flex-col gap-2 pt-6">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-3 group relative">
                        <input 
                          type="checkbox" 
                          id="isRefundedDetail" 
                          checked={disputeForms[activeTransactionId]?.isRefunded}
                          onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], isRefunded: e.target.checked}})}
                          className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                        />
                        <label htmlFor="isRefundedDetail" className="text-sm font-bold text-slate-700 cursor-pointer">Đã hoàn tiền</label>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                          <div className="bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                            Admin (Phản hồi TS) tự xác nhận trạng thái hoàn tiền của giao dịch
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 group relative">
                        <input 
                          type="checkbox" 
                          id="sendEmailDetail" 
                          checked={disputeForms[activeTransactionId]?.sendEmail}
                          onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], sendEmail: e.target.checked}})}
                          className="w-5 h-5 rounded text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                        />
                        <label htmlFor="sendEmailDetail" className="text-sm font-bold text-slate-700 cursor-pointer">Gửi email</label>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                          <div className="bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                            Giao dịch được tick sẽ được đưa vào email gửi merchant
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Warning Message */}
                    {disputeForms[activeTransactionId]?.isRefunded && disputeForms[activeTransactionId]?.sendEmail && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 text-[11px] text-amber-600 font-medium"
                      >
                        <AlertTriangle size={14} />
                        <span>⚠ Giao dịch đã hoàn tiền nhưng vẫn được gửi email</span>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Ghi chú / mô tả</label>
                  <textarea 
                    rows={4}
                    value={disputeForms[activeTransactionId]?.note}
                    onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], note: e.target.value}})}
                    placeholder="Nhập ghi chú chi tiết cho yêu cầu tra soát này..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase">File đính kèm</label>
                  <div className="flex flex-wrap gap-3">
                    {disputeForms[activeTransactionId]?.attachments?.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg group animate-in fade-in scale-in-95">
                        <Paperclip size={14} className="text-slate-400" />
                        <span className="text-xs font-medium text-slate-600 truncate max-w-[120px]">{file.name}</span>
                        <button 
                          onClick={() => {
                            const newFiles = [...(disputeForms[activeTransactionId]?.attachments || [])];
                            newFiles.splice(idx, 1);
                            setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], attachments: newFiles}});
                          }}
                          className="hover:text-red-500 text-slate-300 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-slate-200 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition-all cursor-pointer group">
                      <Plus size={16} className="text-slate-400 group-hover:text-cyan-600" />
                      <span className="text-xs font-bold text-slate-500 group-hover:text-cyan-600">Thêm file</span>
                      <input 
                        type="file" 
                        multiple
                        className="hidden" 
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          const currentFiles = disputeForms[activeTransactionId]?.attachments || [];
                          setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], attachments: [...currentFiles, ...files]}});
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                <div className="p-6 bg-slate-50 rounded-full border border-slate-100">
                  <MousePointerClick size={48} className="opacity-20" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-slate-500">Chưa chọn giao dịch</p>
                  <p className="text-xs">Vui lòng chọn một giao dịch từ danh sách bên trái để nhập thông tin tra soát</p>
                </div>
              </div>
            )}
          </div>
        </div>


        {/* Global Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-2">
              <FileText size={18} /> Lưu nháp
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsFormActive(false)}
              className="px-6 py-2.5 text-slate-500 font-bold text-sm hover:text-slate-800"
            >
              Hủy
            </button>
            <button 
              onClick={handleCreateDispute}
              className="px-10 py-3 bg-cyan-600 text-white font-bold text-sm rounded-xl hover:bg-cyan-700 shadow-lg shadow-cyan-100 transition-all flex items-center gap-2"
            >
              <CheckCircle2 size={18} /> Tạo tra soát
            </button>
          </div>
        </div>
      </section>

      {/* Email Preview Modal removed - now integrated into right panel */}

      {/* STEP 4: TRA CỨU */}
      <section id="lookup-section" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">4</span>
              <h2 className="font-bold text-slate-800 uppercase tracking-tight">Tra cứu</h2>
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm ID tra soát, Mã Merchant..."
                value={historyFilter}
                onChange={(e) => setHistoryFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>
          <button 
            onClick={() => { setHistoryFilter(''); }}
            className="p-2 text-slate-400 hover:text-cyan-600 transition-colors"
          >
            <RefreshCcw size={18} />
          </button>
        </div>
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[2000px]">
              <thead className="bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">STT</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">ID tra soát</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">ID giao dịch</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">ID đơn hàng</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Đơn hàng MRC</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Trạng thái GD</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Thời gian GD</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Mã merchant</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Phương thức</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Loại yêu cầu</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Phân loại</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Giá trị đơn hàng</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Thời gian nhận</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Thời gian tạo</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">TG Merchant phản hồi</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">TG hoàn thành</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Trạng thái</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Kết quả xử lý</th>
                  <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredHistory.length === 0 ? (
                  <tr>
                    <td colSpan={19} className="p-12 text-center text-slate-400 text-sm italic">Không tìm thấy bản ghi tra soát nào.</td>
                  </tr>
                ) : (
                  filteredHistory.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-sm text-slate-500">{record.stt}</td>
                      <td className="p-4 text-sm font-bold text-cyan-600">{record.idTraSoat}</td>
                      <td className="p-4 text-sm text-slate-600 truncate max-w-[150px]">{record.idGiaoDich}</td>
                      <td className="p-4 text-sm text-slate-600 truncate max-w-[150px]">{record.idDonHang}</td>
                      <td className="p-4 text-sm text-slate-600">{record.donHangMrc}</td>
                      <td className="p-4"><Badge status={record.trangThaiGD} type="order" /></td>
                      <td className="p-4 text-sm text-slate-500">{record.thoiGianGD}</td>
                      <td className="p-4 text-sm font-medium text-slate-700">{record.maMerchant}</td>
                      <td className="p-4 text-sm text-slate-600">{record.phuongThuc}</td>
                      <td className="p-4 text-sm text-slate-600">{record.loaiYeuCau}</td>
                      <td className="p-4 text-sm text-slate-600">{record.phanLoai}</td>
                      <td className="p-4 text-sm font-bold">{record.giaTriDonHang.toLocaleString()}</td>
                      <td className="p-4 text-sm text-slate-500">{record.thoiGianNhan}</td>
                      <td className="p-4 text-sm text-slate-500">{record.thoiGianTao}</td>
                      <td className="p-4 text-sm text-slate-500">{record.thoiGianPhanHoi}</td>
                      <td className="p-4 text-sm text-slate-500">{record.thoiGianHoanThanh}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          record.trangThai === 'Đã gửi yêu cầu' ? 'bg-blue-100 text-blue-600' :
                          record.trangThai === 'Chờ phản hồi' ? 'bg-yellow-100 text-yellow-600' :
                          record.trangThai === 'Đã phản hồi' ? 'bg-cyan-100 text-cyan-600' :
                          record.trangThai === 'Quá hạn' ? 'bg-red-100 text-red-600' :
                          record.trangThai === 'Hoàn thành' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {record.trangThai}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-600">{record.ketQua}</td>
                      <td className="p-4">
                        <button 
                          onClick={() => setSelectedHistoryRecord(record)}
                          className="text-cyan-600 hover:text-cyan-700 font-bold text-xs uppercase tracking-wider"
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* History Detail Modal */}
      <AnimatePresence>
        {selectedHistoryRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <FileSearch className="w-5 h-5 text-cyan-600" />
                  Chi tiết tra soát: {selectedHistoryRecord.idTraSoat}
                </h3>
                <button onClick={() => setSelectedHistoryRecord(null)} className="p-2 text-slate-400 hover:text-slate-600">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Mã Merchant</p>
                    <p className="text-sm font-bold text-slate-700">{selectedHistoryRecord.maMerchant}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">ID Giao dịch</p>
                    <p className="text-sm text-slate-600 break-all">{selectedHistoryRecord.idGiaoDich}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Phân loại</p>
                    <p className="text-sm text-slate-600">{selectedHistoryRecord.phanLoai}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Giá trị đơn hàng</p>
                    <p className="text-sm font-bold text-slate-800">{selectedHistoryRecord.giaTriDonHang.toLocaleString()} VND</p>
                  </div>
                  {selectedHistoryRecord.isRefunded && (
                    <div className="p-3 bg-green-50 border border-green-100 rounded-xl">
                      <p className="text-[10px] font-bold text-green-600 uppercase">Xử lý nội bộ</p>
                      <p className="text-xs text-green-700 font-medium italic">Đã hoàn tiền cho khách hàng</p>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Trạng thái</p>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded uppercase">
                      {selectedHistoryRecord.trangThai}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Thời gian tạo</p>
                    <p className="text-sm text-slate-600">{selectedHistoryRecord.thoiGianTao}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Thời gian nhận</p>
                    <p className="text-sm text-slate-600">{selectedHistoryRecord.thoiGianNhan}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Kết quả xử lý</p>
                    <p className="text-sm text-slate-600">{selectedHistoryRecord.ketQua}</p>
                  </div>
                </div>

                {selectedHistoryRecord.attachments && selectedHistoryRecord.attachments.length > 0 && (
                  <div className="col-span-2 pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">File đính kèm ({selectedHistoryRecord.attachments.length})</p>
                    <div className="flex flex-wrap gap-3">
                      {selectedHistoryRecord.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                          <Paperclip size={14} className="text-cyan-600" />
                          <span className="text-xs font-medium text-slate-600 truncate max-w-[200px]">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedHistoryRecord(null)}
                  className="px-6 py-2 bg-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-300 transition-colors"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Manual Dispute Creation Workspace ---
function ManualDisputeCreationWorkspace({ onBack, history, setHistory }: { onBack: () => void, history: DisputeLookupRecord[], setHistory: Dispatch<SetStateAction<DisputeLookupRecord[]>> }) {
  const [step, setStep] = useState<'init' | 'collect' | 'process'>('init');
  const [collectMode, setCollectMode] = useState<'manual' | 'import' | null>(null);
  const [txList, setTxList] = useState<ManualTx[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importSummary, setImportSummary] = useState<{ total: number, valid: number, error: number, duplicate: number } | null>(null);

  // Form states matching CreateDisputeWorkspace
  const [disputeForms, setDisputeForms] = useState<Record<string, DisputeFormState>>({});
  const [activeTransactionId, setActiveTransactionId] = useState<string | null>(null);
  const [editingEmailMerchantId, setEditingEmailMerchantId] = useState<string | null>(null);
  const [merchantSettings, setMerchantSettings] = useState<Record<string, MerchantSettingsState>>({});
  const [isFormActive, setIsFormActive] = useState(false);
  const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'success'>>({});
  const [expandedMerchants, setExpandedMerchants] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    txnId: '',
    service: 'Thu hộ',
    merchant: '',
    orderId: '',
    method: '',
    provider: 'Napas',
    amount: 0,
    status: OrderStatus.SUCCESS,
    time: new Date().toLocaleString('sv-SE').replace(' ', 'T').slice(0, 16)
  });

  const handleAddManual = () => {
    if (!formData.txnId || !formData.merchant) return;
    const newTx: ManualTx = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData
    };
    setTxList([newTx, ...txList]);
    setSelectedIds(prev => [...prev, newTx.id]);
    
    // Auto-init form
    setDisputeForms(prev => ({
      ...prev,
      [newTx.id]: {
        orderStatus: newTx.status,
        provider: newTx.provider,
        method: DISPUTE_METHODS.includes(newTx.method) ? newTx.method : '',
        disputeType: '',
        orderValue: newTx.amount,
        disputeValue: newTx.amount,
        receptionMethod: 'Qua Portal',
        isRefunded: false,
        sendEmail: true,
        note: '',
        time: new Date().toLocaleString(),
        status: 'Đã nhập'
      }
    }));

    setManualModalOpen(false);
    setFormData({
      ...formData,
      txnId: '',
      orderId: '',
      amount: 0
    });
  };

  const handleDelete = (id: string) => {
    setTxList(prev => prev.filter(tx => tx.id !== id));
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const handleImportExcel = () => {
    setIsImporting(true);
    // Simulate import logic
    setTimeout(() => {
      const mockImports: ManualTx[] = [
        { id: 'imp-1', txnId: 'BK_123456', service: 'Thu hộ', merchant: 'apple_store_vn', orderId: 'ORD-123', method: 'Napas', provider: 'Napas', amount: 500000, status: 'Thành công', time: '20/04/2026 10:00' },
        { id: 'imp-2', txnId: 'BK_ERR_1', service: 'Chi hộ', merchant: 'undefined', orderId: 'ORD-ERR', method: 'Bank', provider: 'Bank', amount: 0, status: 'Lỗi', time: '20/04/2026 10:05', isError: true, errorMsg: 'Thiếu mã Merchant' },
        { id: 'imp-3', txnId: 'BK_DUP_1', service: 'Thu hộ', merchant: 'vnpay_qr', orderId: 'ORD-DUP', method: 'QR', provider: 'VNPAY', amount: 1000000, status: 'Thành công', time: '20/04/2026 10:10', isDuplicate: true },
        { id: 'imp-4', txnId: 'BK_654321', service: 'Ví điện tử', merchant: 'cgv_cinemas', orderId: 'ORD-456', method: 'Momo', provider: 'Momo', amount: 250000, status: 'Thành công', time: '20/04/2026 10:15' },
      ];
      
      const newForms: Record<string, DisputeFormState> = {};
      mockImports.forEach(tx => {
        if (!tx.isError) {
          newForms[tx.id] = {
            orderStatus: tx.status,
            provider: tx.provider,
            method: DISPUTE_METHODS.includes(tx.method) ? tx.method : '',
            disputeType: '',
            orderValue: tx.amount,
            disputeValue: tx.amount,
            receptionMethod: 'Qua Portal',
            isRefunded: false,
            sendEmail: true,
            note: '',
            time: new Date().toLocaleString(),
            status: 'Đã nhập'
          };
        }
      });
      
      setDisputeForms(prev => ({...prev, ...newForms}));
      setTxList(prev => [...mockImports, ...prev]);
      setSelectedIds(prev => [...prev, ...mockImports.filter(tx => !tx.isError).map(tx => tx.id)]);
      setImportSummary({ total: 4, valid: 2, error: 1, duplicate: 1 });
      setIsImporting(false);
      setStep('collect');
      setCollectMode('import');
    }, 1500);
  };

  const handleOpenForm = () => {
    setIsFormActive(true);
    const element = document.getElementById('dispute-form-manual');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveDispute = (id: string) => {
    setSaveStatus(prev => ({ ...prev, [id]: 'success' }));
    setTimeout(() => {
      setSaveStatus(prev => ({ ...prev, [id]: 'idle' }));
    }, 2000);
  };

  const [historyFilter, setHistoryFilter] = useState('');
  const [selectedHistoryRecord, setSelectedHistoryRecord] = useState<DisputeLookupRecord | null>(null);

  const handleFinalRequest = () => {
    const validIds = Object.keys(disputeForms).filter(id => disputeForms[id].status === 'Đã nhập' && selectedIds.includes(id));
    if (validIds.length === 0) {
      alert("Vui lòng nhập và lưu ít nhất một giao dịch hợp lệ trước khi gửi yêu cầu.");
      return;
    }

    const newRecords: DisputeLookupRecord[] = txList
      .filter(tx => validIds.includes(tx.id))
      .map((tx, idx) => {
        const form = disputeForms[tx.id];
        const mrcSettings = merchantSettings[tx.merchant] || {
          sendEmail: true,
          emailSubject: 'Thông báo về yêu cầu tra soát giao dịch',
          emailBody: `Kính gửi Quý đối tác ${tx.merchant},\n\nChúng tôi xin thông báo về yêu cầu tra soát mới cho giao dịch của Quý đối tác.\n\nTrân trọng.`,
          erpEmail: ''
        };
        
        return {
          id: Math.random().toString(36).substr(2, 9),
          stt: history.length + idx + 1,
          idTraSoat: `TSM${Math.floor(Math.random() * 1000000)}`,
          idGiaoDich: tx.txnId,
          idDonHang: tx.orderId,
          donHangMrc: tx.orderId,
          trangThaiGD: tx.status === 'Thành công' ? OrderStatus.SUCCESS : OrderStatus.PROCESSING,
          thoiGianGD: tx.time,
          maMerchant: tx.merchant,
          phuongThuc: form.method,
          dichVuGoc: tx.service,
          loaiYeuCau: "Tra soát thủ công",
          phanLoai: form.disputeType,
          giaTriDonHang: form.orderValue,
          thoiGianNhan: form.time,
          thoiGianTao: new Date().toLocaleString(),
          thoiGianPhanHoi: form.isRefunded ? new Date().toLocaleString() : "-",
          thoiGianHoanThanh: form.isRefunded ? new Date().toLocaleString() : "-",
          trangThai: form.isRefunded ? "Hoàn thành" : "Đã gửi yêu cầu",
          ketQua: form.isRefunded ? "Đã hoàn tiền (Admin (Phản hồi TS) xử lý nội bộ)" : "Đang xử lý",
          isRefunded: form.isRefunded,
          sendEmailToMrc: form.sendEmail,
          emailSubject: mrcSettings.emailSubject,
          emailBody: mrcSettings.emailBody,
          attachments: form.attachments
        };
      });

    setHistory([...newRecords, ...history]);
    alert(`Đã tạo thành công ${newRecords.length} yêu cầu tra soát thủ công!`);
    
    setIsFormActive(false);
    // Clear selections but keep txList and history for viewing
    setSelectedIds([]);
    
    // Scroll to lookup
    setTimeout(() => {
      document.getElementById('manual-lookup-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const filteredHistory = history.filter(r => 
    r.idTraSoat.toLowerCase().includes(historyFilter.toLowerCase()) ||
    r.idGiaoDich.toLowerCase().includes(historyFilter.toLowerCase()) ||
    r.maMerchant.toLowerCase().includes(historyFilter.toLowerCase())
  );

  const selectedTxs = txList.filter(tx => selectedIds.includes(tx.id));
  const distinctMerchants = Array.from(new Set(selectedTxs.map(o => o.merchant))) as string[];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-600 rounded-lg text-white">
            <PlusCircle size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Tạo tra soát thủ công</h1>
            <p className="text-sm text-slate-500">Nhập hoặc import giao dịch để tạo yêu cầu tra soát</p>
          </div>
        </div>
        <button onClick={onBack} className="px-4 py-2 text-slate-500 hover:text-slate-800 font-medium flex items-center gap-2">
          <ArrowLeft size={16} /> Quay lại
        </button>
      </div>

      {step === 'init' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-10">
          <motion.button 
            whileHover={{ scale: 1.02, translateY: -5 }}
            onClick={() => { setStep('collect'); setCollectMode('manual'); }}
            className="p-8 bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center group transition-all"
          >
            <div className="p-6 bg-cyan-50 text-cyan-600 rounded-2xl mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
              <Pencil size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Nhập tay</h3>
            <p className="text-slate-500">Nhập từng giao dịch thủ công</p>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02, translateY: -5 }}
            onClick={() => handleImportExcel()}
            className="p-8 bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center group transition-all"
          >
            <div className="p-6 bg-green-50 text-green-600 rounded-2xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <FileSpreadsheet size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Import Excel</h3>
            <p className="text-slate-500">Tải file Excel để import nhiều giao dịch</p>
          </motion.button>
        </div>
      )}

      {step === 'collect' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Step 2A: Manual Input Controls */}
          {collectMode === 'manual' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-800">Nhập liệu thủ công</h2>
                <button 
                  onClick={() => setManualModalOpen(true)}
                  className="px-6 py-2.5 bg-cyan-600 text-white font-bold text-sm rounded-xl hover:bg-cyan-700 shadow-lg shadow-cyan-100 transition-all flex items-center gap-2"
                >
                  <Plus size={18} /> Thêm giao dịch
                </button>
              </div>

              {txList.length > 0 && (
                <div className="overflow-hidden border border-slate-100 rounded-xl">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                      <tr>
                        <th className="p-4 w-12 text-center">
                          <input 
                            type="checkbox" 
                            checked={selectedIds.length === txList.length && txList.length > 0}
                            onChange={() => setSelectedIds(selectedIds.length === txList.length ? [] : txList.map(r => r.id))}
                            className="rounded" 
                          />
                        </th>
                        <th className="p-4">Mã giao dịch</th>
                        <th className="p-4">Merchant</th>
                        <th className="p-4">Dịch vụ</th>
                        <th className="p-4">Giá trị</th>
                        <th className="p-4">Trạng thái</th>
                        <th className="p-4">Thời gian</th>
                        <th className="p-4 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {txList.map(tx => (
                        <tr key={tx.id} className="text-sm hover:bg-slate-50 transition-colors">
                          <td className="p-4 text-center">
                            <input 
                              type="checkbox" 
                              checked={selectedIds.includes(tx.id)}
                              onChange={() => setSelectedIds(prev => prev.includes(tx.id) ? prev.filter(i => i !== tx.id) : [...prev, tx.id])}
                              className="rounded" 
                            />
                          </td>
                          <td className="p-4 font-medium text-slate-700">{tx.txnId}</td>
                          <td className="p-4 font-medium">{tx.merchant}</td>
                          <td className="p-4 text-slate-500">{tx.service}</td>
                          <td className="p-4 font-bold">{tx.amount.toLocaleString()} VND</td>
                          <td className="p-4">
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">
                              {tx.status}
                            </span>
                          </td>
                          <td className="p-4 text-slate-500">{tx.time}</td>
                          <td className="p-4 text-center">
                            <button onClick={() => handleDelete(tx.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Step 2B: Import Excel UI */}
          {collectMode === 'import' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="max-w-xl mx-auto text-center space-y-6">
                  <div className="p-12 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400 group-hover:text-cyan-600 transition-colors">
                      <Upload size={32} />
                    </div>
                    <p className="text-slate-600 font-medium">Kéo thả file vào đây hoặc <span className="text-cyan-600 font-bold">Chọn file</span></p>
                    <p className="text-xs text-slate-400 mt-2 italic">Chấp nhận file .xlsx, .csv (Tối đa 5MB)</p>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button className="text-sm font-bold text-cyan-600 hover:underline flex items-center gap-1">
                      <Download size={14} /> Tải file mẫu
                    </button>
                  </div>
                </div>

                {importSummary && (
                  <div className="mt-10 grid grid-cols-4 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tổng số dòng</p>
                      <p className="text-2xl font-bold text-slate-800">{importSummary.total}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                      <p className="text-[10px] font-bold text-green-600 uppercase mb-1">Hợp lệ</p>
                      <p className="text-2xl font-bold text-green-700">{importSummary.valid}</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                      <p className="text-[10px] font-bold text-red-600 uppercase mb-1">Lỗi</p>
                      <p className="text-2xl font-bold text-red-700">{importSummary.error}</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                      <p className="text-[10px] font-bold text-amber-600 uppercase mb-1">Trùng</p>
                      <p className="text-2xl font-bold text-amber-700">{importSummary.duplicate}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Table Preview */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Xem trước dữ liệu import</h3>
                <div className="overflow-hidden border border-slate-100 rounded-xl">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
                      <tr>
                        <th className="p-4 w-12">
                          <input 
                            type="checkbox" 
                            checked={selectedIds.length === txList.length && txList.length > 0}
                            onChange={() => setSelectedIds(selectedIds.length === txList.length ? [] : txList.map(r => r.id))}
                            className="rounded" 
                          />
                        </th>
                        <th className="p-4">Mã giao dịch</th>
                        <th className="p-4">Merchant</th>
                        <th className="p-4">Giá trị</th>
                        <th className="p-4">Trạng thái</th>
                        <th className="p-4">Ghi chú / Lỗi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm">
                      {txList.map(tx => (
                        <tr 
                          key={tx.id} 
                          className={`group transition-colors ${
                            tx.isError ? 'bg-red-50/50' : 
                            tx.isDuplicate ? 'bg-amber-50/50' : 
                            'hover:bg-slate-50'
                          }`}
                        >
                          <td className="p-4">
                            {!tx.isError && (
                              <input 
                                type="checkbox" 
                                checked={selectedIds.includes(tx.id)}
                                onChange={() => setSelectedIds(prev => prev.includes(tx.id) ? prev.filter(i => i !== tx.id) : [...prev, tx.id])}
                                className="rounded" 
                              />
                            )}
                          </td>
                          <td className="p-4 font-medium">{tx.txnId}</td>
                          <td className="p-4">{tx.merchant}</td>
                          <td className="p-4 font-bold">{tx.amount.toLocaleString()} VND</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${
                              tx.isError ? 'bg-red-200 text-red-800' : 
                              tx.isDuplicate ? 'bg-amber-200 text-amber-800' : 
                              'bg-green-100 text-green-700'
                            }`}>
                              {tx.isError ? 'Lỗi' : tx.isDuplicate ? 'Trùng' : 'Hợp lệ'}
                            </span>
                          </td>
                          <td className="p-4">
                            {tx.isError && <span className="text-xs text-red-600 italic font-medium">{tx.errorMsg}</span>}
                            {tx.isDuplicate && <span className="text-xs text-amber-600 italic font-medium">Giao dịch đã tồn tại</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* New Unified "Thông tin mã giao dịch" (Step 2 style) */}
          {txList.length > 0 && (
            <div className="space-y-8 animate-in fade-in duration-700">
              <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                    <h2 className="font-bold text-slate-800 uppercase tracking-tight">Thông tin giao dịch</h2>
                  </div>
                  <div className="flex gap-4 text-xs font-bold uppercase tracking-wider">
                    <span className="text-slate-400">Đã nhập: <span className="text-cyan-600">{txList.length}</span></span>
                    <span className="text-slate-400">Đã chọn: <span className="text-cyan-600">{selectedIds.length}</span></span>
                  </div>
                </div>
                <div className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                          <th className="p-4 w-12">
                            <input 
                              type="checkbox" 
                              checked={selectedIds.length === txList.length && txList.length > 0}
                              onChange={() => setSelectedIds(selectedIds.length === txList.length ? [] : txList.map(r => r.id))}
                              className="rounded text-cyan-600"
                            />
                          </th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">STT</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Mã merchant</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Mã giao dịch</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">ID đơn hàng</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Trạng thái</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Giá trị</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Dịch vụ</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Thời gian GD</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {txList.filter(tx => !tx.isError).map((tx, idx) => (
                          <tr key={`info-${tx.id}`} className={`hover:bg-slate-50 transition-colors ${selectedIds.includes(tx.id) ? 'bg-cyan-50/30' : ''}`}>
                            <td className="p-4">
                              <input 
                                type="checkbox" 
                                checked={selectedIds.includes(tx.id)}
                                onChange={() => setSelectedIds(prev => prev.includes(tx.id) ? prev.filter(i => i !== tx.id) : [...prev, tx.id])}
                                className="rounded text-cyan-600"
                              />
                            </td>
                            <td className="p-4 text-sm text-slate-500">{idx + 1}</td>
                            <td className="p-4 text-sm font-bold text-slate-700">{tx.merchant}</td>
                            <td className="p-4 text-sm font-medium text-cyan-600">{tx.txnId}</td>
                            <td className="p-4 text-sm text-slate-600">{tx.orderId}</td>
                            <td className="p-4 text-sm">
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">{tx.status}</span>
                            </td>
                            <td className="p-4 text-sm font-bold">{tx.amount.toLocaleString()} VND</td>
                            <td className="p-4 text-sm text-slate-600">{tx.service}</td>
                            <td className="p-4 text-sm text-slate-500">{tx.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-6 border-t border-slate-100 flex justify-end">
                    <button 
                      onClick={handleOpenForm}
                      disabled={selectedIds.length === 0}
                      className="px-8 py-3 bg-cyan-600 text-white font-bold text-sm rounded-xl hover:bg-cyan-700 shadow-lg shadow-cyan-100 transition-all disabled:opacity-50 disabled:shadow-none flex items-center gap-2"
                    >
                      Tiếp tục xử lý <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </section>

              {/* Step 3: YÊU CẦU TRA SOÁT (Master-Detail Workspace) */}
              <section id="dispute-form-manual" className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-500 ${!isFormActive ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
                <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                    <h2 className="font-bold text-slate-800 uppercase tracking-tight">Yêu cầu tra soát</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Cấu hình cho:</span>
                    <span className="text-xs font-bold text-cyan-600">
                      {Object.values(disputeForms).filter((f: DisputeFormState) => f.status === 'Đã nhập').length} / {selectedIds.length} giao dịch
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col lg:flex-row min-h-[600px]">
                  {/* LEFT COLUMN: MASTER LIST */}
                  <div className="w-full lg:w-1/3 border-r border-slate-100 bg-slate-50/30 overflow-y-auto max-h-[800px]">
                    <div className="p-4 space-y-4">
                      {distinctMerchants.map((mrcId) => {
                        const mrcTxs = selectedTxs.filter(o => o.merchant === mrcId);
                        const isExpanded = expandedMerchants.includes(mrcId);
                        
                        return (
                          <div key={`mrc-${mrcId}`} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div 
                              onClick={() => setExpandedMerchants(prev => isExpanded ? prev.filter(id => id !== mrcId) : [...prev, mrcId])}
                              className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400">
                                  <Building2 size={18} />
                                </div>
                                <div>
                                  <h3 className="text-sm font-bold text-slate-800">{mrcId}</h3>
                                  <div className="flex flex-col">
                                    <p className="text-[10px] text-slate-500 font-medium">{mrcTxs.length} giao dịch</p>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingEmailMerchantId(mrcId);
                                        setActiveTransactionId(null);
                                      }}
                                      className="text-[10px] text-cyan-600 font-bold hover:underline flex items-center gap-1 mt-0.5"
                                    >
                                      <Mail size={10} /> Xem nội dung email
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <ChevronDown size={16} className={`text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                            
                            {isExpanded && (
                              <div className="p-2 space-y-1">
                                {mrcTxs.map(tx => {
                                  const form = disputeForms[tx.id] || {};
                                  const isActive = activeTransactionId === tx.id;
                                  
                                  return (
                                    <div 
                                      key={`list-tx-${tx.id}`}
                                      onClick={() => {
                                        setActiveTransactionId(tx.id);
                                        setEditingEmailMerchantId(null);
                                      }}
                                      className={`p-3 rounded-lg transition-all cursor-pointer flex items-center justify-between group ${isActive ? 'bg-cyan-50 border-cyan-200 border' : 'hover:bg-slate-50 border-transparent border'}`}
                                    >
                                      <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-700">{tx.txnId}</span>
                                        <span className="text-[10px] text-slate-400">{tx.amount.toLocaleString()} VND</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${form.status === 'Đã nhập' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}>
                                          {form.status}
                                        </span>
                                        <ArrowRight size={14} className={`text-cyan-500 transition-transform ${isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* RIGHT COLUMN: DETAIL FORM */}
                  <div className="flex-1 bg-white p-8 overflow-y-auto max-h-[800px]">
                    {editingEmailMerchantId ? (
                      <div className="max-w-2xl mx-auto space-y-8">
                        {/* Email Content Component Reused via Logic */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                          <div>
                            <h3 className="text-xl font-bold text-slate-800">Nội dung email – {editingEmailMerchantId}</h3>
                            <p className="text-sm text-slate-500 mt-1">Xem và chỉnh sửa nội dung email gửi cho merchant</p>
                          </div>
                          <button onClick={() => setEditingEmailMerchantId(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 cursor-pointer">
                            <X size={20} />
                          </button>
                        </div>
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                            <input 
                              type="checkbox" 
                              id="sendManualEmailMrc"
                              checked={merchantSettings[editingEmailMerchantId]?.sendEmail !== false}
                              onChange={(e) => setMerchantSettings({...merchantSettings, [editingEmailMerchantId]: {...merchantSettings[editingEmailMerchantId], sendEmail: e.target.checked}})}
                              className="w-5 h-5 rounded text-cyan-600 focus:ring-cyan-500"
                            />
                            <label htmlFor="sendManualEmailMrc" className="text-sm font-bold text-cyan-900 cursor-pointer">Gửi email tổng hợp cho merchant này</label>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Tiêu đề email</label>
                            <input 
                              type="text" 
                              defaultValue={`[Baokim] Yêu cầu phối hợp tra soát khiếu nại - Merchant: ${editingEmailMerchantId}`}
                              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Nội dung email</label>
                            <textarea 
                              rows={10}
                              defaultValue={`Kính gửi Merchant ${editingEmailMerchantId},\n\nBaokim xin thông báo có các giao dịch sau cần phối hợp tra soát...\n\nTrân trọng.`}
                              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none resize-none font-mono"
                            />
                          </div>
                        </div>
                        <div className="pt-4 flex justify-end gap-3">
                          <button onClick={() => setEditingEmailMerchantId(null)} className="px-6 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-xl">Đóng</button>
                          <button onClick={() => setEditingEmailMerchantId(null)} className="px-8 py-2.5 bg-cyan-600 text-white font-bold text-sm rounded-xl hover:bg-cyan-700 shadow-lg shadow-cyan-100">Lưu cấu hình email</button>
                        </div>
                      </div>
                    ) : activeTransactionId ? (
                      <div className="max-w-2xl mx-auto space-y-8">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                          <div>
                            <h3 className="text-xl font-bold text-slate-800">Yêu cầu tra soát – {txList.find(tx => tx.id === activeTransactionId)?.txnId}</h3>
                            <p className="text-sm text-slate-500 mt-1">Vui lòng hoàn tất thông tin tra soát cho giao dịch này</p>
                          </div>
                          {saveStatus[activeTransactionId] === 'success' && (
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                              <CheckCircle2 size={16} />
                              <span className="text-xs font-bold">Đã lưu</span>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Merchant</p>
                            <p className="text-xs font-bold text-slate-700">{txList.find(tx => tx.id === activeTransactionId)?.merchant}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Mã giao dịch</p>
                            <p className="text-xs font-bold text-slate-700">{txList.find(tx => tx.id === activeTransactionId)?.txnId}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Dịch vụ gốc</p>
                            <p className="text-xs font-bold text-slate-700">{txList.find(tx => tx.id === activeTransactionId)?.service}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Trạng thái đơn hàng</label>
                            <input 
                              type="text" 
                              value={disputeForms[activeTransactionId]?.orderStatus}
                              onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], orderStatus: e.target.value}})}
                              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Nhà cung cấp</label>
                            <select 
                              value={disputeForms[activeTransactionId]?.provider}
                              onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], provider: e.target.value}})}
                              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none bg-white"
                            >
                              <option value="Napas">Napas</option>
                              <option value="VPBank">VPBank</option>
                              <option value="Momo">Momo</option>
                              <option value="Bank khác">Bank khác</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Phương thức <span className="text-red-500">*</span></label>
                            <select 
                              value={disputeForms[activeTransactionId]?.method}
                              onChange={(e) => {
                                const newMethod = e.target.value;
                                setDisputeForms({
                                  ...disputeForms, 
                                  [activeTransactionId]: {
                                    ...disputeForms[activeTransactionId], 
                                    method: newMethod,
                                    disputeType: '' // Reset logic
                                  }
                                });
                              }}
                              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none bg-white font-medium"
                            >
                              <option value="">-- Chọn phương thức --</option>
                              {DISPUTE_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Phân loại tra soát <span className="text-red-500">*</span></label>
                            <SearchableSelect 
                              value={disputeForms[activeTransactionId]?.disputeType}
                              onChange={(val) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], disputeType: val}})}
                              options={getDisputeCategories(disputeForms[activeTransactionId]?.method)}
                              placeholder={disputeForms[activeTransactionId]?.method ? "Chọn phân loại..." : "Chọn phương thức trước"}
                              disabled={!disputeForms[activeTransactionId]?.method}
                              error={disputeForms[activeTransactionId]?.method && !getDisputeCategories(disputeForms[activeTransactionId]?.method).includes(disputeForms[activeTransactionId]?.disputeType) && disputeForms[activeTransactionId]?.disputeType ? "Phân loại không phù hợp với phương thức đã chọn" : ""}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Giá trị đơn hàng</label>
                            <div className="relative">
                              <input 
                                type="number" 
                                value={disputeForms[activeTransactionId]?.orderValue}
                                onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], orderValue: Number(e.target.value)}})}
                                className="w-full pl-4 pr-12 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                              />
                              <span className="absolute right-4 top-2.5 text-xs font-bold text-slate-400">VND</span>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Giá trị tra soát</label>
                            <div className="relative">
                              <input 
                                type="number" 
                                value={disputeForms[activeTransactionId]?.disputeValue}
                                onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], disputeValue: Number(e.target.value)}})}
                                className="w-full pl-4 pr-12 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                              />
                              <span className="absolute right-4 top-2.5 text-xs font-bold text-slate-400">VND</span>
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase">Hình thức tiếp nhận</label>
                            <select 
                              value={disputeForms[activeTransactionId]?.receptionMethod}
                              onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], receptionMethod: e.target.value}})}
                              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none bg-white"
                            >
                              <option value="Qua Portal">Qua Portal</option>
                              <option value="Qua Email">Qua Email</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-2 pt-6">
                            <div className="flex items-center gap-8">
                              <div className="flex items-center gap-3 group relative">
                                <input 
                                  type="checkbox" 
                                  id="manualIsRefunded"
                                  checked={disputeForms[activeTransactionId]?.isRefunded}
                                  onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], isRefunded: e.target.checked}})}
                                  className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
                                />
                                <label htmlFor="manualIsRefunded" className="text-sm font-bold text-slate-700 cursor-pointer">Đã hoàn tiền</label>
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                                  <div className="bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                                    Admin (Phản hồi TS) tự xác nhận trạng thái hoàn tiền của giao dịch
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 group relative">
                                <input 
                                  type="checkbox" 
                                  id="manualSendEmail"
                                  checked={disputeForms[activeTransactionId]?.sendEmail}
                                  onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], sendEmail: e.target.checked}})}
                                  className="w-5 h-5 rounded text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                                />
                                <label htmlFor="manualSendEmail" className="text-sm font-bold text-slate-700 cursor-pointer">Gửi email</label>
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10">
                                  <div className="bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-lg whitespace-nowrap">
                                    Giao dịch được tick sẽ được đưa vào email gửi merchant
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Warning Message */}
                            {disputeForms[activeTransactionId]?.isRefunded && disputeForms[activeTransactionId]?.sendEmail && (
                              <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-1.5 text-[11px] text-amber-600 font-medium"
                              >
                                <AlertTriangle size={14} />
                                <span>⚠ Giao dịch đã hoàn tiền nhưng vẫn được gửi email</span>
                              </motion.div>
                            )}
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-500 uppercase">Ghi chú / mô tả</label>
                          <textarea 
                            rows={4}
                            value={disputeForms[activeTransactionId]?.note}
                            onChange={(e) => setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], note: e.target.value}})}
                            placeholder="Nhập ghi chú chi tiết cho yêu cầu tra soát này..."
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-500 uppercase">File đính kèm</label>
                          <div className="flex flex-wrap gap-3">
                            {disputeForms[activeTransactionId]?.attachments?.map((file, idx) => (
                              <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg group animate-in fade-in scale-in-95">
                                <Paperclip size={14} className="text-slate-400" />
                                <span className="text-xs font-medium text-slate-600 truncate max-w-[120px]">{file.name}</span>
                                <button 
                                  onClick={() => {
                                    const newFiles = [...(disputeForms[activeTransactionId]?.attachments || [])];
                                    newFiles.splice(idx, 1);
                                    setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], attachments: newFiles}});
                                  }}
                                  className="hover:text-red-500 text-slate-300 transition-colors"
                                >
                                  <X size={14} />
                                </button>
                              </div>
                            ))}
                            <label className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-slate-200 rounded-xl hover:border-cyan-500 hover:bg-cyan-50 transition-all cursor-pointer group">
                              <Plus size={16} className="text-slate-400 group-hover:text-cyan-600" />
                              <span className="text-xs font-bold text-slate-500 group-hover:text-cyan-600">Thêm file</span>
                              <input 
                                type="file" 
                                multiple
                                className="hidden" 
                                onChange={(e) => {
                                  const files = Array.from(e.target.files || []);
                                  const currentFiles = disputeForms[activeTransactionId]?.attachments || [];
                                  setDisputeForms({...disputeForms, [activeTransactionId]: {...disputeForms[activeTransactionId], attachments: [...currentFiles, ...files]}});
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                          <button 
                            onClick={() => handleSaveDispute(activeTransactionId)}
                            className="px-10 py-3 bg-cyan-600 text-white font-bold text-sm rounded-xl hover:bg-cyan-700 flex items-center gap-2"
                          >
                            <Save size={18} /> Lưu thông tin GD
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                        <div className="p-6 bg-slate-50 rounded-full border border-slate-100">
                          <MousePointerClick size={48} className="opacity-20" />
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-slate-500">Chưa chọn giao dịch</p>
                          <p className="text-xs">Vui lòng chọn một giao dịch từ danh sách bên trái để nhập thông tin tra soát</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {distinctMerchants.slice(0, 3).map((m, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-cyan-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-cyan-600 uppercase">
                          {m.slice(0, 2)}
                        </div>
                      ))}
                      {distinctMerchants.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-50">
                          +{distinctMerchants.length - 3}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700">Tổng cộng {distinctMerchants.length} Merchant</p>
                      <p className="text-[10px] text-slate-500">{selectedIds.length} giao dịch đã chọn lọc</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={onBack} className="px-6 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-200 rounded-xl">Hủy bỏ</button>
                    <button 
                      onClick={handleFinalRequest}
                      className="px-10 py-3 bg-cyan-600 text-white font-bold text-sm rounded-xl hover:bg-cyan-700 shadow-lg shadow-cyan-100 flex items-center gap-2"
                    >
                      <CheckCircle2 size={18} /> Gửi {selectedIds.length} yêu cầu tra soát
                    </button>
                  </div>
                </div>
              </section>

              {/* STEP 4: TRA CỨU (Post-submission) */}
              <section id="manual-lookup-section" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-sm">4</span>
                      <h2 className="font-bold text-slate-800 uppercase tracking-tight">Tra cứu</h2>
                    </div>
                    <div className="relative max-w-md w-full ml-8">
                      <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Tìm kiếm theo mã tra soát, mã giao dịch, merchant..."
                        value={historyFilter}
                        onChange={(e) => setHistoryFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 font-bold text-xs uppercase rounded-lg hover:bg-slate-200 transition-all">
                    <FileDown size={14} /> Xuất báo cáo
                  </button>
                </div>
                
                <div className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[2000px]">
                      <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">STT</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">ID tra soát</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">ID giao dịch</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">ID đơn hàng</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Đơn hàng MRC</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Trạng thái GD</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Thời gian GD</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Mã merchant</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Phương thức</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Loại yêu cầu</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Phân loại</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Giá trị đơn hàng</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Thời gian nhận</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Thời gian tạo</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">TG Merchant phản hồi</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">TG hoàn thành</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Trạng thái</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Kết quả xử lý</th>
                          <th className="p-4 text-[11px] font-bold text-slate-400 uppercase">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredHistory.length === 0 ? (
                          <tr>
                            <td colSpan={19} className="p-12 text-center text-slate-400 text-sm italic">Không tìm thấy bản ghi tra soát nào. Hãy thực hiện gửi hồ sơ ở Bước 3.</td>
                          </tr>
                        ) : (
                          filteredHistory.map((record) => (
                            <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                              <td className="p-4 text-sm text-slate-500">{record.stt}</td>
                              <td className="p-4 text-sm font-bold text-cyan-600">{record.idTraSoat}</td>
                              <td className="p-4 text-sm text-slate-600 truncate max-w-[150px]">{record.idGiaoDich}</td>
                              <td className="p-4 text-sm text-slate-600 truncate max-w-[150px]">{record.idDonHang}</td>
                              <td className="p-4 text-sm text-slate-600">{record.donHangMrc}</td>
                              <td className="p-4"><Badge status={record.trangThaiGD} type="order" /></td>
                              <td className="p-4 text-sm text-slate-500">{record.thoiGianGD}</td>
                              <td className="p-4 text-sm font-medium text-slate-700">{record.maMerchant}</td>
                              <td className="p-4 text-sm text-slate-600">{record.phuongThuc}</td>
                              <td className="p-4 text-sm text-slate-600">{record.loaiYeuCau}</td>
                              <td className="p-4 text-sm text-slate-600">{record.phanLoai}</td>
                              <td className="p-4 text-sm font-bold">{record.giaTriDonHang.toLocaleString()}</td>
                              <td className="p-4 text-sm text-slate-500">{record.thoiGianNhan}</td>
                              <td className="p-4 text-sm text-slate-500">{record.thoiGianTao}</td>
                              <td className="p-4 text-sm text-slate-500">{record.thoiGianPhanHoi}</td>
                              <td className="p-4 text-sm text-slate-500">{record.thoiGianHoanThanh}</td>
                              <td className="p-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  record.trangThai === 'Đã gửi yêu cầu' ? 'bg-blue-100 text-blue-600' :
                                  record.trangThai === 'Chờ phản hồi' ? 'bg-yellow-100 text-yellow-600' :
                                  record.trangThai === 'Đã phản hồi' ? 'bg-cyan-100 text-cyan-600' :
                                  record.trangThai === 'Quá hạn' ? 'bg-red-100 text-red-600' :
                                  record.trangThai === 'Hoàn thành' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {record.trangThai}
                                </span>
                              </td>
                              <td className="p-4 text-sm text-slate-600">{record.ketQua}</td>
                              <td className="p-4">
                                <button 
                                  onClick={() => setSelectedHistoryRecord(record)}
                                  className="text-cyan-600 hover:text-cyan-700 font-bold text-xs uppercase tracking-wider"
                                >
                                  Xem chi tiết
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* History Detail Modal */}
              <AnimatePresence>
                {selectedHistoryRecord && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
                    >
                      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                          <FileSearch className="w-5 h-5 text-cyan-600" />
                          Chi tiết tra soát: {selectedHistoryRecord.idTraSoat}
                        </h3>
                        <button onClick={() => setSelectedHistoryRecord(null)} className="p-2 text-slate-400 hover:text-slate-600">
                          <X size={20} />
                        </button>
                      </div>
                      <div className="p-8 grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Mã giao dịch</p>
                            <p className="text-sm font-bold text-slate-700">{selectedHistoryRecord.idGiaoDich}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Mã đơn hàng</p>
                            <p className="text-sm font-bold text-slate-700">{selectedHistoryRecord.idDonHang}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Merchant</p>
                            <p className="text-sm font-bold text-slate-700">{selectedHistoryRecord.maMerchant}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Dịch vụ</p>
                            <p className="text-sm font-bold text-slate-700">{selectedHistoryRecord.dichVuGoc}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Trạng thái</p>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded uppercase">
                              {selectedHistoryRecord.trangThai}
                            </span>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Thời gian tạo</p>
                            <p className="text-sm text-slate-600">{selectedHistoryRecord.thoiGianTao}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Thời gian nhận</p>
                            <p className="text-sm text-slate-600">{selectedHistoryRecord.thoiGianNhan}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Kết quả xử lý</p>
                            <p className="text-sm text-slate-600">{selectedHistoryRecord.ketQua}</p>
                          </div>
                        </div>

                        {selectedHistoryRecord.attachments && selectedHistoryRecord.attachments.length > 0 && (
                          <div className="col-span-2 pt-4 border-t border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">File đính kèm ({selectedHistoryRecord.attachments.length})</p>
                            <div className="flex flex-wrap gap-3">
                              {selectedHistoryRecord.attachments.map((file, idx) => (
                                <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                                  <Paperclip size={14} className="text-cyan-600" />
                                  <span className="text-xs font-medium text-slate-600 truncate max-w-[200px]">{file.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                        <button 
                          onClick={() => setSelectedHistoryRecord(null)}
                          className="px-6 py-2 bg-slate-200 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-300 transition-colors"
                        >
                          Đóng
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* Manual Input Modal */}
      <AnimatePresence>
        {manualModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-cyan-600" />
                  Nhập giao dịch thủ công
                </h3>
                <button onClick={() => setManualModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 grid grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mã giao dịch</label>
                  <input 
                    type="text"
                    value={formData.txnId}
                    onChange={e => setFormData({...formData, txnId: e.target.value})}
                    placeholder="VD: BK_123456"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mã merchant</label>
                  <input 
                    type="text"
                    value={formData.merchant}
                    onChange={e => setFormData({...formData, merchant: e.target.value})}
                    placeholder="VD: apple_store_vn"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dịch vụ</label>
                  <select 
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                  >
                    <option>Thu hộ</option>
                    <option>Chi hộ</option>
                    <option>Cổng thanh toán</option>
                    <option>Ví điện tử</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ID đơn hàng</label>
                  <input 
                    type="text"
                    value={formData.orderId}
                    onChange={e => setFormData({...formData, orderId: e.target.value})}
                    placeholder="VD: ORD-1002"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phương thức</label>
                  <select 
                    value={formData.method}
                    onChange={e => setFormData({...formData, method: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none font-medium"
                  >
                    <option value="">-- Chọn phương thức --</option>
                    {DISPUTE_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nhà cung cấp</label>
                  <input 
                    type="text"
                    value={formData.provider}
                    onChange={e => setFormData({...formData, provider: e.target.value})}
                    placeholder="VD: Napas"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Giá trị giao dịch</label>
                  <input 
                    type="number"
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: Number(e.target.value)})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Trạng thái</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                  >
                    <option>Thành công</option>
                    <option>Đang xử lý</option>
                    <option>Lỗi</option>
                  </select>
                </div>
                <div className="col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Thời gian giao dịch</label>
                  <input 
                    type="datetime-local"
                    value={formData.time}
                    onChange={e => setFormData({...formData, time: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
                  />
                </div>
              </div>

              <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  onClick={() => setManualModalOpen(false)}
                  className="px-6 py-2.5 text-slate-600 font-bold text-sm hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Hủy
                </button>
                <button 
                  onClick={handleAddManual}
                  className="px-10 py-3 bg-cyan-600 text-white font-bold text-sm rounded-xl hover:bg-cyan-700 shadow-lg shadow-cyan-100 transition-all flex items-center gap-2"
                >
                  <Save size={18} /> Lưu giao dịch tra soát
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Import Loading State */}
      <AnimatePresence>
        {isImporting && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white p-10 rounded-3xl shadow-2xl text-center space-y-4"
            >
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 border-4 border-cyan-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-cyan-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <h3 className="text-lg font-bold text-slate-800">Đang xử lý file...</h3>
              <p className="text-sm text-slate-500 italic">Vui lòng đợi giây lát</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

type ManualTx = {
  id: string;
  txnId: string;
  service: string;
  merchant: string;
  orderId: string;
  method: string;
  provider: string;
  amount: number;
  status: string;
  time: string;
  isError?: boolean;
  isDuplicate?: boolean;
  errorMsg?: string;
};

function PortalView({ orders, tickets, onRespond }: { orders: Order[], tickets: Ticket[], onRespond: (id: string) => void }) {
  return (
    <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Quản lý đơn hàng</h2>
              </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 grid grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Mã đơn hàng MRC</label>
          <div className="relative">
            <input type="text" className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Mã đơn hàng MRC" />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Trạng thái đơn hàng</label>
          <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none appearance-none bg-white">
            <option>Tất cả</option>
            <option>Thành công</option>
            <option>Đang xử lý</option>
            <option>Đã hoàn</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Tên khách hàng</label>
          <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Tên khách hàng" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Số điện thoại khách hàng</label>
          <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Số điện thoại" />
        </div>
        <div className="col-span-4 flex items-center gap-3 pt-4 border-t border-slate-100 mt-2">
          <div className="flex-1 flex gap-3">
            <button className="px-6 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-bold hover:bg-green-100 transition-colors">Tìm kiếm</button>
            <button className="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-200 transition-colors">Bỏ lọc</button>
            <button className="px-6 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-green-100 transition-colors">
              <FileDown className="w-4 h-4" /> Xuất excel
            </button>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors">Tạo khiếu nại</button>
            <button className="px-6 py-2 bg-cyan-50 text-cyan-700 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-cyan-100 transition-colors">
              <Filter className="w-4 h-4" /> Bộ lọc khác
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm font-medium">
        <span className="text-slate-500">Tổng số đơn: <span className="text-green-600">{orders.length}</span></span>
        <span className="text-slate-500">Tổng giá trị biến động: <span className="text-green-600">5.976.800</span></span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1500px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 w-10"><input type="checkbox" /></th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Thao tác</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">STT</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Mã BK</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Mã MRC</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Thời gian tạo</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Trạng thái</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Giá trị đơn</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">MRC Thực nhận</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Phương thức</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Khách hàng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order, idx) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors group">
                <td className="p-4"><input type="checkbox" /></td>
                <td className="p-4">
                  <button className="p-2 text-slate-400 hover:text-cyan-600 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
                <td className="p-4 text-sm">{idx + 1}</td>
                <td className="p-4 text-sm font-medium text-cyan-600 hover:underline cursor-pointer">{order.bkOrderId}</td>
                <td className="p-4 text-sm font-medium text-slate-700">{order.mrcOrderId}</td>
                <td className="p-4 text-sm text-slate-500">{order.createdTime}</td>
                <td className="p-4"><Badge status={order.status} type="order" /></td>
                <td className="p-4 text-sm font-bold">{order.value.toLocaleString()}</td>
                <td className="p-4 text-sm font-bold text-green-600">{order.netReceived.toLocaleString()}</td>
                <td className="p-4 text-sm">{order.method}</td>
                <td className="p-4 text-sm">
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-xs text-slate-400">{order.customer.phone}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Active Tickets for Merchant */}
      <div className="mt-12 space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          Yêu cầu tra soát cần phản hồi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.filter(t => t.status === TicketStatus.CREATED).map(ticket => (
            <div key={ticket.id} className="bg-white p-6 rounded-xl border-l-4 border-orange-500 shadow-sm flex justify-between items-center">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">Mã Ticket: {ticket.ticketId}</div>
                <div className="text-lg font-bold text-slate-800">{ticket.ticketType}</div>
                <div className="text-sm text-slate-500 mt-1">Vui lòng cung cấp chứng từ đối soát cho giao dịch này.</div>
              </div>
              <button 
                onClick={() => onRespond(ticket.id)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                Phản hồi <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Admin List View ---
function AdminListView({ tickets, onAction, onManualCreate }: { tickets: Ticket[], onAction: (action: string, ticket?: Ticket) => void, onManualCreate: () => void }) {
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    ticketId: "",
    merchantId: "",
    bkTxnId: "",
    provider: "",
    status: "",
    source: "",
    dateFrom: "",
    dateTo: ""
  });

  const filteredTickets = tickets.filter(t => {
    if (filters.ticketId && !t.ticketId.includes(filters.ticketId)) return false;
    if (filters.merchantId && !t.merchantId.toLowerCase().includes(filters.merchantId.toLowerCase())) return false;
    if (filters.status && t.status !== filters.status) return false;
    if (filters.provider && t.provider !== filters.provider) return false;
    if (filters.source && t.source !== filters.source) return false;
    
    // Date filtering
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      const [ticketDatePart] = t.createdTime.split(" ");
      const [day, month, year] = ticketDatePart.split("/").map(Number);
      const ticketDate = new Date(year, month - 1, day);
      if (ticketDate < fromDate) return false;
    }
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      const [ticketDatePart] = t.createdTime.split(" ");
      const [day, month, year] = ticketDatePart.split("/").map(Number);
      const ticketDate = new Date(year, month - 1, day);
      if (ticketDate > toDate) return false;
    }

    return true;
  });

  const handleExportExcel = () => {
    if (selectedTickets.length === 0) return;
    
    const headers = ["Mã Ticket", "Merchant", "Số GD", "NCC", "Ngày tạo", "Hạn phản hồi", "Trạng thái"];
    const rows = filteredTickets
      .filter(t => selectedTickets.includes(t.id))
      .map(t => [
        t.ticketId,
        t.merchantId,
        t.transactionCount || 1,
        t.provider,
        t.createdTime,
        t.deadline,
        t.status
      ]);
    
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Template_NHNN_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert(`Đã xuất Excel cho ${selectedTickets.length} ticket theo template NHNN`);
  };

  const toggleSelectAll = () => {
    if (selectedTickets.length === filteredTickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(filteredTickets.map(t => t.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedTickets(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          Trang chủ / Quản lý tickets
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 grid grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Mã ticket</label>
          <input 
            type="text" 
            placeholder="Nhập mã ticket..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
            value={filters.ticketId}
            onChange={e => setFilters({...filters, ticketId: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Mã merchant</label>
          <input 
            type="text" 
            placeholder="Nhập mã merchant..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
            value={filters.merchantId}
            onChange={e => setFilters({...filters, merchantId: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Nhà cung cấp</label>
          <select 
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
            value={filters.provider}
            onChange={e => setFilters({...filters, provider: e.target.value})}
          >
            <option value="">Tất cả</option>
            <option value="Napas">Napas</option>
            <option value="Bank">Bank</option>
            <option value="Momo">Momo</option>
            <option value="VPBank">VPBank</option>
            <option value="BNPL">BNPL</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Trạng thái</label>
          <select 
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
            value={filters.status}
            onChange={e => setFilters({...filters, status: e.target.value})}
          >
            <option value="">Tất cả</option>
            <option value={TicketStatus.CREATED}>Khởi tạo</option>
            <option value={TicketStatus.WAITING_RESPONSE}>Chờ phản hồi</option>
            <option value={TicketStatus.RESPONDED}>Đã phản hồi</option>
            <option value={TicketStatus.OVERDUE}>Quá hạn</option>
            <option value={TicketStatus.CLOSED}>Đã đóng</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Nguồn tạo</label>
          <select 
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
            value={filters.source}
            onChange={e => setFilters({...filters, source: e.target.value})}
          >
            <option value="">Tất cả</option>
            <option value="Admin">Admin</option>
            <option value="Portal">Portal</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Từ ngày</label>
          <input 
            type="date" 
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none" 
            value={filters.dateFrom}
            onChange={e => setFilters({...filters, dateFrom: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Đến ngày</label>
          <input 
            type="date" 
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 outline-none" 
            value={filters.dateTo}
            onChange={e => setFilters({...filters, dateTo: e.target.value})}
          />
        </div>
        <div className="flex items-end gap-2">
          <button className="flex-1 py-2 bg-cyan-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2">
            <Search size={16} /> Lọc
          </button>
          <button 
            onClick={() => setFilters({ticketId: "", merchantId: "", bkTxnId: "", provider: "", status: "", source: "", dateFrom: "", dateTo: ""})}
            className="px-4 py-2 text-slate-500 hover:text-cyan-600 text-sm font-bold"
          >
            Bỏ lọc
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <button 
            onClick={handleExportExcel}
            className={`px-4 py-2 border rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${selectedTickets.length > 0 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'}`}
          >
            <FileDown size={16} /> Xuất Excel NHNN {selectedTickets.length > 0 && `(${selectedTickets.length})`}
          </button>
          <button 
            onClick={() => onAction('create')}
            className="px-4 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-orange-100"
          >
            <PlusCircle size={16} /> Tạo Tra Soát DV Tích Hợp
          </button>
          <button 
            onClick={onManualCreate}
            className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-cyan-700 shadow-md shadow-cyan-100 transition-all"
          >
            <PlusCircle size={16} /> Tạo Tra Soát Thủ Công
          </button>
        </div>
        <div className="text-sm text-slate-500">1 - {filteredTickets.length} / {filteredTickets.length}</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse min-w-[1500px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 w-10">
                <input 
                  type="checkbox" 
                  checked={selectedTickets.length === filteredTickets.length && filteredTickets.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded text-cyan-600"
                />
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Thao tác</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">STT</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Mã BK</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Mã Ticket</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Mã Admin (Phản hồi TS)</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Mẫu phiếu</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Mã Merchant</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Loại phiếu</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Trạng thái</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Nguồn tạo</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Người tạo</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Thời gian cập nhật</th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase">Thời gian tạo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTickets.map((ticket, idx) => (
              <tr key={ticket.id} className="hover:bg-slate-50 transition-colors group">
                <td className="p-4">
                  <input 
                    type="checkbox" 
                    checked={selectedTickets.includes(ticket.id)}
                    onChange={() => toggleSelect(ticket.id)}
                    className="rounded text-cyan-600"
                  />
                </td>
                <td className="p-4">
                  <TicketActions ticket={ticket} onAction={onAction} />
                </td>
                <td className="p-4 text-sm text-slate-500">{idx + 1}</td>
                <td className="p-4 text-sm font-medium text-slate-700">{ticket.bkId}</td>
                <td className="p-4 text-sm font-bold text-cyan-600">#{ticket.ticketId}</td>
                <td className="p-4 text-sm text-slate-600">{ticket.csId}</td>
                <td className="p-4 text-sm text-slate-600">{ticket.formType}</td>
                <td className="p-4 text-sm text-slate-600">{ticket.merchantId}</td>
                <td className="p-4 text-sm text-slate-600">{ticket.ticketType}</td>
                <td className="p-4">
                  <Badge status={ticket.status} type="ticket" deadline={ticket.deadline} />
                </td>
                <td className="p-4 text-sm text-slate-600">{ticket.source}</td>
                <td className="p-4 text-sm text-slate-600">{ticket.creator}</td>
                <td className="p-4 text-sm text-slate-500">{ticket.updatedTime}</td>
                <td className="p-4 text-sm text-slate-500">{ticket.createdTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Admin Detail View ---
function AdminDetailView({ ticket, onBack, onUpdate }: { ticket: Ticket, onBack: () => void, onUpdate: (t: Ticket) => void }) {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-cyan-600 font-medium">
          <ArrowLeft size={16} /> Quay lại danh sách
        </button>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              const now = new Date().toLocaleString();
              onUpdate({
                ...ticket,
                timeline: [...(ticket.timeline || []), { type: "Email Sent", time: now, content: "Gửi lại email cho merchant" }]
              });
              alert(`Đã gửi lại email cho merchant của ticket #${ticket.ticketId}`);
            }}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50"
          >
            Gửi lại email
          </button>
          <button 
            onClick={() => {
              const now = new Date().toLocaleString();
              onUpdate({
                ...ticket,
                timeline: [...(ticket.timeline || []), { type: "Notify Sent", time: now, content: "Đẩy lại notification cho merchant" }]
              });
              alert(`Đã đẩy lại notification cho ticket #${ticket.ticketId}`);
            }}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50"
          >
            Đẩy notify
          </button>
          <button 
            onClick={() => {
              const now = new Date().toLocaleString();
              onUpdate({
                ...ticket,
                status: TicketStatus.CLOSED,
                updatedTime: now,
                timeline: [...(ticket.timeline || []), { type: "Closed", time: now, content: "Đóng ticket tra soát" }]
              });
              alert(`Đã đóng ticket #${ticket.ticketId}`);
            }}
            className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-bold hover:bg-red-100"
          >
            Đóng ticket
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Summary & Timeline */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
              Thông tin chung
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Mã Ticket</label>
                <div className="text-lg font-bold text-cyan-600">#{ticket.ticketId}</div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Trạng thái</label>
                <div className="mt-1"><Badge status={ticket.status} type="ticket" deadline={ticket.deadline} /></div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Hạn phản hồi</label>
                <div className={`text-sm font-bold ${ticket.deadline && isOverdue(ticket.deadline) && ticket.status !== TicketStatus.CLOSED ? 'text-red-600' : 'text-slate-700'}`}>
                  {ticket.deadline}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Merchant</label>
                  <div className="text-xs font-medium">{ticket.merchantId}</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">NCC</label>
                  <div className="text-xs font-medium">{ticket.provider}</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Nguồn</label>
                  <div className="text-xs font-medium">{ticket.source}</div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Mã Admin (Phản hồi TS)</label>
                  <div className="text-xs font-medium">{ticket.csId}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
              Lịch sử xử lý
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {ticket.timeline?.map((event, i) => (
                  <div key={i} className="flex gap-3 relative">
                    {i !== ticket.timeline!.length - 1 && <div className="absolute left-1.5 top-4 bottom-0 w-0.5 bg-slate-100" />}
                    <div className={`w-3 h-3 rounded-full mt-1 shrink-0 z-10 ${
                      event.type === 'Created' ? 'bg-cyan-500' : 
                      event.type === 'Email Sent' ? 'bg-blue-500' :
                      event.type === 'Merchant Responded' ? 'bg-green-500' :
                      event.type === 'Overdue' ? 'bg-red-500' : 'bg-slate-300'
                    }`} />
                    <div>
                      <div className="text-xs font-bold text-slate-700">{event.content}</div>
                      <div className="text-[10px] text-slate-400">{event.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="flex border-b border-slate-200">
              <button 
                onClick={() => setActiveTab('info')}
                className={`px-6 py-4 text-sm font-bold transition-colors ${activeTab === 'info' ? 'text-cyan-600 border-b-2 border-cyan-600 bg-cyan-50/30' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Chi tiết yêu cầu
              </button>
              <button 
                onClick={() => setActiveTab('response')}
                className={`px-6 py-4 text-sm font-bold transition-colors ${activeTab === 'response' ? 'text-cyan-600 border-b-2 border-cyan-600 bg-cyan-50/30' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Phản hồi từ Merchant
              </button>
              <button 
                onClick={() => setActiveTab('sync')}
                className={`px-6 py-4 text-sm font-bold transition-colors ${activeTab === 'sync' ? 'text-cyan-600 border-b-2 border-cyan-600 bg-cyan-50/30' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Đồng bộ Admin (Phản hồi TS)
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'info' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Loại tra soát</h4>
                      <p className="text-sm font-medium text-slate-800">{ticket.ticketType}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Hình thức tiếp nhận</h4>
                      <p className="text-sm font-medium text-slate-800">{ticket.receptionMethod}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Giao dịch tra soát ({ticket.transactions?.length || 0})</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b">
                          <tr>
                            <th className="p-3 font-bold text-slate-500 uppercase text-[10px]">Mã BK</th>
                            <th className="p-3 font-bold text-slate-500 uppercase text-[10px]">Mã MRC</th>
                            <th className="p-3 font-bold text-slate-500 uppercase text-[10px]">Dịch vụ</th>
                            <th className="p-3 font-bold text-slate-500 uppercase text-[10px]">Số tiền</th>
                            <th className="p-3 font-bold text-slate-500 uppercase text-[10px]">Thời gian</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {ticket.transactions?.map(txn => (
                            <tr key={txn.id}>
                              <td className="p-3 font-medium text-cyan-600">{txn.bkId}</td>
                              <td className="p-3">{txn.mrcOrderId}</td>
                              <td className="p-3">{txn.service}</td>
                              <td className="p-3 font-bold">{txn.amount.toLocaleString()}</td>
                              <td className="p-3 text-slate-500 text-xs">{txn.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Nội dung yêu cầu</h4>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-700 whitespace-pre-wrap">
                      {ticket.emailPreview || "Vui lòng cung cấp chứng từ đối soát cho giao dịch này."}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'response' && (
                <div className="space-y-6">
                  {ticket.merchantResponse ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-slate-500">Thời gian phản hồi: <span className="font-bold text-slate-700">{ticket.merchantResponse.responseTime}</span></div>
                        <Badge status={TicketStatus.RESPONDED} type="ticket" />
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg border border-green-100 text-sm text-slate-700 whitespace-pre-wrap">
                        {ticket.merchantResponse.content}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Chứng từ đính kèm</h4>
                        <div className="flex gap-4">
                          {ticket.merchantResponse.attachments?.map((url, i) => (
                            <div key={i} className="w-32 h-32 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 flex items-center justify-center group relative">
                              <img src={url} alt="Attachment" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Eye className="text-white" size={20} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-20 text-center space-y-4">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                        <Clock className="w-8 h-8 text-slate-300" />
                      </div>
                      <div className="text-slate-400">Merchant chưa phản hồi yêu cầu này.</div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'sync' && (
                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${ticket.syncStatus === 'Đã đồng bộ' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                        <RefreshCcw size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{ticket.syncStatus}</div>
                        <div className="text-xs text-slate-500">Lần cuối: {ticket.lastSyncTime || 'N/A'}</div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50">Đồng bộ lại</button>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">Admin (Phản hồi TS) Ticket ID</h4>
                    <div className="text-sm font-mono bg-slate-100 p-2 rounded border border-slate-200 w-fit">
                      {ticket.csId}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Mock Admin Disputes ---
const MOCK_ADMIN_DISPUTES: DisputeLookupRecord[] = [
  {
    id: "adm-1",
    stt: 1,
    idTraSoat: "DS-672771908",
    idGiaoDich: "BK_3B2666052D25",
    idDonHang: "ORD-998877",
    donHangMrc: "MRC-998877",
    trangThaiGD: "Thành công",
    thoiGianGD: "20/04/2026 10:00:00",
    maMerchant: "apple_store_vn",
    phuongThuc: "BNPL",
    loaiYeuCau: "Yêu cầu hoàn tiền",
    phanLoai: "Gian lận",
    giaTriDonHang: 1200000,
    thoiGianNhan: "20/04/2026 10:30:00",
    thoiGianTao: "20/04/2026 10:45:00",
    thoiGianPhanHoi: "-",
    thoiGianHoanThanh: "-",
    trangThai: "Đang xử lý",
    ketQua: "Chờ xác minh",
    responses: [
      {
        id: "r1",
        sender: "Bảo Kim",
        time: "20/04/2026 10:45:00",
        content: "Hệ thống đã ghi nhận yêu cầu tra soát cho giao dịch BK_3B2666052D25. Vui lòng kiểm tra lại trạng thái đơn hàng trên hệ thống của Đối tác.",
        attachments: [
          { name: "yeu-cau-tra-soat.pdf", url: "#", size: "150 KB", type: "pdf" }
        ]
      },
      {
        id: "r2",
        sender: "Đối tác",
        time: "20/04/2026 11:30:00",
        content: "Chúng tôi đã kiểm tra, đơn hàng này khách hàng báo chưa nhận được sản phẩm mặc dù trạng thái trên cổng vận chuyển là 'Đã giao'. Gửi kèm bằng chứng đối soát.",
        attachments: [
          { name: "chung-tu-doi-soat-mrc.zip", url: "#", size: "2.4 MB", type: "zip" }
        ],
        requiresAction: true
      }
    ],
    timeline: [
      { type: "System", time: "20/04/2026 10:45:00", content: "[Bảo Kim] Tạo yêu cầu tra soát" },
      { type: "Message", time: "20/04/2026 11:30:00", content: "[Bảo Kim] Gửi yêu cầu tra soát" },
    ]
  },
  {
    id: "adm-2",
    stt: 2,
    idTraSoat: "DS-631524097",
    idGiaoDich: "BK_3BC61CBBE7E6",
    idDonHang: "ORD-112233",
    donHangMrc: "MRC-112233",
    trangThaiGD: "Thành công",
    thoiGianGD: "19/04/2026 14:00:00",
    maMerchant: "shopee_mall",
    phuongThuc: "VA",
    loaiYeuCau: "Khiếu nại dịch vụ",
    phanLoai: "Giao dịch không thành công",
    giaTriDonHang: 3000000,
    thoiGianNhan: "19/04/2026 14:30:00",
    thoiGianTao: "19/04/2026 15:00:00",
    thoiGianPhanHoi: "19/04/2026 16:00:00",
    thoiGianHoanThanh: "-",
    trangThai: "Cần bổ sung",
    ketQua: "Chờ Merchant bổ sung chứng từ",
    timeline: [
      { type: "System", time: "19/04/2026 15:00:00", content: "[Bảo Kim] Tạo yêu cầu tra soát" },
      { type: "Message", time: "19/04/2026 16:00:00", content: "[Merchant] Đã phản hồi (file đính kèm)" },
      { type: "System", time: "19/04/2026 16:30:00", content: "[Bảo Kim] Yêu cầu bổ sung thêm chứng từ vận chuyển" },
    ]
  },
  {
    id: "adm-3",
    stt: 3,
    idTraSoat: "DS-672771909",
    idGiaoDich: "BK_3BA617BA8136",
    idDonHang: "ORD-445566",
    donHangMrc: "MRC-445566",
    trangThaiGD: "Thành công",
    thoiGianGD: "18/04/2026 09:00:00",
    maMerchant: "grab_food",
    phuongThuc: "VA",
    loaiYeuCau: "Yêu cầu hoàn tiền",
    phanLoai: "Khách hàng không nhận được hàng",
    giaTriDonHang: 85000,
    thoiGianNhan: "18/04/2026 09:30:00",
    thoiGianTao: "18/04/2026 10:00:00",
    thoiGianPhanHoi: "18/04/2026 14:00:00",
    thoiGianHoanThanh: "18/04/2026 15:30:00",
    trangThai: "Hoàn thành",
    ketQua: "Đã hoàn tiền",
    timeline: [
      { type: "System", time: "18/04/2026 10:00:00", content: "[Bảo Kim] Tạo yêu cầu tra soát" },
      { type: "Message", time: "18/04/2026 14:00:00", content: "[Merchant] Xác nhận không giao được hàng, đồng ý hoàn tiền" },
      { type: "System", time: "18/04/2026 15:30:00", content: "[Bảo Kim] Đã hoàn tiền cho khách hàng" },
    ]
  },
  {
    id: "adm-4",
    stt: 4,
    idTraSoat: "DS-672771910",
    idGiaoDich: "BK_3B6618BA1308",
    idDonHang: "ORD-778899",
    donHangMrc: "MRC-778899",
    trangThaiGD: "Thành công",
    thoiGianGD: "20/04/2026 11:00:00",
    maMerchant: "tiki_official",
    phuongThuc: "ATM",
    loaiYeuCau: "Tra soát",
    phanLoai: "Khác",
    giaTriDonHang: 450000,
    thoiGianNhan: "20/04/2026 11:15:00",
    thoiGianTao: "20/04/2026 11:30:00",
    thoiGianPhanHoi: "-",
    thoiGianHoanThanh: "-",
    trangThai: "Tra soát mới",
    ketQua: "Chờ xử lý",
    timeline: [
      { type: "System", time: "20/04/2026 11:30:00", content: "[Bảo Kim] Tạo yêu cầu tra soát mới" },
    ]
  }
];

// --- Dispute Response History Component (Admin) ---
function DisputeResponseHistory({ responses, onReply }: { responses: any[], onReply: (sender: string) => void }) {
  if (!responses || responses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-300">
        <Mail size={48} className="mb-4 opacity-20" />
        <p className="font-medium">Chưa có lịch sử phản hồi</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-32">
      {responses.map((res, idx) => (
        <motion.div 
          key={res.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`group flex flex-col space-y-3 p-6 rounded-3xl border transition-all ${
            res.requiresAction 
              ? 'bg-amber-50/50 border-amber-200 shadow-sm ring-1 ring-amber-100' 
              : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-md'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm ${
                res.sender === 'Bảo Kim' ? 'bg-cyan-600 text-white' : 'bg-purple-600 text-white'
              }`}>
                {res.sender === 'Bảo Kim' ? <Building2 size={20} /> : <UserCircle size={20} />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-800 text-sm">{res.sender}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                    res.sender === 'Bảo Kim' ? 'bg-cyan-100 text-cyan-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {res.sender === 'Bảo Kim' ? 'Internal' : 'Merchant'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
                  <Clock size={12} />
                  {res.time}
                </div>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                onClick={() => onReply(res.sender)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 font-bold text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-200 transition-all"
               >
                 <Send size={12} /> Trả lời
               </button>
            </div>
          </div>

          {/* Content */}
          <div className="text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
            {res.content}
          </div>

          {/* Attachments */}
          {res.attachments && res.attachments.length > 0 && (
            <div className="pt-4 flex flex-wrap gap-3 border-t border-slate-50 mt-2">
              {res.attachments.map((file: any, fIdx: number) => (
                <div key={fIdx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 group/file hover:bg-white transition-all">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    {file.type === 'pdf' ? <FileText size={16} className="text-red-500" /> : <Paperclip size={16} className="text-slate-400" />}
                  </div>
                  <div className="min-w-0 max-w-[150px]">
                    <p className="text-[11px] font-bold text-slate-700 truncate">{file.name}</p>
                    <p className="text-[9px] text-slate-400">{file.size}</p>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors">
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// --- Portal Dispute Management Screen ---
function PortalDisputeManagement() {
  const [selectedItem, setSelectedItem] = useState<DisputeLookupRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [responseText, setResponseText] = useState('');

  const filteredDisputes = MOCK_PORTAL_DISPUTES.filter(d => {
    if (searchQuery && !(
      d.idTraSoat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.idGiaoDich.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.idDonHang.toLowerCase().includes(searchQuery.toLowerCase())
    )) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-full overflow-hidden">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Tra soát</h2>
        <p className="text-sm text-slate-500 font-medium">Theo dõi và phản hồi yêu cầu tra soát giao dịch</p>
      </div>

      {/* 2. Top Filter / Search Section */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Bảng điều kiện tra cứu</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6">
          {/* Time Group */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1 px-1">
              <Clock size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thời gian tra cứu</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Từ ngày</label>
                <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Đến ngày</label>
                <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all" />
              </div>
            </div>
          </div>

          {/* Basic Search Group */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2 mb-4 px-1">
              <Search size={14} className="text-slate-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thông tin tìm kiếm</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Loại yêu cầu</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none">
                  <option>Tất cả</option>
                  <option>Hoàn tiền</option>
                  <option>Khiếu nại</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">ID khiếu nại</label>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Nhập ID..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">ID giao dịch</label>
                <input placeholder="Nhập ID giao dịch..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">ID đơn hàng</label>
                <input placeholder="Nhập ID đơn hàng..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Phương thức</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none">
                  <option>Tất cả</option>
                  <option>VA</option>
                  <option>ATM</option>
                  <option>Thẻ tín dụng</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Trạng thái tra soát</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none">
                  <option>Tất cả</option>
                  <option>Đã gửi yêu cầu</option>
                  <option>Đang xử lý</option>
                  <option>Chờ phản hồi</option>
                  <option>Hoàn thành</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <button className="flex items-center gap-2 px-6 py-2.5 text-slate-400 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:text-slate-600 transition-all">
            Đặt lại
          </button>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-xl hover:border-slate-400 transition-all">
              <FileSpreadsheet size={16} /> Xuất Excel
            </button>
            <button className="flex items-center gap-2 px-10 py-2.5 bg-cyan-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-cyan-700 shadow-xl shadow-cyan-100 transition-all">
              <Search size={16} /> Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      {/* 3. Result Table Section */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-8 py-5 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Bảng kết quả</h3>
          <span className="text-xs text-slate-400 font-medium">{filteredDisputes.length} kết quả tìm thấy</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                {[
                  "STT", "ID khiếu nại", "ID giao dịch", "ID đơn hàng", "Đơn hàng MRC", 
                  "Trạng thái GD", "Thời gian giao dịch", "Mã merchant", "Phương thức", 
                  "Loại yêu cầu", "Phân loại khiếu nại", "Giá trị đơn hàng", 
                  "Thời gian tạo khiếu nại", "Thời gian cập nhật", 
                  "Trạng thái", "Thao tác"
                ].map((header) => (
                  <th key={header} className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDisputes.map((row, idx) => (
                <tr 
                  key={row.id} 
                  className={`hover:bg-slate-50/50 transition-colors group ${row.trangThai === "Chờ phản hồi" ? "bg-red-50/10" : ""}`}
                >
                  <td className="p-5 text-sm text-slate-400">{idx+1}</td>
                  <td className="p-5 text-sm font-bold text-cyan-600 cursor-pointer hover:underline" onClick={() => setSelectedItem(row)}>{row.idTraSoat}</td>
                  <td className="p-5 text-sm text-slate-600">{row.idGiaoDich}</td>
                  <td className="p-5 text-sm text-slate-600 font-mono">{row.idDonHang}</td>
                  <td className="p-5 text-sm text-slate-600 font-mono">{row.donHangMrc}</td>
                  <td className="p-5">
                    <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase">{row.trangThaiGD}</span>
                  </td>
                  <td className="p-5 text-sm text-slate-500 whitespace-nowrap">{row.thoiGianGD}</td>
                  <td className="p-5 text-sm font-bold text-slate-700">{row.maMerchant}</td>
                  <td className="p-5 text-sm text-slate-600">{row.phuongThuc}</td>
                  <td className="p-5 text-sm text-slate-600">{row.loaiYeuCau}</td>
                  <td className="p-5 text-sm text-slate-600">{row.phanLoai}</td>
                  <td className="p-5 text-sm font-black text-slate-800">{row.giaTriDonHang.toLocaleString()} VND</td>
                  <td className="p-5 text-sm text-slate-500 whitespace-nowrap">{row.thoiGianTao}</td>
                  <td className="p-5 text-sm text-slate-500 whitespace-nowrap">{row.thoiGianPhanHoi}</td>
                  <td className="p-5">
                    <PortalStatusBadge status={row.trangThai} />
                  </td>
                  <td className="p-5">
                    <button 
                      onClick={() => setSelectedItem(row)}
                      className="whitespace-nowrap px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100"
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Detail View Drawer */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-4xl bg-white shadow-2xl z-[101] overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white text-slate-900 border-b-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-50 rounded-2xl">
                    <FileSearch className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-slate-800">Chi tiết khiếu nại</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{selectedItem.idTraSoat}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <PortalStatusBadge status={selectedItem.trangThai} />
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="p-3 hover:bg-slate-100 rounded-2xl transition-colors text-slate-400"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-hidden flex">
                {/* Left Column – Overview */}
                <div className="w-1/3 border-r border-slate-100 bg-slate-50/30 p-8 overflow-y-auto space-y-8">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Thông tin tóm tắt</h4>
                    {[
                      { label: "ID Tra soát", value: selectedItem.idTraSoat, highlight: true },
                      { label: "Mã merchant", value: selectedItem.maMerchant },
                      { label: "ID đơn hàng", value: selectedItem.idDonHang },
                      { label: "Phương thức", value: selectedItem.phuongThuc },
                      { label: "Số lượng GD", value: "1" },
                      { label: "Giá trị đơn hàng", value: `${selectedItem.giaTriDonHang.toLocaleString()} VND`, bold: true },
                      { label: "Đơn hàng Merchant", value: selectedItem.donHangMrc },
                      { label: "Phân loại khiếu nại", value: selectedItem.phanLoai },
                      { label: "Trạng thái khiếu nại", value: selectedItem.trangThai, badge: true },
                    ].map((item) => (
                      <div key={item.label} className="space-y-1">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                        {item.badge ? (
                          <div className="mt-1"><PortalStatusBadge status={item.value as string} /></div>
                        ) : (
                          <p className={`text-sm font-bold ${item.highlight ? 'text-cyan-600 underline' : 'text-slate-700'} ${item.bold ? 'font-black text-slate-900' : ''}`}>
                            {item.value}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-slate-100">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">File đính kèm</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl group hover:border-cyan-200 transition-all">
                        <Paperclip size={16} className="text-slate-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-700 truncate">bill-thanh-toan.pdf</p>
                          <p className="text-[9px] text-slate-400">1.2 MB • 20/04/2026</p>
                        </div>
                        <button className="p-2 text-slate-300 hover:text-cyan-600 transition-colors"><Download size={14}/></button>
                      </div>
                      <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-100 rounded-2xl hover:border-cyan-500 hover:bg-cyan-50/50 transition-all cursor-pointer group">
                        <Plus size={16} className="text-slate-300 group-hover:text-cyan-600" />
                        <span className="text-[10px] font-black text-slate-400 uppercase group-hover:text-cyan-600 ml-1">Tải file lên</span>
                        <input type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column – Interaction History */}
                <div className="flex-1 flex flex-col bg-slate-50/20 overflow-hidden relative">
                  <div className="p-8 pb-4 flex items-center justify-between">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lịch sử phản hồi</h4>
                    {selectedItem.trangThai === "Chờ phản hồi" && (
                      <div className="px-3 py-1 bg-red-100 text-red-700 text-[9px] font-black uppercase rounded-full flex items-center gap-1.5 ring-2 ring-red-50">
                        <AlertTriangle size={10} /> Cần bạn phản hồi
                      </div>
                    )}
                  </div>

                  {/* Scrollable Timeline */}
                  <div className="flex-1 overflow-y-auto p-8 pt-4">
                    <PortalResponseHistory 
                      responses={selectedItem.responses || []} 
                      onReply={() => {}}
                    />
                  </div>

                  {/* Sticky Reply Box */}
                  <div className="p-8 pt-6 border-t border-slate-100 bg-white shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.05)]">
                    <p className="text-[10px] font-bold text-slate-400 mb-3 ml-1">Bạn có thể đính kèm tài liệu để hỗ trợ xử lý tra soát</p>
                    <div className="relative group">
                      <textarea 
                        rows={3}
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        placeholder="Nhập phản hồi của bạn..."
                        className="w-full p-5 bg-white border-2 border-slate-100 rounded-[2rem] text-sm focus:ring-4 focus:ring-slate-100 focus:border-slate-800 outline-none resize-none transition-all pr-36 placeholder:text-slate-300 shadow-sm"
                      />
                      <div className="absolute right-4 bottom-4 flex gap-2">
                         <label className="p-3 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl hover:text-cyan-600 hover:bg-cyan-50 transition-all cursor-pointer">
                          <Upload size={20} />
                          <input type="file" className="hidden" />
                        </label>
                         <button className="flex items-center gap-2 p-3 px-6 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all font-black text-[10px] uppercase tracking-widest">
                          Gửi <Send size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Portal Response History Component ---
function PortalResponseHistory({ responses, onReply }: { responses: any[], onReply: () => void }) {
  if (!responses || responses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-200">
        <Mail size={48} className="mb-4 opacity-10" />
        <p className="font-bold text-sm">Chưa có lịch sử hội thoại</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {responses.map((res, idx) => (
        <motion.div 
          key={res.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`flex flex-col space-y-3 p-6 rounded-[2rem] border shadow-sm transition-all ${
            idx === responses.length - 1 ? 'ring-2 ring-cyan-50 border-cyan-100' : 'bg-white border-slate-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                res.sender === 'Bảo Kim' ? 'bg-cyan-600 text-white' : 'bg-purple-600 text-white'
              }`}>
                {res.sender === 'Bảo Kim' ? <Building2 size={16} /> : <UserCircle size={16} />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-800 text-xs">{res.sender}</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                    res.sender === 'Bảo Kim' ? 'bg-cyan-100 text-cyan-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {res.sender === 'Bảo Kim' ? 'Bảo Kim' : 'Bạn'}
                  </span>
                </div>
                <p className="text-slate-400 text-[9px] font-bold">{res.time}</p>
              </div>
            </div>
            <button className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-cyan-600 transition-colors">Trả lời</button>
          </div>

          <div className="text-sm text-slate-600 leading-relaxed font-medium">
            {res.content}
          </div>

          {res.attachments && res.attachments.length > 0 && (
            <div className="pt-3 flex flex-wrap gap-2 border-t border-slate-50 mt-1">
              {res.attachments.map((file: any, fIdx: number) => (
                <div key={fIdx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 group/file">
                  <FileText size={14} className="text-slate-400 group-hover:text-cyan-600" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-700 truncate">{file.name}</p>
                  </div>
                  <button className="p-1.5 text-slate-300 hover:text-cyan-600"><Download size={12}/></button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// --- Mock Portal Disputes ---
const MOCK_PORTAL_DISPUTES: DisputeLookupRecord[] = [
  {
    id: "p-1",
    stt: 1,
    idTraSoat: "DS-778899",
    idGiaoDich: "BK_TRAN_001",
    idDonHang: "ORD-999",
    donHangMrc: "WEB-999",
    trangThaiGD: "Thành công",
    thoiGianGD: "15/04/2026 09:00",
    maMerchant: "MY_STORE",
    phuongThuc: "ATM",
    loaiYeuCau: "Khiếu nại",
    phanLoai: "Hàng lỗi",
    giaTriDonHang: 500000,
    thoiGianTao: "15/04/2026 10:00",
    thoiGianNhan: "15/04/2026 10:00",
    thoiGianPhanHoi: "15/04/2026 14:00",
    thoiGianHoanThanh: "-",
    trangThai: "Chờ phản hồi",
    ketQua: "Chờ Merchant gửi ảnh hàng lỗi",
    responses: [
      {
        id: "pr1",
        sender: "Bảo Kim",
        time: "15/04/2026 10:30",
        content: "Chào Đối tác, chúng tôi nhận được khiếu nại từ khách hàng báo hàng lỗi. Vui lòng cung cấp thêm hình ảnh kiểm tra hàng trước khi đóng gói.",
        attachments: [{ name: "anh-khach-hang-gui.jpg", url: "#", size: "800 KB", type: "image" }]
      }
    ]
  },
  {
    id: "p-2",
    stt: 2,
    idTraSoat: "DS-112233",
    idGiaoDich: "BK_TRAN_002",
    idDonHang: "ORD-888",
    donHangMrc: "WEB-888",
    trangThaiGD: "Thành công",
    thoiGianGD: "14/04/2026 15:00",
    maMerchant: "MY_STORE",
    phuongThuc: "VA",
    loaiYeuCau: "Hoàn tiền",
    phanLoai: "Khách trả hàng",
    giaTriDonHang: 1250000,
    thoiGianTao: "14/04/2026 16:00",
    thoiGianNhan: "14/04/2026 16:00",
    thoiGianPhanHoi: "14/04/2026 17:00",
    thoiGianHoanThanh: "14/04/2026 18:00",
    trangThai: "Hoàn thành",
    ketQua: "Đã hoàn tiền thành công",
  }
];

// --- Status Badge for Portal Management ---
function PortalStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Đã gửi yêu cầu": "bg-blue-100 text-blue-700 border-blue-200",
    "Đang xử lý": "bg-orange-100 text-orange-700 border-orange-200",
    "Chờ phản hồi": "bg-red-100 text-red-700 border-red-200",
    "Hoàn thành": "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${styles[status] || "bg-slate-100 text-slate-500 border-slate-200"}`}>
      {status}
    </span>
  );
}

// --- Admin Status Badge for Admin Management ---
function AdminStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Tra soát mới": "bg-red-100 text-red-600 border-red-200",
    "Cần bổ sung": "bg-amber-100 text-amber-600 border-amber-200",
    "Đang xử lý": "bg-blue-100 text-blue-600 border-blue-200",
    "Hoàn thành": "bg-green-100 text-green-600 border-green-200",
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
      {status}
    </span>
  );
}

// --- Admin Dispute Management View ---
function AdminDisputeManagement() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<DisputeLookupRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [responseText, setResponseText] = useState('');

  const summary = {
    new: MOCK_ADMIN_DISPUTES.filter(d => d.trangThai === "Tra soát mới").length,
    needAction: MOCK_ADMIN_DISPUTES.filter(d => d.trangThai === "Cần bổ sung").length,
    processing: MOCK_ADMIN_DISPUTES.filter(d => d.trangThai === "Đang xử lý").length,
    completed: MOCK_ADMIN_DISPUTES.filter(d => d.trangThai === "Hoàn thành").length,
  };

  const filteredDisputes = MOCK_ADMIN_DISPUTES.filter(d => {
    if (activeFilter && d.trangThai !== activeFilter) return false;
    if (searchQuery && !(
      d.idTraSoat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.idGiaoDich.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.maMerchant.toLowerCase().includes(searchQuery.toLowerCase())
    )) return false;
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-full overflow-hidden">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Quản lý tra soát</h2>
        <p className="text-sm text-slate-500 font-medium tracking-tight">Theo dõi và phản hồi yêu cầu tra soát</p>
      </div>

      {/* Section 1 – Notification Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Tra soát mới", count: 5, color: "bg-red-50 text-red-600 border-red-100 hover:bg-red-100", icon: Bell },
          { label: "Cần bổ sung", count: 3, color: "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100", icon: AlertCircle },
          { label: "Đang xử lý", count: 8, color: "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100", icon: Clock },
          { label: "Hoàn thành", count: 12, color: "bg-green-50 text-green-600 border-green-100 hover:bg-green-100", icon: CheckCircle2 },
        ].map((card) => (
          <button 
            key={card.label}
            onClick={() => setActiveFilter(activeFilter === card.label ? null : card.label)}
            className={`p-6 rounded-2xl border transition-all text-left flex flex-col justify-between h-32 group relative overflow-hidden ${card.color} ${activeFilter === card.label ? 'ring-2 ring-offset-2 ring-slate-800 scale-[1.02]' : ''}`}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-black uppercase tracking-widest opacity-80">{card.label}</span>
              <card.icon className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-3xl font-black">{card.count}</div>
            {activeFilter === card.label && (
              <div className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 bg-slate-900 text-white rounded-full text-[10px]">
                <Check size={12} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Section 2 – Filter / Search Panel */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Time Group */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Thời gian</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Từ ngày</label>
                <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Đến ngày</label>
                <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all" />
              </div>
            </div>
          </div>

          {/* Identifiers Group */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Định danh</h3>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">ID tra soát</label>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Nhập ID..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">ID giao dịch</label>
                <input placeholder="Nhập ID..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">ID đơn hàng</label>
                <input placeholder="Nhập ID..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">GD NCC</label>
                <input placeholder="Nhập GD..." className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
              </div>
            </div>
          </div>

          {/* Classification Group */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-1">Phân loại</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Loại yêu cầu</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none">
                  <option>Tất cả</option>
                  <option>Yêu cầu hoàn tiền</option>
                  <option>Khiếu nại dịch vụ</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Nhà cung cấp</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none">
                  <option>Tất cả</option>
                  <option>Napas</option>
                  <option>Bank</option>
                  <option>BNPL</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Phương thức</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none">
                  <option>Tất cả</option>
                  <option>VA</option>
                  <option>ATM</option>
                  <option>BNPL</option>
                  <option>Thẻ tín dụng</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Trạng thái tra soát</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none">
                  <option>Tất cả</option>
                  <option>Tra soát mới</option>
                  <option>Cần bổ sung</option>
                  <option>Đang xử lý</option>
                  <option>Hoàn thành</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Kết quả xử lý</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none">
                  <option>Tất cả</option>
                  <option>Chờ xử lý</option>
                  <option>Đã hoàn tiền</option>
                  <option>Từ chối</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Hình thức tiếp nhận</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none">
                  <option>Tất cả</option>
                  <option>Portal</option>
                  <option>Email</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all">
            <RefreshCcw size={14} /> Reset lọc
          </button>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-xl hover:border-slate-400 transition-all">
              <FileSpreadsheet size={16} /> Xuất Excel
            </button>
            <button className="flex items-center gap-2 px-10 py-2.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all">
              <Search size={16} /> Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      {/* Section 3 – Result Table */}
      <section className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[2400px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {[
                  "STT", "ID tra soát", "ID giao dịch", "ID đơn hàng", "Đơn hàng MRC", 
                  "Trạng thái GD", "Thời gian GD", "Mã merchant", "Phương thức", 
                  "Loại yêu cầu", "Phân loại", "Giá trị đơn hàng", 
                  "Thời gian nhận tra soát", "Thời gian tạo khiếu nại", 
                  "Thời gian Merchant phản hồi", "Thời gian hoàn thành", 
                  "Trạng thái", "Kết quả xử lý", "Thao tác"
                ].map((header) => (
                  <th key={header} className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDisputes.map((row, idx) => (
                <tr 
                  key={row.id} 
                  className={`hover:bg-slate-50/80 transition-colors group ${row.trangThai === "Cần bổ sung" ? "bg-amber-50/20" : ""}`}
                >
                  <td className="p-5 text-sm text-slate-400">{idx+1}</td>
                  <td className="p-5 text-sm font-bold text-cyan-600 cursor-pointer hover:underline" onClick={() => setSelectedItem(row)}>{row.idTraSoat}</td>
                  <td className="p-5 text-sm text-slate-600 font-mono">{row.idGiaoDich}</td>
                  <td className="p-5 text-sm text-slate-600 font-mono">{row.idDonHang}</td>
                  <td className="p-5 text-sm text-slate-600 font-mono">{row.donHangMrc}</td>
                  <td className="p-5">
                    <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase">{row.trangThaiGD}</span>
                  </td>
                  <td className="p-5 text-sm text-slate-500 whitespace-nowrap">{row.thoiGianGD}</td>
                  <td className="p-5 text-sm font-bold text-slate-700">{row.maMerchant}</td>
                  <td className="p-5 text-sm text-slate-600">{row.phuongThuc}</td>
                  <td className="p-5 text-sm text-slate-600">{row.loaiYeuCau}</td>
                  <td className="p-5 text-sm text-slate-600">{row.phanLoai}</td>
                  <td className="p-5 text-sm font-black text-slate-800">{row.giaTriDonHang.toLocaleString()} VND</td>
                  <td className="p-5 text-sm text-slate-500">{row.thoiGianNhan}</td>
                  <td className="p-5 text-sm text-slate-500">{row.thoiGianTao}</td>
                  <td className="p-5 text-sm text-slate-500">{row.thoiGianPhanHoi}</td>
                  <td className="p-5 text-sm text-slate-500">{row.thoiGianHoanThanh}</td>
                  <td className="p-5">
                    <AdminStatusBadge status={row.trangThai} />
                  </td>
                  <td className="p-5 text-sm text-slate-600 font-medium">{row.ketQua}</td>
                  <td className="p-5">
                    <button 
                      onClick={() => setSelectedItem(row)}
                      className="whitespace-nowrap px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100"
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDisputes.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center space-y-4 text-slate-400">
            <Search size={48} className="opacity-10" />
            <p className="font-bold">Không tìm thấy yêu cầu tra soát nào</p>
          </div>
        )}
      </section>

      {/* Section 4 – Detail View Drawer */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-4xl bg-white shadow-2xl z-[101] overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-2xl">
                    <FileSearch className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight">Chi tiết tra soát</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{selectedItem.idTraSoat}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="p-3 hover:bg-white/10 rounded-2xl transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-hidden flex">
                {/* Left Column – Overview */}
                <div className="w-1/3 border-r border-slate-100 bg-slate-50/50 p-8 overflow-y-auto space-y-8">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Thông tin chung</h4>
                    {[
                      { label: "ID tra soát", value: selectedItem.idTraSoat, highlight: true },
                      { label: "Mã merchant", value: selectedItem.maMerchant },
                      { label: "ID đơn hàng", value: selectedItem.idDonHang },
                      { label: "Phương thức", value: selectedItem.phuongThuc },
                      { label: "Số lượng GD", value: "1" },
                      { label: "Giá trị đơn hàng", value: `${selectedItem.giaTriDonHang.toLocaleString()} VND`, bold: true },
                      { label: "Đơn hàng merchant", value: selectedItem.donHangMrc },
                      { label: "Phân loại tra soát", value: selectedItem.phanLoai },
                      { label: "Trạng thái tra soát", value: selectedItem.trangThai, badge: true },
                    ].map((item) => (
                      <div key={item.label} className="space-y-1">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                        {item.badge ? (
                          <div className="mt-1"><AdminStatusBadge status={item.value} /></div>
                        ) : (
                          <p className={`text-sm font-bold ${item.highlight ? 'text-cyan-600 underline' : 'text-slate-700'} ${item.bold ? 'font-black text-slate-900' : ''}`}>
                            {item.value}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-slate-200">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">File đính kèm từ Portal</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-all cursor-pointer">
                        <Paperclip size={16} className="text-slate-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-700 truncate">chung-tu-doi-soat-goc.pdf</p>
                          <p className="text-[9px] text-slate-400">1.2 MB • 20/04/2026</p>
                        </div>
                        <button className="p-1 px-2 text-[9px] font-black text-cyan-600 uppercase hover:bg-cyan-50 rounded-lg">Tải về</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column – Interaction History */}
                <div className="flex-1 flex flex-col bg-slate-50/30 overflow-hidden relative">
                  {/* Timeline Header */}
                  <div className="p-8 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lịch sử phản hồi tra soát</h4>
                      <div className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[9px] font-black uppercase rounded-full animate-pulse">
                        Đang chờ phản hồi từ Đối tác
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-red-500 uppercase">
                      <AlertTriangle size={12} /> SLA: 24h còn lại
                    </div>
                  </div>

                  {/* Scrollable Timeline */}
                  <div className="flex-1 overflow-y-auto p-8 pt-4">
                    <DisputeResponseHistory 
                      responses={selectedItem.responses || []} 
                      onReply={(sender) => setResponseText(`@${sender}: `)}
                    />
                  </div>

                  {/* Sticky Response Input */}
                  <div className="p-8 pt-6 border-t border-slate-100 bg-white/80 backdrop-blur-xl shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                    <div className="space-y-4">
                      <div className="relative group">
                        <textarea 
                          rows={3}
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          placeholder="Nhập nội dung phản hồi nhanh cho Đối tác..."
                          className="w-full p-5 bg-white border-2 border-slate-100 rounded-[2.5rem] text-sm focus:ring-4 focus:ring-slate-100 focus:border-slate-900 outline-none resize-none transition-all pr-32 placeholder:text-slate-300"
                        />
                        <div className="absolute right-4 bottom-4 flex gap-2">
                           <label className="p-3 bg-slate-50 border border-slate-100 text-slate-400 rounded-2xl hover:text-cyan-600 hover:bg-cyan-50 transition-all cursor-pointer">
                            <Upload size={20} />
                            <input type="file" className="hidden" />
                          </label>
                           <button className="flex items-center gap-2 p-3 px-6 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all font-black text-[10px] uppercase tracking-widest">
                            Gửi <Send size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between gap-4 px-4">
                        <div className="flex gap-4 items-center">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phím tắt:</p>
                          <div className="flex gap-2">
                            {["Đồng ý hoàn tiền", "Cần thêm chứng từ", "Từ chối tra soát"].map(tag => (
                              <button 
                                key={tag} 
                                onClick={() => setResponseText(tag)}
                                className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[9px] font-bold hover:bg-slate-200 transition-colors uppercase"
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="w-1/3 space-y-1">
                          <label className="text-[9px] font-bold text-slate-500 uppercase ml-1">Chuyển trạng thái</label>
                          <select className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-600 focus:ring-2 focus:ring-slate-900 outline-none">
                            <option>Giữ nguyên</option>
                            <option>Cần bổ sung</option>
                            <option>Đang xử lý</option>
                            <option>Hoàn thành</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilumView({ tickets, onProcess }: { tickets: Ticket[], onProcess: (id: string) => void }) {
  return <AdminDisputeManagement />;
}
