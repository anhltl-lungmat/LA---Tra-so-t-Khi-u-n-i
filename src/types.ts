export enum OrderStatus {
  PROCESSING = "Đang xử lý",
  SUCCESS = "Thành công",
  REFUNDED = "Đã hoàn",
}

export enum TicketStatus {
  CREATED = "Khởi tạo",
  WAITING_RESPONSE = "Chờ phản hồi",
  RESPONDED = "Đã phản hồi",
  OVERDUE = "Quá hạn",
  CLOSED = "Đã đóng",
}

export interface Transaction {
  id: string;
  bkId: string;
  mrcOrderId: string;
  service: string; // Thu hộ, POS, CTT...
  amount: number;
  time: string;
}

export interface TimelineEvent {
  type: string;
  time: string;
  content: string;
}

export interface DisputeAttachment {
  name: string;
  url: string;
  size: string;
  type: string;
}

export interface DisputeResponse {
  id: string;
  sender: "Bảo Kim" | "Đối tác";
  time: string;
  content: string;
  attachments?: DisputeAttachment[];
  requiresAction?: boolean;
}

export interface Ticket {
  id: string;
  bkId: string;
  ticketId: string;
  csId: string;
  formType: string;
  merchantId: string;
  ticketType: string;
  status: TicketStatus;
  source: "Admin" | "Portal";
  creator: string;
  updatedTime: string;
  createdTime: string;
  deadline: string; // createdTime + 3 days
  receivedTime: string;
  provider: "Napas" | "Bank" | "Momo" | "VPBank" | "BNPL";
  receptionMethod: "Email" | "Portal";
  transactionCount: number;
  transactions: Transaction[];
  isRefunded: boolean;
  sendEmailToMerchant: boolean;
  emailPreview?: string;
  merchantResponse?: {
    content: string;
    attachments: string[];
    responseTime: string;
  };
  timeline: TimelineEvent[];
  syncStatus: "Đã đồng bộ" | "Chưa đồng bộ" | "Lỗi";
  lastSyncTime: string;
}

export interface DisputeLookupRecord {
  id: string;
  stt: number;
  idTraSoat: string;
  idGiaoDich: string;
  idDonHang: string;
  donHangMrc: string;
  trangThaiGD: string;
  thoiGianGD: string;
  maMerchant: string;
  phuongThuc: string;
  loaiYeuCau: string;
  phanLoai: string;
  giaTriDonHang: number;
  thoiGianNhan: string;
  thoiGianTao: string;
  thoiGianPhanHoi: string;
  thoiGianHoanThanh: string;
  trangThai: string;
  ketQua: string;
  dichVuGoc?: string;
  isRefunded?: boolean;
  sendEmailToMrc?: boolean;
  emailSubject?: string;
  emailBody?: string;
  attachments?: File[];
  timeline?: TimelineEvent[];
  responses?: DisputeResponse[];
}

export interface Order {
  id: string;
  bkOrderId: string;
  mrcOrderId: string;
  createdTime: string;
  updatedTime: string;
  status: OrderStatus;
  value: number;
  fee: number;
  discount: number;
  netReceived: number;
  content: string;
  method: string;
  source: string;
  branch: string;
  mrcCode: string;
  store: string;
  staff: string;
  productName: string;
  customer: {
    name: string;
    phone: string;
  };
  note: string;
}
