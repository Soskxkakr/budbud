
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { formatDateToLocalString } from "~/lib/utils";
import type { WebhookLog, WebhookConfig } from "~/types/webhooks";

// Mock data - in real app this would come from your database
const mockWebhookLogs: WebhookLog[] = [
  {
    id: "1",
    provider: "stripe",
    eventType: "payment_intent.succeeded",
    status: "success",
    payload: { amount: 2999, currency: "usd" },
    timestamp: new Date().toISOString(),
    processingTime: 150
  },
  {
    id: "2", 
    provider: "stripe",
    eventType: "invoice.payment_failed",
    status: "failed",
    payload: { amount: 1500, currency: "usd" },
    error: "Card declined",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    processingTime: 75
  }
];

const mockWebhookConfigs: WebhookConfig[] = [
  {
    id: "1",
    provider: "stripe",
    endpoint: "/webhooks/stripe",
    isActive: true,
    events: ["payment_intent.succeeded", "payment_intent.payment_failed", "invoice.payment_succeeded"],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    lastTriggered: new Date().toISOString()
  }
];

export default function WebhooksIndex() {
  const [filterProvider, setFilterProvider] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredLogs = mockWebhookLogs.filter(log => {
    const matchesProvider = filterProvider === "all" || log.provider === filterProvider;
    const matchesStatus = filterStatus === "all" || log.status === filterStatus;
    return matchesProvider && matchesStatus;
  });

  return (
    <div className="py-6">
      <div className="px-4 sm:px-6 md:px-8">
        {/* Page Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Webhooks</h2>
            <p className="mt-1 text-sm text-gray-500">
              Monitor and manage webhook integrations
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button>
              <i className="ri-add-line mr-2"></i>
              Add Webhook
            </Button>
          </div>
        </div>

        {/* Active Configurations */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Active Webhooks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockWebhookConfigs.map((config) => (
                <div key={config.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold capitalize">{config.provider}</h4>
                    <p className="text-sm text-gray-500">{config.endpoint}</p>
                    <div className="flex gap-2 mt-2">
                      {config.events.slice(0, 2).map((event) => (
                        <Badge key={event} variant="outline" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                      {config.events.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{config.events.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={config.isActive ? "default" : "secondary"}>
                      {config.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">
                      Last: {config.lastTriggered ? formatDateToLocalString(config.lastTriggered) : "Never"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Webhook Logs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Webhook Events</CardTitle>
              <div className="flex gap-2">
                <Select value={filterProvider} onValueChange={setFilterProvider}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Processing Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {log.provider}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.eventType}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          log.status === "success" ? "default" : 
                          log.status === "failed" ? "destructive" : "secondary"
                        }
                      >
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDateToLocalString(log.timestamp)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {log.processingTime}ms
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <i className="ri-eye-line mr-1"></i>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
