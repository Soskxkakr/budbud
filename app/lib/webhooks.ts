export interface WebhookEvent {
  id: string;
  type: string;
  data: any;
  created: number;
  livemode: boolean;
}

export interface StripeWebhookEvent extends WebhookEvent {
  type: 
    | 'payment_intent.succeeded' 
    | 'payment_intent.payment_failed'
    | 'invoice.payment_succeeded'
    | 'customer.subscription.created'
    | 'customer.subscription.updated'
    | 'customer.subscription.deleted';
}

export class WebhookProcessor {
  static async processStripeWebhook(event: StripeWebhookEvent) {
    switch (event.type) {
      case 'payment_intent.succeeded':
        return await this.handlePaymentSuccess(event);
      case 'payment_intent.payment_failed':
        return await this.handlePaymentFailure(event);
      case 'invoice.payment_succeeded':
        return await this.handleInvoicePayment(event);
      default:
        console.log(`Unhandled Stripe event type: ${event.type}`);
        return { received: true };
    }
  }

  private static async handlePaymentSuccess(event: StripeWebhookEvent) {
    // Create transaction record
    const paymentIntent = event.data.object;
    
    // This would typically create a transaction in your database
    console.log('Payment succeeded:', paymentIntent.id, paymentIntent.amount);
    
    return { processed: true, type: 'payment_success' };
  }

  private static async handlePaymentFailure(event: StripeWebhookEvent) {
    const paymentIntent = event.data.object;
    console.log('Payment failed:', paymentIntent.id, paymentIntent.last_payment_error?.message);
    
    return { processed: true, type: 'payment_failure' };
  }

  private static async handleInvoicePayment(event: StripeWebhookEvent) {
    const invoice = event.data.object;
    console.log('Invoice payment succeeded:', invoice.id, invoice.amount_paid);
    
    return { processed: true, type: 'invoice_payment' };
  }
}
