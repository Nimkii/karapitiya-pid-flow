import { useState } from 'react';
import { Search, Filter, Plus, Eye, Edit } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Mock patient data
const mockPatients = [
  {
    pid: 'KTH-2508-00073-6',
    name: 'Nimal Kumara Perera',
    nic: '198456789V',
    age: 45,
    gender: 'Male',
    ward: 'W01',
    bed: '12',
    status: 'admitted',
    admissionDate: '2024-08-28',
    lastVisit: '2024-08-30'
  },
  {
    pid: 'KTH-2508-00045-2', 
    name: 'Kamala Silva',
    nic: '199234567V',
    age: 32,
    gender: 'Female',
    ward: 'W03',
    bed: '08',
    status: 'admitted',
    admissionDate: '2024-08-25',
    lastVisit: '2024-08-30'
  },
  {
    pid: 'KTH-2508-00032-8',
    name: 'Ravi Jayasundara',
    nic: '197812345V', 
    age: 46,
    gender: 'Male',
    ward: null,
    bed: null,
    status: 'discharged',
    admissionDate: '2024-08-20',
    lastVisit: '2024-08-28'
  },
  {
    pid: 'KTH-2508-00089-4',
    name: 'Sandya Mendis',
    nic: '200156789V',
    age: 23,
    gender: 'Female',
    ward: 'W05',
    bed: '03',
    status: 'admitted',
    admissionDate: '2024-08-30',
    lastVisit: '2024-08-30'
  },
  {
    pid: 'KTH-2507-00156-9',
    name: 'Mahinda Fernando',
    nic: '196587432V',
    age: 59,
    gender: 'Male',
    ward: null,
    bed: null,
    status: 'registered',
    admissionDate: null,
    lastVisit: '2024-07-15'
  }
];

export function PatientSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [wardFilter, setWardFilter] = useState('all');

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = 
      patient.pid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.nic.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    
    const matchesWard = wardFilter === 'all' || patient.ward === wardFilter;
    
    return matchesSearch && matchesStatus && matchesWard;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'admitted':
        return <Badge className="status-info">Admitted</Badge>;
      case 'discharged':
        return <Badge className="status-success">Discharged</Badge>;
      case 'registered':
        return <Badge className="status-warning">Registered</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Patient Search</h1>
          <p className="text-muted-foreground">
            Find and manage patient records using PID, name, or NIC
          </p>
        </div>
        <Button className="flex items-center gap-2" asChild>
          <a href="/patients/register">
            <Plus className="h-4 w-4" />
            Register New Patient
          </a>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Patients</CardTitle>
          <CardDescription>
            Use filters to find specific patients or browse all records
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by PID, Name, or NIC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="admitted">Admitted</SelectItem>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="discharged">Discharged</SelectItem>
              </SelectContent>
            </Select>

            {/* Ward Filter */}
            <Select value={wardFilter} onValueChange={setWardFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Ward" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Wards</SelectItem>
                <SelectItem value="W01">Ward W01</SelectItem>
                <SelectItem value="W02">Ward W02</SelectItem>
                <SelectItem value="W03">Ward W03</SelectItem>
                <SelectItem value="W04">Ward W04</SelectItem>
                <SelectItem value="W05">Ward W05</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Showing {filteredPatients.length} of {mockPatients.length} patients
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age/Gender</TableHead>
                  <TableHead>Ward/Bed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No patients found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.pid} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-mono text-sm">
                        {patient.pid}
                      </TableCell>
                      <TableCell className="font-medium">
                        {patient.name}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{patient.age} years</div>
                          <div className="text-muted-foreground">{patient.gender}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {patient.ward ? (
                          <div className="text-sm">
                            <div className="font-medium">{patient.ward}-{patient.bed}</div>
                            <div className="text-muted-foreground">Bed {patient.bed}</div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(patient.status)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(patient.lastVisit)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}