import React from "react";
import {
  Users,
  BedDouble,
  Activity,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Calendar,
  Clock,
  Building2,
  UserCheck,
  Heart,
  Clipboard,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock data for charts
const admissionTrends = [
  { month: "Jan", admissions: 156, discharges: 142, revenue: 2400000 },
  { month: "Feb", admissions: 178, discharges: 165, revenue: 2780000 },
  { month: "Mar", admissions: 164, discharges: 158, revenue: 2650000 },
  { month: "Apr", admissions: 189, discharges: 175, revenue: 2980000 },
  { month: "May", admissions: 203, discharges: 192, revenue: 3200000 },
  { month: "Jun", admissions: 195, discharges: 188, revenue: 3100000 },
];

const departmentStats = [
  { department: "Medicine", patients: 45, utilization: 89 },
  { department: "Surgery", patients: 38, utilization: 76 },
  { department: "Pediatrics", patients: 28, utilization: 82 },
  { department: "Orthopedics", patients: 35, utilization: 87 },
  { department: "ICU", patients: 18, utilization: 90 },
  { department: "Emergency", patients: 62, utilization: 95 },
];

const staffDistribution = [
  { name: "Doctors", value: 45, color: "#3b82f6" },
  { name: "Nurses", value: 128, color: "#10b981" },
  { name: "Admin Staff", value: 32, color: "#f59e0b" },
  { name: "Support Staff", value: 67, color: "#8b5cf6" },
];

const dailyActivities = [
  { time: "06:00", admissions: 2, discharges: 1, emergencies: 3 },
  { time: "08:00", admissions: 5, discharges: 3, emergencies: 4 },
  { time: "10:00", admissions: 8, discharges: 6, emergencies: 2 },
  { time: "12:00", admissions: 12, discharges: 8, emergencies: 5 },
  { time: "14:00", admissions: 15, discharges: 12, emergencies: 3 },
  { time: "16:00", admissions: 18, discharges: 15, emergencies: 6 },
  { time: "18:00", admissions: 14, discharges: 18, emergencies: 4 },
  { time: "20:00", admissions: 8, discharges: 10, emergencies: 7 },
  { time: "22:00", admissions: 4, discharges: 6, emergencies: 5 },
];

const systemAlerts = [
  {
    id: 1,
    type: "critical",
    message: "ICU capacity at 95% - immediate attention required",
    time: "5 minutes ago",
    department: "ICU",
  },
  {
    id: 2,
    type: "warning",
    message: "Pharmacy inventory low for critical medications",
    time: "15 minutes ago",
    department: "Pharmacy",
  },
  {
    id: 3,
    type: "info",
    message: "Monthly report generation completed",
    time: "1 hour ago",
    department: "Administration",
  },
  {
    id: 4,
    type: "warning",
    message: "Staff shortage in night shift - Pediatrics ward",
    time: "2 hours ago",
    department: "HR",
  },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Hospital Administration Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive system overview and analytics
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            System Operational
          </Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bed Occupancy</CardTitle>
            <BedDouble className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-muted-foreground">
              156/180 beds occupied
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
            <UserCheck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">272</div>
            <p className="text-xs text-muted-foreground">On duty today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">4</div>
            <p className="text-xs text-muted-foreground">
              2 critical, 2 warnings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Stay</CardTitle>
            <Clock className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">4.2</div>
            <p className="text-xs text-muted-foreground">days per patient</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Admission Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Admission Trends</CardTitle>
            <CardDescription>
              Admissions vs Discharges over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={admissionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="admissions"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="discharges"
                  stackId="2"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Staff Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Staff Distribution</CardTitle>
            <CardDescription>Current workforce allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={staffDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {staffDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Department Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Department Utilization</CardTitle>
            <CardDescription>
              Current patient load and capacity utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="department"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#3b82f6" name="Patients" />
                <Bar
                  dataKey="utilization"
                  fill="#10b981"
                  name="Utilization %"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Daily Activity Pattern */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Activity Pattern</CardTitle>
            <CardDescription>
              Admissions, discharges, and emergencies by hour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyActivities}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="admissions"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Admissions"
                />
                <Line
                  type="monotone"
                  dataKey="discharges"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Discharges"
                />
                <Line
                  type="monotone"
                  dataKey="emergencies"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Emergencies"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* System Alerts */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>System Alerts & Notifications</CardTitle>
            <CardDescription>
              Real-time system status and important updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start space-x-3 p-3 rounded-lg border"
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === "critical"
                      ? "bg-red-500"
                      : alert.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <Badge
                      variant={
                        alert.type === "critical"
                          ? "destructive"
                          : alert.type === "warning"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {alert.department}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Statistics</CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Emergency Response Time</span>
                <span className="text-green-600 font-bold">3.2 min</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Patient Satisfaction</span>
                <span className="text-blue-600 font-bold">4.8/5</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Equipment Utilization</span>
                <span className="text-purple-600 font-bold">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Staff Efficiency</span>
                <span className="text-yellow-600 font-bold">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-red-500" />
                  Critical Patients
                </span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Clipboard className="w-4 h-4 mr-2 text-blue-500" />
                  Pending Reports
                </span>
                <span className="font-bold">8</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2 text-green-500" />
                  Available Rooms
                </span>
                <span className="font-bold">24</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
