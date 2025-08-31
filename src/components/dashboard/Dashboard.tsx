import { 
  Users, 
  BedDouble, 
  ClipboardList, 
  Activity,
  TrendingUp,
  AlertCircle,
  Plus,
  Search
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Mock data - in production this would come from API
const kpiData = {
  registrar_clerk: {
    todayAdmissions: 8,
    pendingRegistrations: 3,
    totalPatients: 247,
    completedToday: 12
  },
  ward_doctor: {
    activePatients: 23,
    pendingOrders: 7,
    completedOrders: 15,
    urgentCases: 2
  },
  nurse: {
    pendingTasks: 12,
    completedTasks: 28,
    criticalAlerts: 1,
    patientsAssigned: 18
  },
  admin: {
    totalAdmissions: 156,
    bedOccupancy: 87,
    activeStaff: 45,
    systemAlerts: 3
  }
};

const wardOccupancy = [
  { ward: 'W01 - Medicine', occupied: 18, total: 20, percentage: 90 },
  { ward: 'W02 - Surgery', occupied: 15, total: 20, percentage: 75 },
  { ward: 'W03 - Pediatrics', occupied: 12, total: 15, percentage: 80 },
  { ward: 'W04 - Orthopedics', occupied: 16, total: 18, percentage: 89 },
  { ward: 'W05 - ICU', occupied: 8, total: 10, percentage: 80 },
];

const recentActivity = [
  {
    id: 1,
    type: 'admission',
    message: 'New admission: Nimal Perera (KTH-2508-00073-6)',
    time: '2 minutes ago',
    priority: 'normal'
  },
  {
    id: 2,
    type: 'urgent',
    message: 'Urgent: Patient in W05-12 needs immediate attention',
    time: '5 minutes ago',
    priority: 'urgent'
  },
  {
    id: 3,
    type: 'discharge',
    message: 'Discharge completed: Kamala Silva (KTH-2508-00045-2)',
    time: '15 minutes ago',
    priority: 'normal'
  },
  {
    id: 4,
    type: 'order',
    message: 'Lab order completed for PID KTH-2508-00032-8',
    time: '30 minutes ago',
    priority: 'normal'
  }
];

interface DashboardProps {
  userRole?: 'admin' | 'registrar_clerk' | 'ward_doctor' | 'nurse';
}

export function Dashboard({ userRole = 'registrar_clerk' }: DashboardProps) {
  const kpis = kpiData[userRole];

  const getQuickActions = () => {
    switch (userRole) {
      case 'registrar_clerk':
        return [
          { label: 'Register Patient', href: '/patients/register', icon: Plus, primary: true },
          { label: 'New Admission', href: '/admissions/new', icon: BedDouble },
          { label: 'Search Patient', href: '/patients', icon: Search }
        ];
      case 'ward_doctor':
        return [
          { label: 'Create Order', href: '/orders/create', icon: ClipboardList, primary: true },
          { label: 'View Patients', href: '/patients', icon: Users },
          { label: 'Search PID', href: '/patients', icon: Search }
        ];
      case 'nurse':
        return [
          { label: 'Task Queue', href: '/orders/tasks', icon: Activity, primary: true },
          { label: 'Patient Care', href: '/patients', icon: Users },
          { label: 'Record Vitals', href: '/records/vitals', icon: ClipboardList }
        ];
      case 'admin':
        return [
          { label: 'User Management', href: '/admin/users', icon: Users, primary: true },
          { label: 'Ward Management', href: '/admin/wards', icon: BedDouble },
          { label: 'View Reports', href: '/admin/reports', icon: TrendingUp }
        ];
      default:
        return [];
    }
  };

  const getRoleKPICards = () => {
    switch (userRole) {
      case 'registrar_clerk':
        const rcKpis = kpiData.registrar_clerk;
        return (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Admissions</CardTitle>
                <BedDouble className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{rcKpis.todayAdmissions}</div>
                <p className="text-xs text-muted-foreground">+2 from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Registrations</CardTitle>
                <AlertCircle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{rcKpis.pendingRegistrations}</div>
                <p className="text-xs text-muted-foreground">Awaiting completion</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rcKpis.totalPatients}</div>
                <p className="text-xs text-muted-foreground">Registered this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                <Activity className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{rcKpis.completedToday}</div>
                <p className="text-xs text-muted-foreground">Registrations & admissions</p>
              </CardContent>
            </Card>
          </>
        );

      case 'ward_doctor':
        const wdKpis = kpiData.ward_doctor;
        return (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{wdKpis.activePatients}</div>
                <p className="text-xs text-muted-foreground">Under your care</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <ClipboardList className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{wdKpis.pendingOrders}</div>
                <p className="text-xs text-muted-foreground">Awaiting completion</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Urgent Cases</CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{wdKpis.urgentCases}</div>
                <p className="text-xs text-muted-foreground">Require attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
                <Activity className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{wdKpis.completedOrders}</div>
                <p className="text-xs text-muted-foreground">Today</p>
              </CardContent>
            </Card>
          </>
        );

      case 'nurse':
        const nurseKpis = kpiData.nurse;
        return (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                <Activity className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">{nurseKpis.pendingTasks}</div>
                <p className="text-xs text-muted-foreground">To be completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{nurseKpis.criticalAlerts}</div>
                <p className="text-xs text-muted-foreground">Immediate attention</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Patients Assigned</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{nurseKpis.patientsAssigned}</div>
                <p className="text-xs text-muted-foreground">Current shift</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
                <Activity className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">{nurseKpis.completedTasks}</div>
                <p className="text-xs text-muted-foreground">Today</p>
              </CardContent>
            </Card>
          </>
        );

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
              variant={action.primary ? 'default' : 'outline'}
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

      <div className="grid gap-6 md:grid-cols-2">
        {/* Ward Occupancy */}
        <Card>
          <CardHeader>
            <CardTitle>Ward Occupancy</CardTitle>
            <CardDescription>Current bed utilization across wards</CardDescription>
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
                <Progress 
                  value={ward.percentage} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest hospital activities and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.priority === 'urgent' ? 'bg-destructive' : 'bg-primary'
                }`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}