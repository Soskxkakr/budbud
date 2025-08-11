
export interface WebhookLog {
  id: string;
  provider: 'stripe' | 'paypal' | 'square' | 'other';
  eventType: string;
  status: 'success' | 'failed' | 'processing';
  payload: any;
  response?: any;
  error?: string;
  timestamp: string;
  processingTime?: number;
}

export interface WebhookConfig {
  id: string;
  provider: string;
  endpoint: string;
  isActive: boolean;
  events: string[];
  secret?: string;
  createdAt: string;
  lastTriggered?: string;
}
