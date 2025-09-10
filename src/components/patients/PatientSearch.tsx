import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Search,
  Filter,
  Users,
  UserCheck,
  Calendar,
  Plus,
  Eye,
  Edit,
  Phone,
  MapPin,
} from "lucide-react";
import { Patient } from "../../types";
import { PatientEditForm } from "./PatientEditForm";

// Mock data for patients - using the proper Patient type structure
const mockPatients: Patient[] = [
  {
    id: "pat001",
    pid: "KAR240100001",
    name: { first: "Amara", last: "Perera" },
    nic: "200012345678",
    dateOfBirth: "2020-05-15",
    age: 3,
    gender: "female",
    address: {
      line1: "123 Main Street",
      city: "Galle",
      district: "Galle",
    },
    contacts: {
      phone: "+94712345678",
      emergency: {
        name: "Nimal Perera",
        relationship: "Father",
        phone: "+94712345678",
      },
    },
    allergies: ["Penicillin"],
    chronicConditions: [],
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:30:00Z",
  },
  {
    id: "pat002",
    pid: "KAR240100002",
    name: { first: "Sahan", last: "Wickramasinghe" },
    nic: "201856789012",
    dateOfBirth: "2018-03-22",
    age: 5,
    gender: "male",
    address: {
      line1: "456 Lake Road",
      city: "Matara",
      district: "Matara",
    },
    contacts: {
      phone: "+94723456789",
      emergency: {
        name: "Sunil Wickramasinghe",
        relationship: "Father",
        phone: "+94723456789",
      },
    },
    allergies: [],
    chronicConditions: ["Asthma"],
    createdAt: "2024-01-16T14:00:00Z",
    updatedAt: "2024-01-16T14:15:00Z",
  },
  {
    id: "pat003",
    pid: "KAR240100003",
    name: { first: "Kavindi", last: "Rajapaksha" },
    nic: "201534567890",
    dateOfBirth: "2015-11-08",
    age: 8,
    gender: "female",
    address: {
      line1: "789 Temple Road",
      city: "Kamburupitiya",
      district: "Matara",
    },
    contacts: {
      phone: "+94734567890",
      emergency: {
        name: "Chamali Rajapaksha",
        relationship: "Mother",
        phone: "+94734567890",
      },
    },
    allergies: [],
    chronicConditions: [],
    createdAt: "2024-01-17T10:30:00Z",
    updatedAt: "2024-01-17T10:45:00Z",
  },
  {
    id: "pat004",
    pid: "KAR240100004",
    name: { first: "Thilina", last: "Silva" },
    nic: "201712345678",
    dateOfBirth: "2017-07-12",
    age: 6,
    gender: "male",
    address: {
      line1: "321 Beach Road",
      city: "Hikkaduwa",
      district: "Galle",
    },
    contacts: {
      phone: "+94745678901",
      emergency: {
        name: "Priya Silva",
        relationship: "Mother",
        phone: "+94745678901",
      },
    },
    allergies: ["Shellfish"],
    chronicConditions: [],
    createdAt: "2024-01-18T09:15:00Z",
    updatedAt: "2024-01-18T09:30:00Z",
  },
  {
    id: "pat005",
    pid: "KAR240100005",
    name: { first: "Nethmini", last: "Fernando" },
    nic: "201934567890",
    dateOfBirth: "2019-12-03",
    age: 4,
    gender: "female",
    address: {
      line1: "654 Hill Street",
      city: "Deniyaya",
      district: "Matara",
    },
    contacts: {
      phone: "+94756789012",
      emergency: {
        name: "Roshan Fernando",
        relationship: "Father",
        phone: "+94756789012",
      },
    },
    allergies: [],
    chronicConditions: ["Diabetes Type 1"],
    createdAt: "2024-01-19T11:20:00Z",
    updatedAt: "2024-01-19T11:35:00Z",
  },
];

export function PatientSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(mockPatients);

  // Filter patients based on search term, gender, and district
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.name.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.pid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.nic.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGender =
      selectedGender === "all" || patient.gender === selectedGender;
    const matchesDistrict =
      selectedDistrict === "all" ||
      patient.address.district === selectedDistrict;

    return matchesSearch && matchesGender && matchesDistrict;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const getGenderBadge = (gender: string) => {
    switch (gender) {
      case "male":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Male
          </Badge>
        );
      case "female":
        return (
          <Badge
            variant="outline"
            className="bg-pink-50 text-pink-700 border-pink-200"
          >
            Female
          </Badge>
        );
      default:
        return <Badge variant="secondary">{gender}</Badge>;
    }
  };

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailsOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditOpen(true);
  };

  const handleSavePatient = (updatedPatient: Partial<Patient>) => {
    if (selectedPatient) {
      const updatedPatients = patients.map((p) =>
        p.id === selectedPatient.id ? { ...p, ...updatedPatient } : p,
      );
      setPatients(updatedPatients);
      setIsEditOpen(false);
      setSelectedPatient(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditOpen(false);
    setSelectedPatient(null);
  };

  // Get unique districts for filter
  const uniqueDistricts = [...new Set(patients.map((p) => p.address.district))];

  return (
    <div className="container mx-auto flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Search</h1>
          <p className="text-gray-600">Search and manage patient records</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-lg px-3 py-1">
            {filteredPatients.length} Patients
          </Badge>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Register New Patient
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{patients.length}</div>
            <p className="text-xs text-muted-foreground">Registered patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Male Patients</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patients.filter((p) => p.gender === "male").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (patients.filter((p) => p.gender === "male").length /
                  patients.length) *
                  100,
              )}
              % of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Female Patients
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {patients.filter((p) => p.gender === "female").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (patients.filter((p) => p.gender === "female").length /
                  patients.length) *
                  100,
              )}
              % of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Age</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                patients.reduce((acc, p) => acc + p.age, 0) / patients.length ||
                  0,
              )}{" "}
              years
            </div>
            <p className="text-xs text-muted-foreground">All patients</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by patient name, PID, or NIC..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedGender} onValueChange={setSelectedGender}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={selectedDistrict}
              onValueChange={setSelectedDistrict}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {uniqueDistricts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>PID</TableHead>
                <TableHead>NIC</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={patient.photo} />
                        <AvatarFallback>
                          {patient.name.first[0]}
                          {patient.name.last[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {patient.name.first} {patient.name.last}
                        </div>
                        <div className="text-sm text-gray-500">
                          {patient.address.city}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {patient.pid}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {patient.nic}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{patient.age} years</span>
                      {getGenderBadge(patient.gender)}
                    </div>
                  </TableCell>
                  <TableCell>{patient.address.district}</TableCell>
                  <TableCell className="text-sm">
                    {patient.contacts.phone}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(patient.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(patient)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPatient(patient)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No patients found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>

      {/* Patient Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-6">
              {/* Patient Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Patient Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={selectedPatient.photo} />
                        <AvatarFallback className="text-lg">
                          {selectedPatient.name.first[0]}
                          {selectedPatient.name.last[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {selectedPatient.name.first}{" "}
                          {selectedPatient.name.last}
                        </h3>
                        <p className="text-gray-600">
                          PID: {selectedPatient.pid}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium">Age:</span>{" "}
                        {selectedPatient.age} years
                      </div>
                      <div>
                        <span className="font-medium">Gender:</span>{" "}
                        {selectedPatient.gender}
                      </div>
                      <div>
                        <span className="font-medium">DOB:</span>{" "}
                        {formatDate(selectedPatient.dateOfBirth)}
                      </div>
                      <div>
                        <span className="font-medium">NIC:</span>{" "}
                        {selectedPatient.nic}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedPatient.contacts.phone}
                    </div>
                    <div>
                      <span className="font-medium">Emergency Contact:</span>
                      <div className="ml-4 text-sm">
                        <div>{selectedPatient.contacts.emergency.name}</div>
                        <div className="text-gray-600">
                          {selectedPatient.contacts.emergency.relationship} -{" "}
                          {selectedPatient.contacts.emergency.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1 text-gray-600" />
                      <div className="text-sm">
                        <div>{selectedPatient.address.line1}</div>
                        {selectedPatient.address.line2 && (
                          <div>{selectedPatient.address.line2}</div>
                        )}
                        <div>
                          {selectedPatient.address.city},{" "}
                          {selectedPatient.address.district}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Medical Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-medium">Allergies:</span>
                    <div className="mt-1">
                      {selectedPatient.allergies &&
                      selectedPatient.allergies.length > 0 ? (
                        <div className="flex gap-2 flex-wrap">
                          {selectedPatient.allergies.map((allergy, index) => (
                            <Badge key={index} variant="destructive">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">
                          No known allergies
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Chronic Conditions:</span>
                    <div className="mt-1">
                      {selectedPatient.chronicConditions &&
                      selectedPatient.chronicConditions.length > 0 ? (
                        <div className="flex gap-2 flex-wrap">
                          {selectedPatient.chronicConditions.map(
                            (condition, index) => (
                              <Badge key={index} variant="outline">
                                {condition}
                              </Badge>
                            ),
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-500">
                          No chronic conditions
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Registered:</span>{" "}
                      {formatDate(selectedPatient.createdAt)}
                    </div>
                    <div>
                      <span className="font-medium">Last Updated:</span>{" "}
                      {formatDate(selectedPatient.updatedAt)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Patient Form */}
      {isEditOpen && selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center h-screen justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl max-h-[90vh] w-full overflow-auto">
            <PatientEditForm
              patient={selectedPatient}
              onSave={handleSavePatient}
              onCancel={handleCancelEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
}
