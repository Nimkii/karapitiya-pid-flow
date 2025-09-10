import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Search,
  Filter,
  UserCheck,
  Clock,
  Calendar,
  Phone,
  MapPin,
  FileText,
  Edit,
  Eye,
} from "lucide-react";
import { Admission, Patient } from "../types";

// Mock data for current admissions
const mockCurrentAdmissions: (Admission & { patient: Patient })[] = [
  {
    id: "adm001",
    patientId: "pat001",
    pid: "KAR240100001",
    wardId: "ward001",
    wardName: "Pediatric ICU",
    bedNumber: "A-101",
    admissionDate: "2024-01-15T08:30:00Z",
    status: "admitted",
    admittedBy: "Dr. Samantha Silva",
    reason: "Pneumonia with respiratory distress",
    notes: "Patient stable, on oxygen support",
    patient: {
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
      createdAt: "2024-01-15T08:00:00Z",
      updatedAt: "2024-01-15T08:30:00Z",
    },
  },
  {
    id: "adm002",
    patientId: "pat002",
    pid: "KAR240100002",
    wardId: "ward002",
    wardName: "General Pediatrics",
    bedNumber: "B-205",
    admissionDate: "2024-01-16T14:15:00Z",
    status: "admitted",
    admittedBy: "Dr. Kasun Fernando",
    reason: "Acute gastroenteritis with dehydration",
    notes: "Improving with IV fluids",
    patient: {
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
      createdAt: "2024-01-16T14:00:00Z",
      updatedAt: "2024-01-16T14:15:00Z",
    },
  },
  {
    id: "adm003",
    patientId: "pat003",
    pid: "KAR240100003",
    wardId: "ward001",
    wardName: "Pediatric ICU",
    bedNumber: "A-103",
    admissionDate: "2024-01-17T10:45:00Z",
    status: "admitted",
    admittedBy: "Dr. Samantha Silva",
    reason: "Post-operative monitoring after appendectomy",
    notes: "Recovering well, vital signs stable",
    patient: {
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
      createdAt: "2024-01-17T10:30:00Z",
      updatedAt: "2024-01-17T10:45:00Z",
    },
  },
];

const CurrentAdmission = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedWard, setSelectedWard] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAdmission, setSelectedAdmission] = useState<
    (Admission & { patient: Patient }) | null
  >(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [newNote, setNewNote] = useState("");

  // Filter admissions based on search term, ward, and status
  const filteredAdmissions = mockCurrentAdmissions.filter((admission) => {
    const matchesSearch =
      admission.patient.name.first
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      admission.patient.name.last
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      admission.pid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.bedNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesWard =
      selectedWard === "all" || admission.wardName === selectedWard;
    const matchesStatus =
      selectedStatus === "all" || admission.status === selectedStatus;

    return matchesSearch && matchesWard && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateDaysAdmitted = (admissionDate: string) => {
    const days = Math.floor(
      (new Date().getTime() - new Date(admissionDate).getTime()) /
        (1000 * 3600 * 24),
    );
    return days;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "admitted":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Admitted
          </Badge>
        );
      case "registered":
        return <Badge variant="secondary">Registered</Badge>;
      case "discharged":
        return <Badge variant="outline">Discharged</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewDetails = (admission: Admission & { patient: Patient }) => {
    setSelectedAdmission(admission);
    setIsDetailsOpen(true);
  };

  const handleAddNote = () => {
    if (newNote.trim() && selectedAdmission) {
      // In a real app, this would make an API call to add the note
      console.log("Adding note:", newNote);
      setNewNote("");
      setIsNotesOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Current Admissions
          </h1>
          <p className="text-gray-600">
            Manage and monitor currently admitted patients
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-lg px-3 py-1">
            {filteredAdmissions.length} Patients
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Admitted
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCurrentAdmissions.length}
            </div>
            <p className="text-xs text-muted-foreground">Active admissions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ICU Patients</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                mockCurrentAdmissions.filter((a) => a.wardName.includes("ICU"))
                  .length
              }
            </div>
            <p className="text-xs text-muted-foreground">Critical care</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Stay</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockCurrentAdmissions.reduce(
                  (acc, a) => acc + calculateDaysAdmitted(a.admissionDate),
                  0,
                ) / mockCurrentAdmissions.length || 0,
              )}{" "}
              days
            </div>
            <p className="text-xs text-muted-foreground">Current patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Admissions
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">New today</p>
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
                  placeholder="Search by patient name, PID, or bed number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedWard} onValueChange={setSelectedWard}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select Ward" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Wards</SelectItem>
                <SelectItem value="Pediatric ICU">Pediatric ICU</SelectItem>
                <SelectItem value="General Pediatrics">
                  General Pediatrics
                </SelectItem>
                <SelectItem value="Neonatal ICU">Neonatal ICU</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="admitted">Admitted</SelectItem>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="discharged">Discharged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Admissions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Admissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>PID</TableHead>
                <TableHead>Ward & Bed</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Admitted By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmissions.map((admission) => (
                <TableRow key={admission.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={admission.patient.photo} />
                        <AvatarFallback>
                          {admission.patient.name.first[0]}
                          {admission.patient.name.last[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {admission.patient.name.first}{" "}
                          {admission.patient.name.last}
                        </div>
                        <div className="text-sm text-gray-500">
                          Age: {admission.patient.age},{" "}
                          {admission.patient.gender}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {admission.pid}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{admission.wardName}</div>
                      <div className="text-sm text-gray-500">
                        Bed {admission.bedNumber}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(admission.admissionDate)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {calculateDaysAdmitted(admission.admissionDate)} days
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(admission.status)}</TableCell>
                  <TableCell className="text-sm">
                    {admission.admittedBy}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(admission)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedAdmission(admission);
                          setIsNotesOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredAdmissions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No admissions found matching your criteria
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
          {selectedAdmission && (
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
                        <AvatarImage src={selectedAdmission.patient.photo} />
                        <AvatarFallback className="text-lg">
                          {selectedAdmission.patient.name.first[0]}
                          {selectedAdmission.patient.name.last[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {selectedAdmission.patient.name.first}{" "}
                          {selectedAdmission.patient.name.last}
                        </h3>
                        <p className="text-gray-600">
                          PID: {selectedAdmission.pid}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium">Age:</span>{" "}
                        {selectedAdmission.patient.age} years
                      </div>
                      <div>
                        <span className="font-medium">Gender:</span>{" "}
                        {selectedAdmission.patient.gender}
                      </div>
                      <div>
                        <span className="font-medium">DOB:</span>{" "}
                        {new Date(
                          selectedAdmission.patient.dateOfBirth,
                        ).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">NIC:</span>{" "}
                        {selectedAdmission.patient.nic}
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
                      {selectedAdmission.patient.contacts.phone}
                    </div>
                    <div>
                      <span className="font-medium">Emergency Contact:</span>
                      <div className="ml-4 text-sm">
                        <div>
                          {selectedAdmission.patient.contacts.emergency.name}
                        </div>
                        <div className="text-gray-600">
                          {
                            selectedAdmission.patient.contacts.emergency
                              .relationship
                          }{" "}
                          - {selectedAdmission.patient.contacts.emergency.phone}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1 text-gray-600" />
                      <div className="text-sm">
                        <div>{selectedAdmission.patient.address.line1}</div>
                        <div>
                          {selectedAdmission.patient.address.city},{" "}
                          {selectedAdmission.patient.address.district}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Admission Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Admission Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="font-medium">Ward:</span>{" "}
                    {selectedAdmission.wardName}
                  </div>
                  <div>
                    <span className="font-medium">Bed Number:</span>{" "}
                    {selectedAdmission.bedNumber}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>{" "}
                    {getStatusBadge(selectedAdmission.status)}
                  </div>
                  <div>
                    <span className="font-medium">Admitted By:</span>{" "}
                    {selectedAdmission.admittedBy}
                  </div>
                  <div>
                    <span className="font-medium">Admission Date:</span>{" "}
                    {formatDate(selectedAdmission.admissionDate)}
                  </div>
                  <div>
                    <span className="font-medium">Days Admitted:</span>{" "}
                    {calculateDaysAdmitted(selectedAdmission.admissionDate)}{" "}
                    days
                  </div>
                  <div className="md:col-span-3">
                    <span className="font-medium">Reason for Admission:</span>
                    <p className="mt-1 text-gray-700">
                      {selectedAdmission.reason}
                    </p>
                  </div>
                  {selectedAdmission.notes && (
                    <div className="md:col-span-3">
                      <span className="font-medium">Notes:</span>
                      <p className="mt-1 text-gray-700">
                        {selectedAdmission.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Notes Modal */}
      <Dialog open={isNotesOpen} onOpenChange={setIsNotesOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                placeholder="Enter your note here..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsNotesOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                Add Note
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CurrentAdmission;
