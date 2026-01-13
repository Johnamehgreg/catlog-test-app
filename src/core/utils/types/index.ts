export interface FormSignInValue {
  email?: string;
  phone?: string;
  password: string;
  forced?: boolean;
}

export interface ToastModel {
  variant: ToastVariant;
  message: string;
  isLoading?: boolean;
}

export interface ExpenseValue {
  description: string;
  amount: number;
  amount_paid: number;
  recipient: string;
  category: string;
  currency: string;
  date?: string;
  // currency: "NGN" | "USD" | "EUR" | "GBP" | "GHC" | "ZAR" | "KES" | "CAD",
}

export type StoreKey = 'darkMode' | 'token' | 'user' | 'refreshToken';

export interface UserValue {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  hide?: boolean;
}

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastModel {
  variant: ToastVariant;
  message: string;
  isLoading?: boolean;
}

export interface ExpenseModel {
  auto_generated: boolean;
  currency: string;
  payments: any[];
  notes: any[];
  status: 'FULLY_PAID' | string;
  expense_id: string;
  description: string;
  recipient: Recipient;
  category: string;

  amount: number;
  amount_paid: number;
  store: string;
  sale: Sale;
  created_at: string;
  updated_at: string;
  id: string;
}

export interface Recipient {
  id: string;
  name: string;
  store: string;
  created_at: string;
  updated_at: string;
  v: number;
}

export interface Sale {
  payments: any[];
  related_notes: any[];
  related_adjustments: string[];
  related_expenses: string[];
  related_debts: any[];
  payment_status: 'FULLY_PAID' | string;
  is_paid: boolean;
  from_seller: boolean;
  channel: string;
  currency: string;
  delivery_method: string;
  status: string;
  id: string;
  customer: string;
  delivery_info: DeliveryInfo;
  items: any[];
  store: string;
  fees: Fee[];
  amount_paid: number;
  extra_details: Record<string, any>;
  order_notes: string;
  supplies_used: any[];
  original_items: OriginalItem[];
  order_id: string;
  total_amount: number;
  timeline: Timeline[];
  validated_delivery_address: string;
  delivery_option: DeliveryOption;
  affiliate: any;
  cart: any;
  pickup_code: string;
  created_at: string;
  updated_at: string;
  v: number;
  financial_breakdown: FinancialBreakdown;
  date_recorded: string;
  sale_id: string;
  invoice: string;
}

export interface DeliveryInfo {
  delivery_address: string;
  area: string;
  name: string;
  phone: string;
  user_provided_address: string;
}

export interface Fee {
  id: string;
  label: string;
  amount: number;
  type: string;
}

export interface OriginalItem {
  id: string;
  item_id: string;
  quantity: number;
  snapshot: ItemSnapshot;
  adjustments: Adjustment[];
  refunded: boolean;
}

export interface ItemSnapshot {
  is_low_stock: boolean;
  info_blocks: any[];
  upload_source: string;
  is_featured: boolean;
  total_orders: number;
  views: number;
  thumbnail_type: string;
  images: string[];
  available: boolean;
  slug: string;
  tags: any[];
  name: string;
  price: number;
  description: string;
  thumbnail: number;
  price_unit: string;
  variants: Variants;
  videos: any[];
  cost_price: number;
  quantity: number;
  is_always_available: boolean;
  is_menu_item: boolean;
  store: string;
  sort_index: number;
  created_at: string;
  updated_at: string;
  weight: number;
  discount: string;
  socials_config: SocialsConfig;
  original_price: number;
  id: string;
}

export interface Variants {
  type: string;
  is_template: boolean;
  options: any[];
}

export interface SocialsConfig {
  sync_stock_to_social: {
    ig: boolean;
  };
}

export interface Adjustment {
  id: string;
  adjustment_id: string;
  quantity_adjusted: number;
}

export interface Timeline {
  id: string;
  status: string;
  time: string;
}

export interface DeliveryOption {
  type: string;
  location: Location;
  price: number;
  option: any;
}

export interface Location {
  id: string;
  name: string;
  country: string | null;
  state: string | null;
  city: string | null;
  active: boolean;
}

export interface FinancialBreakdown {
  total_cost_of_goods: number;
  gross_profit: number;
  net_profit: number;
  total_expenses: number;
  total_revenue: number;
  total_amount_paid: number;
  original_items_revenue: number;
  total_refunds: number;
  revenue_from_adjustments: number;
  net_revenue: number;
  customer_fees: Fee[];
  deductions: any[];
  total_customer_fees: number;
  total_deductions: number;
}

export interface CategoryModel {
  id: string;
  description: string;
  key: string;
  title: string;
}

export interface OrderPageQuery {
  page: number;
  per_page: number;
}
