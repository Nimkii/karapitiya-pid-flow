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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  Download,
  Calendar as CalendarIcon,
  Users,
  Activity,
  Bed,
  Clock,
  TrendingUp,
  TrendingDown,
  FileText,
  PieChart,
  BarChart,
  LineChart,
  Filter,
  RefreshCw,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ReportData {
  id: string;
  name: string;
  description: string;
  category: "patient" | "ward" | "staff" | "financial" | "operational";
  type: "chart" | "table" | "summary";
  data: Record<string, unknown>;
  lastGenerated: Date;
}

interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "stable";
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<string>("overview");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [reportFilter, setReportFilter] = useState<string>("all");

  const metrics: MetricCard[] = [
    {
      title: "Total Patients",
      value: 1247,
      change: 12.5,
      trend: "up",
      icon: Users,
      description: "Active patients in system",
    },
    {
      title: "Bed Occupancy",
      value: "87.3%",
      change: -2.1,
      trend: "down",
      icon: Bed,
      description: "Overall bed utilization",
    },
    {
      title: "Avg. Stay Duration",
      value: "4.2 days",
      change: 8.3,
      trend: "up",
      icon: Clock,
      description: "Average patient stay",
    },
    {
      title: "Daily Admissions",
      value: 23,
      change: 15.7,
      trend: "up",
      icon: Activity,
      description: "New admissions today",
    },
  ];

  const reports: ReportData[] = [
    {
      id: "patient-demographics",
      name: "Patient Demographics",
      description: "Age distribution and gender breakdown of patients",
      category: "patient",
      type: "chart",
      data: {
        ageGroups: [
          { range: "0-1", count: 45, percentage: 15.2 },
          { range: "1-5", count: 78, percentage: 26.3 },
          { range: "5-10", count: 89, percentage: 30.1 },
          { range: "10-15", count: 64, percentage: 21.6 },
          { range: "15+", count: 20, percentage: 6.8 },
        ],
        gender: [
          { type: "Male", count: 148, percentage: 50.0 },
          { type: "Female", count: 148, percentage: 50.0 },
        ],
      },
      lastGenerated: new Date("2024-01-15T10:00:00"),
    },
    {
      id: "ward-utilization",
      name: "Ward Utilization Report",
      description: "Bed occupancy and capacity analysis by ward",
      category: "ward",
      type: "table",
      data: {
        wards: [
          {
            name: "Pediatric Ward",
            totalBeds: 30,
            occupied: 22,
            rate: 73.3,
            trend: "stable",
          },
          { name: "ICU", totalBeds: 20, occupied: 18, rate: 90.0, trend: "up" },
          {
            name: "General Ward A",
            totalBeds: 40,
            occupied: 28,
            rate: 70.0,
            trend: "down",
          },
          {
            name: "Emergency Ward",
            totalBeds: 15,
            occupied: 8,
            rate: 53.3,
            trend: "stable",
          },
          {
            name: "Maternity Ward",
            totalBeds: 25,
            occupied: 15,
            rate: 60.0,
            trend: "up",
          },
        ],
      },
      lastGenerated: new Date("2024-01-15T09:30:00"),
    },
    {
      id: "admission-trends",
      name: "Admission Trends",
      description: "Daily and monthly admission patterns",
      category: "operational",
      type: "chart",
      data: {
        daily: [
          { date: "Jan 10", admissions: 18, discharges: 15 },
          { date: "Jan 11", admissions: 22, discharges: 20 },
          { date: "Jan 12", admissions: 19, discharges: 17 },
          { date: "Jan 13", admissions: 25, discharges: 18 },
          { date: "Jan 14", admissions: 21, discharges: 23 },
          { date: "Jan 15", admissions: 23, discharges: 19 },
        ],
        monthly: [
          { month: "Sep", admissions: 450, discharges: 445 },
          { month: "Oct", admissions: 478, discharges: 465 },
          { month: "Nov", admissions: 423, discharges: 441 },
          { month: "Dec", admissions: 467, discharges: 456 },
          { month: "Jan", admissions: 378, discharges: 362 },
        ],
      },
      lastGenerated: new Date("2024-01-15T08:45:00"),
    },
    {
      id: "staff-productivity",
      name: "Staff Productivity",
      description: "Staff workload and performance metrics",
      category: "staff",
      type: "summary",
      data: {
        totalStaff: 45,
        activeStaff: 42,
        avgPatientsPerNurse: 8.5,
        avgPatientsPerDoctor: 15.2,
        shiftCoverage: 98.5,
        departments: [
          { name: "Pediatric", staff: 12, patients: 22, ratio: 1.83 },
          { name: "ICU", staff: 8, patients: 18, ratio: 2.25 },
          { name: "General", staff: 15, patients: 28, ratio: 1.87 },
          { name: "Emergency", staff: 10, patients: 8, ratio: 0.8 },
        ],
      },
      lastGenerated: new Date("2024-01-15T07:15:00"),
    },
  ];

  const reportCategories = [
    { value: "all", label: "All Categories" },
    { value: "patient", label: "Patient Reports" },
    { value: "ward", label: "Ward Reports" },
    { value: "staff", label: "Staff Reports" },
    { value: "financial", label: "Financial Reports" },
    { value: "operational", label: "Operational Reports" },
  ];

  const filteredReports = reports.filter(
    (report) => reportFilter === "all" || report.category === reportFilter,
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string, change: number) => {
    if (trend === "up" && change > 0) return "text-green-600";
    if (trend === "down" && change < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case "chart":
        return <BarChart className="h-4 w-4" />;
      case "table":
        return <FileText className="h-4 w-4" />;
      case "summary":
        return <PieChart className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "patient":
        return "bg-blue-100 text-blue-800";
      case "ward":
        return "bg-green-100 text-green-800";
      case "staff":
        return "bg-purple-100 text-purple-800";
      case "financial":
        return "bg-yellow-100 text-yellow-800";
      case "operational":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const generateReport = (reportId: string) => {
    // In a real application, this would trigger report generation
    toast({
      title: "Report Generated",
      description: "The report has been generated and is ready for download.",
    });
  };

  const exportReport = (reportId: string, format: "pdf" | "excel" | "csv") => {
    // In a real application, this would trigger the export process
    toast({
      title: "Export Started",
      description: `Report is being exported as ${format.toUpperCase()}. You'll be notified when ready.`,
    });
  };

  const scheduleReport = (reportId: string) => {
    // In a real application, this would open a scheduling dialog
    toast({
      title: "Schedule Report",
      description: "Report scheduling feature will be available soon.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8" />
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive reporting and data analysis dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
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
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {getTrendIcon(metric.trend)}
                <span
                  className={cn(
                    "ml-1",
                    getTrendColor(metric.trend, metric.change),
                  )}
                >
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}%
                </span>
                <span className="ml-1">from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Categories Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>
                Generate and download comprehensive reports
              </CardDescription>
            </div>
            <Select value={reportFilter} onValueChange={setReportFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {reportCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => (
              <Card
                key={report.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getReportIcon(report.type)}
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                    </div>
                    <Badge className={getCategoryColor(report.category)}>
                      {report.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {report.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-xs text-muted-foreground">
                      Last generated:{" "}
                      {format(report.lastGenerated, "MMM dd, yyyy HH:mm")}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => generateReport(report.id)}
                        className="flex-1"
                      >
                        Generate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => exportReport(report.id, "pdf")}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sample Report Data Display */}
      {selectedReport === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ward Utilization */}
          <Card>
            <CardHeader>
              <CardTitle>Ward Utilization</CardTitle>
              <CardDescription>Current bed occupancy by ward</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(
                  reports.find((r) => r.id === "ward-utilization")?.data
                    .wards as Array<{
                    name: string;
                    totalBeds: number;
                    occupied: number;
                    rate: number;
                    trend: string;
                  }>
                )?.map(
                  (
                    ward: {
                      name: string;
                      totalBeds: number;
                      occupied: number;
                      rate: number;
                      trend: string;
                    },
                    index: number,
                  ) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{ward.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">
                            {ward.occupied}/{ward.totalBeds}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({ward.rate}%)
                          </span>
                          {getTrendIcon(ward.trend)}
                        </div>
                      </div>
                      <Progress value={ward.rate} className="h-2" />
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>

          {/* Staff Productivity */}
          <Card>
            <CardHeader>
              <CardTitle>Staff Distribution</CardTitle>
              <CardDescription>
                Staff-to-patient ratios by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(
                  reports.find((r) => r.id === "staff-productivity")?.data
                    .departments as Array<{
                    name: string;
                    staff: number;
                    patients: number;
                    ratio: number;
                  }>
                )?.map(
                  (
                    dept: {
                      name: string;
                      staff: number;
                      patients: number;
                      ratio: number;
                    },
                    index: number,
                  ) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{dept.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {dept.staff} staff, {dept.patients} patients
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">1:{dept.ratio}</div>
                        <div className="text-sm text-muted-foreground">
                          ratio
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Patient Demographics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Report Activity</CardTitle>
          <CardDescription>
            Summary of recently generated reports and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Generated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(report.category)}>
                      {report.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getReportIcon(report.type)}
                      <span className="capitalize">{report.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(report.lastGenerated, "MMM dd, yyyy HH:mm")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-green-600">
                      Ready
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => exportReport(report.id, "pdf")}
                      >
                        PDF
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => exportReport(report.id, "excel")}
                      >
                        Excel
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => exportReport(report.id, "csv")}
                      >
                        CSV
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
