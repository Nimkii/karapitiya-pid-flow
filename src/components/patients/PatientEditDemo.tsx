import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PatientEditForm } from "./PatientEditForm";
import { Patient } from "../../types";
import {
  Edit,
  Eye,
  Phone,
  MapPin,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// Demo patient data
const demoPatient: Patient = {
  id: "demo001",
  pid: "KAR240100999",
  name: { first: "Demo", last: "Patient" },
  nic: "200112345678",
  dateOfBirth: "2001-06-15",
  age: 22,
  gender: "female",
  address: {
    line1: "Demo Street 123",
    line2: "Demo Building",
    city: "Demo City",
    district: "Galle",
  },
  contacts: {
    phone: "+94712345678",
    emergency: {
      name: "Demo Contact",
      relationship: "Mother",
      phone: "+94712345679",
    },
  },
  allergies: ["Demo Allergy"],
  chronicConditions: ["Demo Condition"],
  photo: undefined,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
};

export function PatientEditDemo() {
  const [patient, setPatient] = useState<Patient>(demoPatient);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSavePatient = async (updatedPatient: Partial<Patient>) => {
    setIsSaving(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update the patient data
    setPatient((prev) => ({ ...prev, ...updatedPatient }));
    setIsEditing(false);
    setIsSaving(false);
    setLastSaved(new Date().toLocaleTimeString());
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <PatientEditForm
          patient={patient}
          onSave={handleSavePatient}
          onCancel={handleCancelEdit}
          isLoading={isSaving}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Patient Edit Demo
          </h1>
          <p className="text-gray-600">
            Demonstration of the patient edit functionality
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <div className="flex items-center gap-2 text-green-600 text-sm">
              <CheckCircle className="h-4 w-4" />
              Last saved: {lastSaved}
            </div>
          )}
          <Button onClick={handleEditClick} className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit Patient
          </Button>
        </div>
      </div>

      {/* Patient Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={patient.photo} />
              <AvatarFallback className="text-xl">
                {patient.name.first[0]}
                {patient.name.last[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-xl font-semibold">
                  {patient.name.first} {patient.name.last}
                </h3>
                <p className="text-gray-600">PID: {patient.pid}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Age:</span> {patient.age} years
                </div>
                <div>
                  <span className="font-medium">Gender:</span>{" "}
                  <Badge
                    variant="outline"
                    className={
                      patient.gender === "male"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-pink-50 text-pink-700 border-pink-200"
                    }
                  >
                    {patient.gender}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">NIC:</span> {patient.nic}
                </div>
                <div>
                  <span className="font-medium">DOB:</span>{" "}
                  {formatDate(patient.dateOfBirth)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Phone:</span> {patient.contacts.phone}
            </div>
            <div>
              <span className="font-medium">Emergency Contact:</span>
              <div className="ml-4 text-sm">
                <div>{patient.contacts.emergency.name}</div>
                <div className="text-gray-600">
                  {patient.contacts.emergency.relationship} -{" "}
                  {patient.contacts.emergency.phone}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm space-y-1">
              <div>{patient.address.line1}</div>
              {patient.address.line2 && <div>{patient.address.line2}</div>}
              <div>
                {patient.address.city}, {patient.address.district}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Medical Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Medical Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <span className="font-medium">Allergies:</span>
            <div className="mt-1">
              {patient.allergies && patient.allergies.length > 0 ? (
                <div className="flex gap-2 flex-wrap">
                  {patient.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">No known allergies</span>
              )}
            </div>
          </div>
          <div>
            <span className="font-medium">Chronic Conditions:</span>
            <div className="mt-1">
              {patient.chronicConditions && patient.chronicConditions.length > 0 ? (
                <div className="flex gap-2 flex-wrap">
                  {patient.chronicConditions.map((condition, index) => (
                    <Badge key={index} variant="outline">
                      {condition}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">No chronic conditions</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Demo Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              <strong>How to use this demo:</strong>
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>Click the "Edit Patient" button to open the edit form</li>
              <li>Navigate through the 3-step form using Next/Previous buttons</li>
              <li>Make changes to any field you want to update</li>
              <li>Upload a new photo if desired</li>
              <li>Click "Save Changes" on the final step to save</li>
              <li>The form will close and you'll see the updated information</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800">
                <strong>Note:</strong> This is a demonstration. In a real application,
                the data would be saved to a database via API calls.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Code Example */}
      <Card>
        <CardHeader>
          <CardTitle>Integration Example</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
{`// Basic usage in your component
import { PatientEditForm } from './components/patients/PatientEditForm';

function MyComponent() {
  const [patient, setPatient] = useState(patientData);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (updatedPatient) => {
    // Make API call to save data
    const response = await updatePatient(patient.id, updatedPatient);
    setPatient({ ...patient, ...updatedPatient });
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <PatientEditForm
          patient={patient}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <PatientDetails patient={patient} />
      )}
    </div>
  );
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
