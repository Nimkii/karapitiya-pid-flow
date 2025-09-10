import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Shield,
  Search,
  Filter,
  Download,
  Calendar as CalendarIcon,
  Eye,
  User,
  Activity,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format, isAfter, isBefore, isEqual } from "date-fns";
import { cn } from "@/lib/utils";

interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId?: string;
  ipAddress: string;
  userAgent: string;
  status: "success" | "failure" | "warning";
  details: string;
  sessionId: string;
  module: "patient" | "admission" | "user" | "ward" | "system" | "auth";
}

const AuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([
    {
      id: "1",
      timestamp: new Date("2024-01-15T10:30:00"),
      userId: "user_001",
      userName: "Dr. Sarah Chen",
      userRole: "ward_doctor",
      action: "VIEW_PATIENT_RECORD",
      resource: "patient",
      resourceId: "PAT_001",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
      details: "Viewed patient record for John Doe (ID: PAT_001)",
      sessionId: "sess_abc123",
      module: "patient",
    },
    {
      id: "2",
      timestamp: new Date("2024-01-15T10:25:00"),
      userId: "user_002",
      userName: "Sister Mary Johnson",
      userRole: "nurse",
      action: "UPDATE_PATIENT_VITALS",
      resource: "patient",
      resourceId: "PAT_002",
      ipAddress: "192.168.1.102",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
      details: "Updated vital signs for patient Jane Smith",
      sessionId: "sess_def456",
      module: "patient",
    },
    {
      id: "3",
      timestamp: new Date("2024-01-15T10:20:00"),
      userId: "user_003",
      userName: "Admin User",
      userRole: "admin",
      action: "CREATE_USER",
      resource: "user",
      resourceId: "user_004",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
      details: "Created new user account for Dr. Michael Brown",
      sessionId: "sess_ghi789",
      module: "user",
    },
    {
      id: "4",
      timestamp: new Date("2024-01-15T10:15:00"),
      userId: "user_005",
      userName: "Bob Johnson",
      userRole: "registrar_clerk",
      action: "LOGIN_ATTEMPT",
      resource: "authentication",
      ipAddress: "192.168.1.103",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "failure",
      details: "Failed login attempt - incorrect password",
      sessionId: "sess_jkl012",
      module: "auth",
    },
    {
      id: "5",
      timestamp: new Date("2024-01-15T10:10:00"),
      userId: "user_001",
      userName: "Dr. Sarah Chen",
      userRole: "ward_doctor",
      action: "ADMIT_PATIENT",
      resource: "admission",
      resourceId: "ADM_001",
      ipAddress: "192.168.1.101",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "success",
      details: "Admitted patient to Pediatric Ward",
      sessionId: "sess_abc123",
      module: "admission",
    },
    {
      id: "6",
      timestamp: new Date("2024-01-15T10:05:00"),
      userId: "user_006",
      userName: "System",
      userRole: "system",
      action: "BACKUP_COMPLETED",
      resource: "system",
      ipAddress: "127.0.0.1",
      userAgent: "System/1.0",
      status: "success",
      details: "Daily database backup completed successfully",
      sessionId: "system",
      module: "system",
    },
    {
      id: "7",
      timestamp: new Date("2024-01-15T09:55:00"),
      userId: "user_007",
      userName: "Dr. Robert Smith",
      userRole: "ward_doctor",
      action: "DELETE_PATIENT_RECORD",
      resource: "patient",
      resourceId: "PAT_003",
      ipAddress: "192.168.1.104",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      status: "warning",
      details: "Attempted to delete patient record - requires admin approval",
      sessionId: "sess_mno345",
      module: "patient",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [moduleFilter, setModuleFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [userFilter, setUserFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const modules = [
    { value: "patient", label: "Patient Management" },
    { value: "admission", label: "Admissions" },
    { value: "user", label: "User Management" },
    { value: "ward", label: "Ward Management" },
    { value: "system", label: "System" },
    { value: "auth", label: "Authentication" },
  ];

  const actions = Array.from(new Set(logs.map(log => log.action))).map(action => ({
    value: action,
    label: action.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  }));

  const users = Array.from(new Set(logs.map(log => log.userName))).map(user => ({
    value: user,
    label: user
  }));

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.includes(searchTerm);

    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    const matchesModule = moduleFilter === "all" || log.module === moduleFilter;
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    const matchesUser = userFilter === "all" || log.userName === userFilter;

    const matchesDateFrom = !dateFrom || isAfter(log.timestamp, dateFrom) || isEqual(log.timestamp, dateFrom);
    const matchesDateTo = !dateTo || isBefore(log.timestamp, dateTo) || isEqual(log.timestamp, dateTo);

    return matchesSearch && matchesStatus && matchesModule && matchesAction && matchesUser && matchesDateFrom && matchesDateTo;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failure":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "success":
        return "default";
      case "failure":
        return "destructive";
      case "warning":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getModuleIcon = (module: string) => {
    switch (module) {
      case "patient":
        return <User className="h-4 w-4" />;
      case "admission":
        return <Activity className="h-4 w-4" />;
      case "user":
        return <User className="h-4 w-4" />;
      case "ward":
        return <Activity className="h-4 w-4" />;
      case "system":
        return <FileText className="h-4 w-4" />;
      case "auth":
        return <Shield className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const exportLogs = () => {
    const csv = [
      ["Timestamp", "User", "Role", "Action", "Resource", "Status", "IP Address", "Details"],
      ...filteredLogs.map(log => [
        log.timestamp.toISOString(),
        log.userName,
        log.userRole,
        log.action,
        log.resource,
        log.status,
        log.ipAddress,
        log.details.replace(/,/g, ";"), // Replace commas to avoid CSV issues
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit_logs_${format(new Date(), "yyyy-MM-dd_HH-mm-ss")}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Audit logs exported successfully.",
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setModuleFilter("all");
    setActionFilter("all");
    setUserFilter("all");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const refreshLogs = () => {
    // In a real application, this would fetch fresh data from the server
    toast({
      title: "Logs Refreshed",
      description: "Audit logs have been refreshed with the latest data.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Audit Logs
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor system activities and security events
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshLogs}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredLogs.length}</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {((filteredLogs.filter(l => l.status === "success").length / filteredLogs.length) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredLogs.filter(l => l.status === "success").length} successful
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Events</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {filteredLogs.filter(l => l.status === "failure").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(filteredLogs.map(l => l.userId)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Unique users
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>
            Comprehensive audit trail of all system activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[280px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateFrom ? (
                        dateTo ? (
                          <>
                            {format(dateFrom, "LLL dd, y")} -{" "}
                            {format(dateTo, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateFrom, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3 space-y-3">
                      <div className="space-y-2">
                        <Label>From Date</Label>
                        <Calendar
                          mode="single"
                          selected={dateFrom}
                          onSelect={setDateFrom}
                          initialFocus
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>To Date</Label>
                        <Calendar
                          mode="single"
                          selected={dateTo}
                          onSelect={setDateTo}
                          initialFocus
                        />
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setDateFrom(undefined);
                          setDateTo(undefined);
                        }}
                        className="w-full"
                      >
                        Clear Dates
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button variant="outline" onClick={clearFilters}>
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failure">Failure</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                </SelectContent>
              </Select>

              <Select value={moduleFilter} onValueChange={setModuleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Module" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  {modules.map((module) => (
                    <SelectItem key={module.value} value={module.value}>
                      {module.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  {actions.map((action) => (
                    <SelectItem key={action.value} value={action.value}>
                      {action.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="User" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.value} value={user.value}>
                      {user.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Logs Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {format(log.timestamp, "MMM dd, yyyy HH:mm:ss")}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{log.userName}</div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {log.userRole.replace("_", " ")}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getModuleIcon(log.module)}
                        <span className="font-medium">
                          {log.action.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {log.resource}
                        {log.resourceId && (
                          <span className="ml-1 text-xs">#{log.resourceId}</span>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <Badge variant={getStatusBadgeVariant(log.status)}>
                          {log.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.ipAddress}
                    </TableCell>
                    <TableCell className="text-right">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedLog(log)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Audit Log Details</SheetTitle>
                            <SheetDescription>
                              Complete information about this audit event
                            </SheetDescription>
                          </SheetHeader>
                          {selectedLog && (
                            <div className="mt-6 space-y-4">
                              <div className="grid gap-2">
                                <Label className="text-sm font-medium">Timestamp</Label>
                                <p className="text-sm font-mono">
                                  {format(selectedLog.timestamp, "MMMM dd, yyyy 'at' HH:mm:ss")}
                                </p>
                              </div>
                              <div className="grid gap-2">
                                <Label className="text-sm font-medium">User Information</Label>
                                <div className="text-sm space-y-1">
                                  <p><strong>Name:</strong> {selectedLog.userName}</p>
                                  <p><strong>Role:</strong> {selectedLog.userRole}</p>
                                  <p><strong>User ID:</strong> {selectedLog.userId}</p>
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <Label className="text-sm font-medium">Action Details</Label>
                                <div className="text-sm space-y-1">
                                  <p><strong>Action:</strong> {selectedLog.action}</p>
                                  <p><strong>Resource:</strong> {selectedLog.resource}</p>
                                  {selectedLog.resourceId && (
                                    <p><strong>Resource ID:</strong> {selectedLog.resourceId}</p>
                                  )}
                                  <p><strong>Module:</strong> {selectedLog.module}</p>
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <Label className="text-sm font-medium">Status</Label>
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(selectedLog.status)}
                                  <Badge variant={getStatusBadgeVariant(selectedLog.status)}>
                                    {selectedLog.status}
                                  </Badge>
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <Label className="text-sm font-medium">Technical Details</Label>
                                <div className="text-sm space-y-1">
                                  <p><strong>IP Address:</strong> {selectedLog.ipAddress}</p>
                                  <p><strong>Session ID:</strong> {selectedLog.sessionId}</p>
                                  <p className="text-xs text-muted-foreground">
                                    <strong>User Agent:</strong> {selectedLog.userAgent}
                                  </p>
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <Label className="text-sm font-medium">Description</Label>
                                <p className="text-sm p-3 bg-muted rounded-md">
                                  {selectedLog.details}
                                </p>
                              </div>
                            </div>
                          )}
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No audit logs found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
