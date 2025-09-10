import {
  Users,
  BedDouble,
  ClipboardList,
  Activity,
  TrendingUp,
  AlertCircle,
  Plus,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data - in production this would come from API
const kpiData = {
  registrar_clerk: {
    todayAdmissions: 8,
    pendingRegistrations: 3,
    totalPatients: 247,
    completedToday: 12,
  },
  ward_doctor: {
    activePatients: 23,
    pendingOrders: 7,
    completedOrders: 15,
    urgentCases: 2,
  },
  nurse: {
    pendingTasks: 12,
    completedTasks: 28,
    criticalAlerts: 1,
    patientsAssigned: 18,
  },
  admin: {
    totalAdmissions: 156,
    bedOccupancy: 87,
    activeStaff: 45,
    systemAlerts: 3,
  },
};

const wardOccupancy = [
  { ward: "W01 - Medicine", occupied: 18, total: 20, percentage: 90 },
  { ward: "W02 - Surgery", occupied: 15, total: 20, percentage: 75 },
  { ward: "W03 - Pediatrics", occupied: 12, total: 15, percentage: 80 },
  { ward: "W04 - Orthopedics", occupied: 16, total: 18, percentage: 89 },
  { ward: "W05 - ICU", occupied: 8, total: 10, percentage: 80 },
];

const recentActivity = [
  {
    id: 1,
    type: "admission",
    message: "New admission: Nimal Perera (KTH-2508-00073-6)",
    time: "2 minutes ago",
    priority: "normal",
  },
  {
    id: 2,
    type: "urgent",
    message: "Urgent: Patient in W05-12 needs immediate attention",
    time: "5 minutes ago",
    priority: "urgent",
  },
  {
    id: 3,
    type: "discharge",
    message: "Discharge completed: Kamala Silva (KTH-2508-00045-2)",
    time: "15 minutes ago",
    priority: "normal",
  },
  {
    id: 4,
    type: "order",
    message: "Lab order completed for PID KTH-2508-00032-8",
    time: "30 minutes ago",
    priority: "normal",
  },
];

const criticalPatients = [
  {
    id: 1,
    name: "Kamal Fernando",
    pid: "KTH-2508-00123-4",
    ward: "ICU-05",
    condition: "Post-operative monitoring",
    vitals: { bp: "140/90", hr: "95", temp: "38.2°C", spo2: "94%" },
    status: "critical",
  },
  {
    id: 2,
    name: "Sita Jayawardena",
    pid: "KTH-2508-00089-1",
    ward: "W02-15",
    condition: "Cardiac arrhythmia",
    vitals: { bp: "160/100", hr: "120", temp: "37.8°C", spo2: "91%" },
    status: "urgent",
  },
  {
    id: 3,
    name: "Ravi Kumar",
    pid: "KTH-2508-00067-8",
    ward: "W01-08",
    condition: "Respiratory distress",
    vitals: { bp: "130/85", hr: "88", temp: "37.5°C", spo2: "89%" },
    status: "moderate",
  },
];

const nursingTasks = [
  {
    id: 1,
    patient: "Anura Silva",
    pid: "KTH-2508-00145-2",
    task: "Medication administration - Insulin",
    time: "14:00",
    priority: "high",
    ward: "W03-12",
  },
  {
    id: 2,
    patient: "Mala Perera",
    pid: "KTH-2508-00156-7",
    task: "Vital signs monitoring",
    time: "14:30",
    priority: "normal",
    ward: "W01-05",
  },
  {
    id: 3,
    patient: "Sunil Rathnayake",
    pid: "KTH-2508-00178-3",
    task: "Wound dressing change",
    time: "15:00",
    priority: "high",
    ward: "W02-18",
  },
  {
    id: 4,
    patient: "Nayani Fernando",
    pid: "KTH-2508-00134-8",
    task: "Pre-operative preparation",
    time: "15:30",
    priority: "urgent",
    ward: "W04-07",
  },
];

interface DashboardProps {
  userRole?: "admin" | "registrar_clerk" | "ward_doctor" | "nurse";
}

export function Dashboard({ userRole = "registrar_clerk" }: DashboardProps) {
  const kpis = kpiData[userRole];

  const getQuickActions = () => {
    switch (userRole) {
      case "registrar_clerk":
        return [
          {
            label: "Register Patient",
            href: "/patients/register",
            icon: Plus,
            primary: true,
          },
          { label: "New Admission", href: "/admissions/new", icon: BedDouble },
          { label: "Search Patient", href: "/patients", icon: Search },
        ];
      case "ward_doctor":
        return [
          {
            label: "Create Order",
            href: "/orders/create",
            icon: ClipboardList,
            primary: true,
          },
          { label: "View Patients", href: "/patients", icon: Users },
          { label: "Search PID", href: "/patients", icon: Search },
        ];
      case "nurse":
        return [
          {
            label: "Task Queue",
            href: "/orders/tasks",
            icon: Activity,
            primary: true,
          },
          { label: "Patient Care", href: "/patients", icon: Users },
          {
            label: "Record Vitals",
            href: "/records/vitals",
            icon: ClipboardList,
          },
        ];
      case "admin":
        return [
          {
            label: "User Management",
            href: "/admin/users",
            icon: Users,
            primary: true,
          },
          { label: "Ward Management", href: "/admin/wards", icon: BedDouble },
          { label: "View Reports", href: "/admin/reports", icon: TrendingUp },
        ];
      default:
        return [];
    }
  };

  const getRoleKPICards = () => {
    switch (userRole) {
      case "registrar_clerk": {
        const rcKpis = kpiData.registrar_clerk;
        return (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Admissions
                </CardTitle>
                <BedDouble className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {rcKpis.todayAdmissions}
                </div>
                <p className="text-xs text-muted-foreground">
                  +2 from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Registrations
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {rcKpis.pendingRegistrations}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting completion
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Patients
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rcKpis.totalPatients}</div>
                <p className="text-xs text-muted-foreground">
                  Registered this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Today
                </CardTitle>
                <Activity className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {rcKpis.completedToday}
                </div>
                <p className="text-xs text-muted-foreground">
                  Registrations & admissions
                </p>
              </CardContent>
            </Card>
          </>
        );
      }

      case "ward_doctor": {
        const wdKpis = kpiData.ward_doctor;
        return (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Patients
                </CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {wdKpis.activePatients}
                </div>
                <p className="text-xs text-muted-foreground">Under your care</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Orders
                </CardTitle>
                <ClipboardList className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {wdKpis.pendingOrders}
                </div>
                <p className="text-xs text-muted-foreground">
                  Awaiting completion
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Urgent Cases
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {wdKpis.urgentCases}
                </div>
                <p className="text-xs text-muted-foreground">
                  Require attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Orders
                </CardTitle>
                <Activity className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {wdKpis.completedOrders}
                </div>
                <p className="text-xs text-muted-foreground">Today</p>
              </CardContent>
            </Card>
          </>
        );
      }

      case "nurse": {
        const nurseKpis = kpiData.nurse;
        return (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Tasks
                </CardTitle>
                <Activity className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {nurseKpis.pendingTasks}
                </div>
                <p className="text-xs text-muted-foreground">To be completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Critical Alerts
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {nurseKpis.criticalAlerts}
                </div>
                <p className="text-xs text-muted-foreground">
                  Immediate attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Patients Assigned
                </CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {nurseKpis.patientsAssigned}
                </div>
                <p className="text-xs text-muted-foreground">Current shift</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Tasks
                </CardTitle>
                <Activity className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">
                  {nurseKpis.completedTasks}
                </div>
                <p className="text-xs text-muted-foreground">Today</p>
              </CardContent>
            </Card>
          </>
        );
      }

      default:
        return null;
    }
  };

  const quickActions = getQuickActions();

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant={action.primary ? "default" : "outline"}
              className="h-10"
              asChild
            >
              <a href={action.href}>
                <Icon className="mr-2 h-4 w-4" />
                {action.label}
              </a>
            </Button>
          );
        })}
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {getRoleKPICards()}
      </div>

      {/* Role-specific content */}
      {userRole === "ward_doctor" && (
        <div className="grid gap-6 md:grid-cols-1">
          {/* Critical Patients Monitor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                Critical Patients Monitor
              </CardTitle>
              <CardDescription>
                Patients requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">
                          {patient.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          PID: {patient.pid} | Ward: {patient.ward}
                        </p>
                      </div>
                      <Badge
                        variant={
                          patient.status === "critical"
                            ? "destructive"
                            : patient.status === "urgent"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {patient.condition}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="font-medium">BP:</span>{" "}
                        {patient.vitals.bp}
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="font-medium">HR:</span>{" "}
                        {patient.vitals.hr}
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="font-medium">Temp:</span>{" "}
                        {patient.vitals.temp}
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <span className="font-medium">SpO2:</span>{" "}
                        {patient.vitals.spo2}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {userRole === "nurse" && (
        <div className="grid gap-6 md:grid-cols-1">
          {/* Nursing Task Queue */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-500" />
                Priority Task Queue
              </CardTitle>
              <CardDescription>Upcoming patient care tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nursingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            task.priority === "urgent"
                              ? "bg-red-500"
                              : task.priority === "high"
                                ? "bg-orange-500"
                                : "bg-green-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{task.task}</p>
                          <p className="text-sm text-muted-foreground">
                            {task.patient} (PID: {task.pid}) - {task.ward}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{task.time}</p>
                      <Badge
                        variant={
                          task.priority === "urgent"
                            ? "destructive"
                            : task.priority === "high"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Ward Occupancy */}
        <Card>
          <CardHeader>
            <CardTitle>Ward Occupancy</CardTitle>
            <CardDescription>
              Current bed utilization across wards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {wardOccupancy.map((ward) => (
              <div key={ward.ward} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{ward.ward}</span>
                  <span className="text-muted-foreground">
                    {ward.occupied}/{ward.total}
                  </span>
                </div>
                <Progress value={ward.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest hospital activities and notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    activity.priority === "urgent"
                      ? "bg-destructive"
                      : "bg-primary"
                  }`}
                />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
