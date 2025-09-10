import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Activity,
  Heart,
  Thermometer,
  Droplets,
  AlertCircle,
  FileText,
  Clock,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Mock patient data - in production this would come from API
const mockPatients = [
  {
    id: "KTH-2508-00123-4",
    name: "Kamal Fernando",
    age: 45,
    gender: "Male",
    bloodType: "O+",
    phone: "+94 77 123 4567",
    email: "kamal.fernando@email.com",
    address: "123 Galle Road, Colombo 03",
    admissionDate: "2024-12-20",
    ward: "ICU-05",
    doctor: "Dr. Priyanka Silva",
    condition: "Post-operative monitoring",
    status: "Critical",
    vitals: {
      bloodPressure: "140/90",
      heartRate: "95 bpm",
      temperature: "38.2°C",
      oxygenSaturation: "94%",
      respiratoryRate: "22/min",
    },
    medications: [
      { name: "Paracetamol", dosage: "500mg", frequency: "Every 6 hours" },
      { name: "Amoxicillin", dosage: "250mg", frequency: "Every 8 hours" },
      { name: "Insulin", dosage: "10 units", frequency: "Before meals" },
    ],
    allergies: ["Penicillin", "Shellfish"],
    medicalHistory: [
      "Diabetes Type 2 (2018)",
      "Hypertension (2020)",
      "Appendectomy (2024)",
    ],
    lastVisit: "2024-12-20",
    nextAppointment: "2024-12-25",
    emergencyContact: {
      name: "Sita Fernando",
      relationship: "Spouse",
      phone: "+94 77 987 6543",
    },
  },
  {
    id: "KTH-2508-00089-1",
    name: "Sita Jayawardena",
    age: 62,
    gender: "Female",
    bloodType: "A-",
    phone: "+94 71 456 7890",
    email: "sita.jayawardena@email.com",
    address: "456 Kandy Road, Peradeniya",
    admissionDate: "2024-12-18",
    ward: "W02-15",
    doctor: "Dr. Ravindra Kumar",
    condition: "Cardiac arrhythmia",
    status: "Stable",
    vitals: {
      bloodPressure: "160/100",
      heartRate: "120 bpm",
      temperature: "37.8°C",
      oxygenSaturation: "91%",
      respiratoryRate: "20/min",
    },
    medications: [
      { name: "Metoprolol", dosage: "50mg", frequency: "Twice daily" },
      { name: "Aspirin", dosage: "75mg", frequency: "Once daily" },
      { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily" },
    ],
    allergies: ["None known"],
    medicalHistory: [
      "Hypertension (2015)",
      "High Cholesterol (2017)",
      "Atrial Fibrillation (2024)",
    ],
    lastVisit: "2024-12-18",
    nextAppointment: "2024-12-23",
    emergencyContact: {
      name: "Anura Jayawardena",
      relationship: "Son",
      phone: "+94 77 111 2222",
    },
  },
  {
    id: "KTH-2508-00067-8",
    name: "Ravi Kumar",
    age: 35,
    gender: "Male",
    bloodType: "B+",
    phone: "+94 76 789 0123",
    email: "ravi.kumar@email.com",
    address: "789 Main Street, Matara",
    admissionDate: "2024-12-19",
    ward: "W01-08",
    doctor: "Dr. Nayani Perera",
    condition: "Respiratory infection",
    status: "Recovering",
    vitals: {
      bloodPressure: "130/85",
      heartRate: "88 bpm",
      temperature: "37.5°C",
      oxygenSaturation: "89%",
      respiratoryRate: "24/min",
    },
    medications: [
      { name: "Azithromycin", dosage: "500mg", frequency: "Once daily" },
      { name: "Salbutamol", dosage: "2 puffs", frequency: "Every 4 hours" },
      { name: "Prednisolone", dosage: "10mg", frequency: "Once daily" },
    ],
    allergies: ["Latex"],
    medicalHistory: ["Asthma (2010)", "Pneumonia (2022)"],
    lastVisit: "2024-12-19",
    nextAppointment: "2024-12-24",
    emergencyContact: {
      name: "Mala Kumar",
      relationship: "Wife",
      phone: "+94 76 333 4444",
    },
  },
  {
    id: "KTH-2508-00145-2",
    name: "Anura Silva",
    age: 28,
    gender: "Male",
    bloodType: "AB+",
    phone: "+94 75 234 5678",
    email: "anura.silva@email.com",
    address: "321 Hill Street, Kandy",
    admissionDate: "2024-12-21",
    ward: "W03-12",
    doctor: "Dr. Kumari Fernando",
    condition: "Diabetes management",
    status: "Stable",
    vitals: {
      bloodPressure: "125/80",
      heartRate: "72 bpm",
      temperature: "36.8°C",
      oxygenSaturation: "98%",
      respiratoryRate: "16/min",
    },
    medications: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
      { name: "Insulin glargine", dosage: "20 units", frequency: "Once daily" },
    ],
    allergies: ["None known"],
    medicalHistory: ["Type 1 Diabetes (2015)"],
    lastVisit: "2024-12-21",
    nextAppointment: "2024-12-28",
    emergencyContact: {
      name: "Kamani Silva",
      relationship: "Mother",
      phone: "+94 75 555 6666",
    },
  },
  {
    id: "KTH-2508-00178-3",
    name: "Mala Perera",
    age: 55,
    gender: "Female",
    bloodType: "O-",
    phone: "+94 78 345 6789",
    email: "mala.perera@email.com",
    address: "654 Beach Road, Galle",
    admissionDate: "2024-12-17",
    ward: "W04-07",
    doctor: "Dr. Sunil Rathnayake",
    condition: "Post-surgical recovery",
    status: "Recovering",
    vitals: {
      bloodPressure: "135/88",
      heartRate: "78 bpm",
      temperature: "37.1°C",
      oxygenSaturation: "96%",
      respiratoryRate: "18/min",
    },
    medications: [
      { name: "Ibuprofen", dosage: "400mg", frequency: "Every 8 hours" },
      { name: "Omeprazole", dosage: "20mg", frequency: "Once daily" },
      { name: "Cefuroxime", dosage: "750mg", frequency: "Every 12 hours" },
    ],
    allergies: ["Sulfa drugs"],
    medicalHistory: [
      "Gallbladder surgery (2024)",
      "Osteoarthritis (2020)",
      "GERD (2019)",
    ],
    lastVisit: "2024-12-17",
    nextAppointment: "2024-12-26",
    emergencyContact: {
      name: "Nimal Perera",
      relationship: "Husband",
      phone: "+94 78 777 8888",
    },
  },
];

const MedicalRecords: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterWard, setFilterWard] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState<
    (typeof mockPatients)[0] | null
  >(null);

  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      patient.status.toLowerCase() === filterStatus.toLowerCase();

    const matchesWard =
      filterWard === "all" || patient.ward.includes(filterWard);

    return matchesSearch && matchesStatus && matchesWard;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "critical":
        return "destructive";
      case "stable":
        return "default";
      case "recovering":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getVitalStatus = (vital: string, type: string) => {
    // Simple logic to determine if vitals are normal, warning, or critical
    switch (type) {
      case "heartRate": {
        const hr = parseInt(vital);
        if (hr < 60 || hr > 100) return "warning";
        return "normal";
      }
      case "temperature": {
        const temp = parseFloat(vital);
        if (temp > 37.5) return "warning";
        if (temp > 38.5) return "critical";
        return "normal";
      }
      case "oxygenSaturation": {
        const spo2 = parseInt(vital);
        if (spo2 < 95) return "warning";
        if (spo2 < 90) return "critical";
        return "normal";
      }
      default:
        return "normal";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600">
            Comprehensive patient medical information and history
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Records
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Search & Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by patient name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="stable">Stable</SelectItem>
                <SelectItem value="recovering">Recovering</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterWard} onValueChange={setFilterWard}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by ward" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Wards</SelectItem>
                <SelectItem value="ICU">ICU</SelectItem>
                <SelectItem value="W01">Ward 01</SelectItem>
                <SelectItem value="W02">Ward 02</SelectItem>
                <SelectItem value="W03">Ward 03</SelectItem>
                <SelectItem value="W04">Ward 04</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Records ({filteredPatients.length})</CardTitle>
          <CardDescription>
            Current patient list with medical information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Ward</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {patient.bloodType}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {patient.age} / {patient.gender}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{patient.ward}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {patient.condition}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        getStatusColor(patient.status) as
                          | "destructive"
                          | "default"
                          | "secondary"
                          | "outline"
                      }
                    >
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{patient.doctor}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>
                            Medical Record - {selectedPatient?.name}
                          </DialogTitle>
                          <DialogDescription>
                            Comprehensive medical information for patient{" "}
                            {selectedPatient?.id}
                          </DialogDescription>
                        </DialogHeader>

                        {selectedPatient && (
                          <Tabs defaultValue="overview" className="space-y-4">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="overview">
                                Overview
                              </TabsTrigger>
                              <TabsTrigger value="vitals">Vitals</TabsTrigger>
                              <TabsTrigger value="medications">
                                Medications
                              </TabsTrigger>
                              <TabsTrigger value="history">History</TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-4">
                              <div className="grid gap-4 md:grid-cols-2">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex items-center">
                                      <User className="h-5 w-5 mr-2" />
                                      Patient Information
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="font-medium">Name:</span>
                                      <span>{selectedPatient.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="font-medium">
                                        Patient ID:
                                      </span>
                                      <span>{selectedPatient.id}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="font-medium">Age:</span>
                                      <span>{selectedPatient.age} years</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="font-medium">
                                        Gender:
                                      </span>
                                      <span>{selectedPatient.gender}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="font-medium">
                                        Blood Type:
                                      </span>
                                      <span>{selectedPatient.bloodType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="font-medium">
                                        Phone:
                                      </span>
                                      <span>{selectedPatient.phone}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="font-medium">
                                        Email:
                                      </span>
                                      <span className="text-sm">
                                        {selectedPatient.email}
                                      </span>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex items-center">
                                      <MapPin className="h-5 w-5 mr-2" />
                                      Current Admission
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="font-medium">Ward:</span>
                                      <Badge variant="outline">
                                        {selectedPatient.ward}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="font-medium">
                                        Doctor:
                                      </span>
                                      <span>{selectedPatient.doctor}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="font-medium">
                                        Condition:
                                      </span>
                                      <span>{selectedPatient.condition}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="font-medium">
                                        Status:
                                      </span>
                                      <Badge
                                        variant={
                                          getStatusColor(
                                            selectedPatient.status,
                                          ) as
                                            | "destructive"
                                            | "default"
                                            | "secondary"
                                            | "outline"
                                        }
                                      >
                                        {selectedPatient.status}
                                      </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="font-medium">
                                        Admission Date:
                                      </span>
                                      <span>
                                        {selectedPatient.admissionDate}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="font-medium">
                                        Next Appointment:
                                      </span>
                                      <span>
                                        {selectedPatient.nextAppointment}
                                      </span>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>

                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center">
                                    <Phone className="h-5 w-5 mr-2" />
                                    Emergency Contact
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid gap-2 md:grid-cols-3">
                                    <div>
                                      <span className="font-medium">Name:</span>
                                      <p>
                                        {selectedPatient.emergencyContact.name}
                                      </p>
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Relationship:
                                      </span>
                                      <p>
                                        {
                                          selectedPatient.emergencyContact
                                            .relationship
                                        }
                                      </p>
                                    </div>
                                    <div>
                                      <span className="font-medium">
                                        Phone:
                                      </span>
                                      <p>
                                        {selectedPatient.emergencyContact.phone}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>

                            <TabsContent value="vitals" className="space-y-4">
                              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <Card>
                                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                      Blood Pressure
                                    </CardTitle>
                                    <Heart className="h-4 w-4 text-red-500" />
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-2xl font-bold">
                                      {selectedPatient.vitals.bloodPressure}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      mmHg
                                    </p>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                      Heart Rate
                                    </CardTitle>
                                    <Activity className="h-4 w-4 text-blue-500" />
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-2xl font-bold">
                                      {selectedPatient.vitals.heartRate}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      beats per minute
                                    </p>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                      Temperature
                                    </CardTitle>
                                    <Thermometer className="h-4 w-4 text-orange-500" />
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-2xl font-bold">
                                      {selectedPatient.vitals.temperature}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      celsius
                                    </p>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                      Oxygen Saturation
                                    </CardTitle>
                                    <Droplets className="h-4 w-4 text-green-500" />
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-2xl font-bold">
                                      {selectedPatient.vitals.oxygenSaturation}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      blood oxygen level
                                    </p>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                      Respiratory Rate
                                    </CardTitle>
                                    <Activity className="h-4 w-4 text-purple-500" />
                                  </CardHeader>
                                  <CardContent>
                                    <div className="text-2xl font-bold">
                                      {selectedPatient.vitals.respiratoryRate}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                      breaths per minute
                                    </p>
                                  </CardContent>
                                </Card>
                              </div>
                            </TabsContent>

                            <TabsContent
                              value="medications"
                              className="space-y-4"
                            >
                              <div className="grid gap-4">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex items-center">
                                      <FileText className="h-5 w-5 mr-2" />
                                      Current Medications
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-3">
                                      {selectedPatient.medications.map(
                                        (
                                          med: {
                                            name: string;
                                            dosage: string;
                                            frequency: string;
                                          },
                                          index: number,
                                        ) => (
                                          <div
                                            key={index}
                                            className="flex items-center justify-between p-3 border rounded-lg"
                                          >
                                            <div>
                                              <p className="font-medium">
                                                {med.name}
                                              </p>
                                              <p className="text-sm text-muted-foreground">
                                                {med.dosage} - {med.frequency}
                                              </p>
                                            </div>
                                            <Badge variant="outline">
                                              Active
                                            </Badge>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle className="flex items-center">
                                      <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                                      Allergies
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedPatient.allergies.map(
                                        (allergy: string, index: number) => (
                                          <Badge
                                            key={index}
                                            variant="destructive"
                                          >
                                            {allergy}
                                          </Badge>
                                        ),
                                      )}
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </TabsContent>

                            <TabsContent value="history" className="space-y-4">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="flex items-center">
                                    <Clock className="h-5 w-5 mr-2" />
                                    Medical History
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    {selectedPatient.medicalHistory.map(
                                      (history: string, index: number) => (
                                        <div
                                          key={index}
                                          className="flex items-center space-x-3 p-3 border rounded-lg"
                                        >
                                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                          <span>{history}</span>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </CardContent>
                              </Card>

                              <div className="grid gap-4 md:grid-cols-2">
                                <Card>
                                  <CardHeader>
                                    <CardTitle>Visit Timeline</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="font-medium">
                                          Last Visit:
                                        </span>
                                        <span>{selectedPatient.lastVisit}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="font-medium">
                                          Admission Date:
                                        </span>
                                        <span>
                                          {selectedPatient.admissionDate}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="font-medium">
                                          Next Appointment:
                                        </span>
                                        <span>
                                          {selectedPatient.nextAppointment}
                                        </span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>

                                <Card>
                                  <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-2">
                                      <div className="flex items-center space-x-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                          {selectedPatient.address}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                          {selectedPatient.phone}
                                        </span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                          {selectedPatient.email}
                                        </span>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </TabsContent>
                          </Tabs>
                        )}
                      </DialogContent>
                    </Dialog>
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

export default MedicalRecords;
