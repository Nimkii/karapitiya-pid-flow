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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Search,
  UserPlus,
  Bed,
  Calendar,
  Phone,
  MapPin,
  FileText,
  Check,
  AlertCircle,
  User,
  Clock,
} from "lucide-react";
import { Patient, Ward, Bed as BedType } from "../types";

// Mock data for patients (for search)
const mockPatients: Patient[] = [
  {
    id: "pat004",
    pid: "KAR240100004",
    name: { first: "Dilini", last: "Silva" },
    nic: "201723456789",
    dateOfBirth: "2017-07-12",
    age: 6,
    gender: "female",
    address: {
      line1: "321 Beach Road",
      city: "Hikkaduwa",
      district: "Galle",
    },
    contacts: {
      phone: "+94745678901",
      emergency: {
        name: "Ruwan Silva",
        relationship: "Father",
        phone: "+94745678901",
      },
    },
    allergies: ["Penicillin"],
    chronicConditions: ["Asthma"],
    createdAt: "2024-01-18T09:00:00Z",
    updatedAt: "2024-01-18T09:00:00Z",
  },
  {
    id: "pat005",
    pid: "KAR240100005",
    name: { first: "Kamal", last: "Fernando" },
    nic: "201634567890",
    dateOfBirth: "2016-12-03",
    age: 7,
    gender: "male",
    address: {
      line1: "654 Hill Street",
      city: "Akuressa",
      district: "Matara",
    },
    contacts: {
      phone: "+94756789012",
      emergency: {
        name: "Anoma Fernando",
        relationship: "Mother",
        phone: "+94756789012",
      },
    },
    createdAt: "2024-01-18T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
  },
];

// Mock data for wards
const mockWards: Ward[] = [
  {
    id: "ward001",
    code: "PICU",
    name: "Pediatric ICU",
    totalBeds: 10,
    occupiedBeds: 2,
    department: "Critical Care",
  },
  {
    id: "ward002",
    code: "GP",
    name: "General Pediatrics",
    totalBeds: 20,
    occupiedBeds: 1,
    department: "Pediatrics",
  },
  {
    id: "ward003",
    code: "NICU",
    name: "Neonatal ICU",
    totalBeds: 8,
    occupiedBeds: 0,
    department: "Neonatology",
  },
];

// Mock data for beds
const mockBeds: BedType[] = [
  // PICU beds
  { id: "bed001", wardId: "ward001", number: "A-101", status: "occupied" },
  { id: "bed002", wardId: "ward001", number: "A-102", status: "free" },
  { id: "bed003", wardId: "ward001", number: "A-103", status: "occupied" },
  { id: "bed004", wardId: "ward001", number: "A-104", status: "free" },

  // General Pediatrics beds
  { id: "bed005", wardId: "ward002", number: "B-201", status: "free" },
  { id: "bed006", wardId: "ward002", number: "B-202", status: "free" },
  { id: "bed007", wardId: "ward002", number: "B-203", status: "free" },
  { id: "bed008", wardId: "ward002", number: "B-204", status: "free" },
  { id: "bed009", wardId: "ward002", number: "B-205", status: "occupied" },

  // NICU beds
  { id: "bed010", wardId: "ward003", number: "C-301", status: "free" },
  { id: "bed011", wardId: "ward003", number: "C-302", status: "free" },
  { id: "bed012", wardId: "ward003", number: "C-303", status: "free" },
];

const NewAdmission = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedBed, setSelectedBed] = useState("");
  const [admissionReason, setAdmissionReason] = useState("");
  const [admissionNotes, setAdmissionNotes] = useState("");
  const [admittedBy, setAdmittedBy] = useState("Dr. Samantha Silva");
  const [priority, setPriority] = useState("routine");
  const [isPatientSearchOpen, setIsPatientSearchOpen] = useState(false);
  const [isNewPatientOpen, setIsNewPatientOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // New patient form state
  const [newPatientForm, setNewPatientForm] = useState({
    firstName: "",
    lastName: "",
    nic: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
    allergies: "",
    chronicConditions: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);

  // Filter patients based on search term
  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.name.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.pid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.nic.includes(searchTerm),
  );

  // Get available beds for selected ward
  const availableBeds = mockBeds.filter(
    (bed) => bed.wardId === selectedWard && bed.status === "free",
  );

  // Generate new PID
  const generatePID = () => {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const sequence = Math.floor(Math.random() * 99999)
      .toString()
      .padStart(5, "0");
    return `KAR${year}${month}${sequence}`;
  };

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsPatientSearchOpen(false);
    setSearchTerm("");
  };

  const handleWardChange = (wardId: string) => {
    setSelectedWard(wardId);
    setSelectedBed(""); // Reset bed selection when ward changes
  };

  const handleSubmitAdmission = async () => {
    if (
      !selectedPatient ||
      !selectedWard ||
      !selectedBed ||
      !admissionReason.trim()
    ) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Submitting admission:", {
        patient: selectedPatient,
        ward: selectedWard,
        bed: selectedBed,
        reason: admissionReason,
        notes: admissionNotes,
        admittedBy,
        priority,
      });

      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setSelectedPatient(null);
        setSelectedWard("");
        setSelectedBed("");
        setAdmissionReason("");
        setAdmissionNotes("");
        setPriority("routine");
        setShowSuccess(false);
      }, 3000);
    }, 2000);
  };

  // Handle new patient form input changes
  const handleNewPatientFormChange = (field: string, value: string) => {
    setNewPatientForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 0;
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

  // Validate new patient form
  const validateNewPatientForm = () => {
    const required = [
      "firstName",
      "lastName",
      "nic",
      "dateOfBirth",
      "gender",
      "phone",
      "addressLine1",
      "city",
      "district",
      "emergencyName",
      "emergencyRelationship",
      "emergencyPhone",
    ];

    return required.every(
      (field) =>
        newPatientForm[field as keyof typeof newPatientForm].trim() !== "",
    );
  };

  // Handle new patient registration
  const handleRegisterNewPatient = async () => {
    if (!validateNewPatientForm()) {
      return;
    }

    setIsRegistering(true);

    // Simulate API call
    setTimeout(() => {
      const newPID = generatePID();
      const newPatient: Patient = {
        id: `pat_${Date.now()}`,
        pid: newPID,
        name: {
          first: newPatientForm.firstName,
          last: newPatientForm.lastName,
        },
        nic: newPatientForm.nic,
        dateOfBirth: newPatientForm.dateOfBirth,
        age: calculateAge(newPatientForm.dateOfBirth),
        gender: newPatientForm.gender as "male" | "female" | "other",
        address: {
          line1: newPatientForm.addressLine1,
          line2: newPatientForm.addressLine2,
          city: newPatientForm.city,
          district: newPatientForm.district,
        },
        contacts: {
          phone: newPatientForm.phone,
          emergency: {
            name: newPatientForm.emergencyName,
            relationship: newPatientForm.emergencyRelationship,
            phone: newPatientForm.emergencyPhone,
          },
        },
        allergies: newPatientForm.allergies
          ? newPatientForm.allergies.split(",").map((a) => a.trim())
          : [],
        chronicConditions: newPatientForm.chronicConditions
          ? newPatientForm.chronicConditions.split(",").map((c) => c.trim())
          : [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add to mock patients array
      mockPatients.push(newPatient);

      // Select the new patient
      setSelectedPatient(newPatient);

      // Reset form and close modal
      setNewPatientForm({
        firstName: "",
        lastName: "",
        nic: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        district: "",
        emergencyName: "",
        emergencyRelationship: "",
        emergencyPhone: "",
        allergies: "",
        chronicConditions: "",
      });

      setIsRegistering(false);
      setIsNewPatientOpen(false);
    }, 2000);
  };

  const getBedStatusBadge = (status: string) => {
    switch (status) {
      case "free":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case "occupied":
        return <Badge variant="destructive">Occupied</Badge>;
      case "reserved":
        return <Badge variant="secondary">Reserved</Badge>;
      case "maintenance":
        return <Badge variant="outline">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "stat":
        return <Badge className="bg-red-600 text-white">STAT</Badge>;
      case "routine":
      default:
        return <Badge variant="outline">Routine</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">New Admission</h1>
          <p className="text-gray-600">Admit a new patient to the hospital</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-lg px-3 py-1">
            {mockWards.reduce(
              (acc, ward) => acc + (ward.totalBeds - ward.occupiedBeds),
              0,
            )}{" "}
            Beds Available
          </Badge>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Patient has been successfully admitted! PID: {selectedPatient?.pid}
          </AlertDescription>
        </Alert>
      )}

      {/* Ward Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockWards.map((ward) => (
          <Card key={ward.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{ward.name}</CardTitle>
              <Bed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {ward.totalBeds - ward.occupiedBeds}/{ward.totalBeds}
              </div>
              <p className="text-xs text-muted-foreground">Available beds</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs">
                  <span>Occupancy</span>
                  <span>
                    {Math.round((ward.occupiedBeds / ward.totalBeds) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(ward.occupiedBeds / ward.totalBeds) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Patient Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedPatient ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                Search for an existing patient or register a new one
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => setIsPatientSearchOpen(true)}
                  className="flex-1"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search Existing Patient
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsNewPatientOpen(true)}
                  className="flex-1"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register New Patient
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Selected Patient</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPatient(null)}
                >
                  Change Patient
                </Button>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedPatient.photo} />
                  <AvatarFallback>
                    {selectedPatient.name.first[0]}
                    {selectedPatient.name.last[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">
                    {selectedPatient.name.first} {selectedPatient.name.last}
                  </h4>
                  <p className="text-sm text-gray-600">
                    PID: {selectedPatient.pid} • Age: {selectedPatient.age} •{" "}
                    {selectedPatient.gender}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {selectedPatient.contacts.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {selectedPatient.address.city},{" "}
                      {selectedPatient.address.district}
                    </span>
                  </div>
                  {selectedPatient.allergies &&
                    selectedPatient.allergies.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs font-medium text-red-600">
                          Allergies:{" "}
                        </span>
                        <span className="text-xs text-red-600">
                          {selectedPatient.allergies.join(", ")}
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Admission Form */}
      {selectedPatient && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Admission Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Ward and Bed Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ward">Ward</Label>
                <Select value={selectedWard} onValueChange={handleWardChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ward" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockWards.map((ward) => (
                      <SelectItem key={ward.id} value={ward.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{ward.name}</span>
                          <span className="ml-2 text-xs text-gray-500">
                            {ward.totalBeds - ward.occupiedBeds} available
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bed">Bed</Label>
                <Select
                  value={selectedBed}
                  onValueChange={setSelectedBed}
                  disabled={!selectedWard}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select bed" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBeds.map((bed) => (
                      <SelectItem key={bed.id} value={bed.id}>
                        <div className="flex items-center gap-2">
                          <span>Bed {bed.number}</span>
                          {getBedStatusBadge(bed.status)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Priority and Doctor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="stat">STAT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="admittedBy">Admitted By</Label>
                <Select value={admittedBy} onValueChange={setAdmittedBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Samantha Silva">
                      Dr. Samantha Silva
                    </SelectItem>
                    <SelectItem value="Dr. Kasun Fernando">
                      Dr. Kasun Fernando
                    </SelectItem>
                    <SelectItem value="Dr. Anuja Perera">
                      Dr. Anuja Perera
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Reason for Admission */}
            <div>
              <Label htmlFor="reason">Reason for Admission *</Label>
              <Textarea
                id="reason"
                placeholder="Enter the primary reason for admission..."
                value={admissionReason}
                onChange={(e) => setAdmissionReason(e.target.value)}
                rows={3}
              />
            </div>

            {/* Additional Notes */}
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter any additional notes or observations..."
                value={admissionNotes}
                onChange={(e) => setAdmissionNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Admission Summary */}
            {selectedWard && selectedBed && admissionReason && (
              <div className="border rounded-lg p-4 bg-blue-50">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Admission Summary
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium">Patient:</span>{" "}
                    {selectedPatient.name.first} {selectedPatient.name.last}
                  </div>
                  <div>
                    <span className="font-medium">PID:</span>{" "}
                    {selectedPatient.pid}
                  </div>
                  <div>
                    <span className="font-medium">Ward:</span>{" "}
                    {mockWards.find((w) => w.id === selectedWard)?.name}
                  </div>
                  <div>
                    <span className="font-medium">Bed:</span>{" "}
                    {mockBeds.find((b) => b.id === selectedBed)?.number}
                  </div>
                  <div>
                    <span className="font-medium">Priority:</span>{" "}
                    {getPriorityBadge(priority)}
                  </div>
                  <div>
                    <span className="font-medium">Admitted By:</span>{" "}
                    {admittedBy}
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium">Reason:</span>{" "}
                    {admissionReason}
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setSelectedPatient(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitAdmission}
                disabled={
                  !selectedPatient ||
                  !selectedWard ||
                  !selectedBed ||
                  !admissionReason.trim() ||
                  isSubmitting
                }
              >
                {isSubmitting ? "Processing..." : "Confirm Admission"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Patient Search Modal */}
      <Dialog open={isPatientSearchOpen} onOpenChange={setIsPatientSearchOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Search Patient</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, PID, or NIC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  onClick={() => handlePatientSelect(patient)}
                >
                  <Avatar>
                    <AvatarImage src={patient.photo} />
                    <AvatarFallback>
                      {patient.name.first[0]}
                      {patient.name.last[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">
                      {patient.name.first} {patient.name.last}
                    </div>
                    <div className="text-sm text-gray-500">
                      PID: {patient.pid} • Age: {patient.age} • {patient.gender}
                    </div>
                    <div className="text-xs text-gray-400">
                      {patient.address.city}, {patient.address.district}
                    </div>
                  </div>
                </div>
              ))}
              {filteredPatients.length === 0 && searchTerm && (
                <div className="text-center py-4 text-gray-500">
                  No patients found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Patient Modal */}
      <Dialog open={isNewPatientOpen} onOpenChange={setIsNewPatientOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Register New Patient
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={newPatientForm.firstName}
                      onChange={(e) =>
                        handleNewPatientFormChange("firstName", e.target.value)
                      }
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={newPatientForm.lastName}
                      onChange={(e) =>
                        handleNewPatientFormChange("lastName", e.target.value)
                      }
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nic">NIC Number *</Label>
                    <Input
                      id="nic"
                      value={newPatientForm.nic}
                      onChange={(e) =>
                        handleNewPatientFormChange("nic", e.target.value)
                      }
                      placeholder="Enter NIC number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={newPatientForm.dateOfBirth}
                      onChange={(e) =>
                        handleNewPatientFormChange(
                          "dateOfBirth",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={newPatientForm.gender}
                      onValueChange={(value) =>
                        handleNewPatientFormChange("gender", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={newPatientForm.phone}
                      onChange={(e) =>
                        handleNewPatientFormChange("phone", e.target.value)
                      }
                      placeholder="+94XXXXXXXXX"
                    />
                  </div>
                </div>
                {newPatientForm.dateOfBirth && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">
                      Calculated Age:{" "}
                    </span>
                    <span className="text-sm">
                      {calculateAge(newPatientForm.dateOfBirth)} years old
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="addressLine1">Address Line 1 *</Label>
                  <Input
                    id="addressLine1"
                    value={newPatientForm.addressLine1}
                    onChange={(e) =>
                      handleNewPatientFormChange("addressLine1", e.target.value)
                    }
                    placeholder="House number, street name"
                  />
                </div>
                <div>
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input
                    id="addressLine2"
                    value={newPatientForm.addressLine2}
                    onChange={(e) =>
                      handleNewPatientFormChange("addressLine2", e.target.value)
                    }
                    placeholder="Area, landmark (optional)"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={newPatientForm.city}
                      onChange={(e) =>
                        handleNewPatientFormChange("city", e.target.value)
                      }
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">District *</Label>
                    <Select
                      value={newPatientForm.district}
                      onValueChange={(value) =>
                        handleNewPatientFormChange("district", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Galle">Galle</SelectItem>
                        <SelectItem value="Matara">Matara</SelectItem>
                        <SelectItem value="Hambantota">Hambantota</SelectItem>
                        <SelectItem value="Colombo">Colombo</SelectItem>
                        <SelectItem value="Kalutara">Kalutara</SelectItem>
                        <SelectItem value="Ratnapura">Ratnapura</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyName">Contact Name *</Label>
                    <Input
                      id="emergencyName"
                      value={newPatientForm.emergencyName}
                      onChange={(e) =>
                        handleNewPatientFormChange(
                          "emergencyName",
                          e.target.value,
                        )
                      }
                      placeholder="Emergency contact name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyRelationship">
                      Relationship *
                    </Label>
                    <Select
                      value={newPatientForm.emergencyRelationship}
                      onValueChange={(value) =>
                        handleNewPatientFormChange(
                          "emergencyRelationship",
                          value,
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Father">Father</SelectItem>
                        <SelectItem value="Mother">Mother</SelectItem>
                        <SelectItem value="Guardian">Guardian</SelectItem>
                        <SelectItem value="Grandparent">Grandparent</SelectItem>
                        <SelectItem value="Sibling">Sibling</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="emergencyPhone">Emergency Phone *</Label>
                    <Input
                      id="emergencyPhone"
                      value={newPatientForm.emergencyPhone}
                      onChange={(e) =>
                        handleNewPatientFormChange(
                          "emergencyPhone",
                          e.target.value,
                        )
                      }
                      placeholder="+94XXXXXXXXX"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Medical Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={newPatientForm.allergies}
                    onChange={(e) =>
                      handleNewPatientFormChange("allergies", e.target.value)
                    }
                    placeholder="Enter known allergies separated by commas (e.g., Penicillin, Peanuts)"
                    rows={2}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple allergies with commas
                  </p>
                </div>
                <div>
                  <Label htmlFor="chronicConditions">Chronic Conditions</Label>
                  <Textarea
                    id="chronicConditions"
                    value={newPatientForm.chronicConditions}
                    onChange={(e) =>
                      handleNewPatientFormChange(
                        "chronicConditions",
                        e.target.value,
                      )
                    }
                    placeholder="Enter chronic conditions separated by commas (e.g., Asthma, Diabetes)"
                    rows={2}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate multiple conditions with commas
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Summary Card */}
            {validateNewPatientForm() && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg text-green-800">
                    Registration Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-green-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <strong>Name:</strong> {newPatientForm.firstName}{" "}
                      {newPatientForm.lastName}
                    </div>
                    <div>
                      <strong>Age:</strong>{" "}
                      {calculateAge(newPatientForm.dateOfBirth)} years
                    </div>
                    <div>
                      <strong>Gender:</strong> {newPatientForm.gender}
                    </div>
                    <div>
                      <strong>NIC:</strong> {newPatientForm.nic}
                    </div>
                    <div>
                      <strong>Phone:</strong> {newPatientForm.phone}
                    </div>
                    <div>
                      <strong>Emergency Contact:</strong>{" "}
                      {newPatientForm.emergencyName} (
                      {newPatientForm.emergencyRelationship})
                    </div>
                  </div>
                  <div className="mt-2">
                    <strong>Address:</strong> {newPatientForm.addressLine1},{" "}
                    {newPatientForm.city}, {newPatientForm.district}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsNewPatientOpen(false)}
                disabled={isRegistering}
              >
                Cancel
              </Button>
              <Button
                onClick={handleRegisterNewPatient}
                disabled={!validateNewPatientForm() || isRegistering}
              >
                {isRegistering ? "Registering..." : "Register Patient"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewAdmission;
