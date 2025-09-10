import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PatientEditForm } from "../components/patients/PatientEditForm";
import { Patient } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

// Mock data - in a real app, this would come from an API
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
];

const PatientEditPage = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch patient data
    const fetchPatient = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const foundPatient = mockPatients.find((p) => p.id === patientId);
        if (foundPatient) {
          setPatient(foundPatient);
        } else {
          setError("Patient not found");
        }
      } catch (err) {
        setError("Failed to load patient data");
      } finally {
        setIsLoading(false);
      }
    };

    if (patientId) {
      fetchPatient();
    } else {
      setError("Invalid patient ID");
      setIsLoading(false);
    }
  }, [patientId]);

  const handleSavePatient = async (updatedPatient: Partial<Patient>) => {
    try {
      setIsSaving(true);
      // Simulate API call to save patient data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real app, this would make an API call
      console.log("Saving patient:", updatedPatient);

      // Navigate back to patient search or details page
      navigate("/patients/search", {
        state: {
          message: "Patient updated successfully",
          type: "success"
        }
      });
    } catch (err) {
      setError("Failed to save patient data");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading patient data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}. Please try again or contact support if the problem persists.
            </AlertDescription>
          </Alert>

          <div className="mt-6 text-center">
            <Button onClick={() => navigate("/patients/search")}>
              Return to Patient Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Patient Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested patient could not be found. Please check the patient ID and try again.
          </p>
          <Button onClick={() => navigate("/patients/search")}>
            Return to Patient Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientEditForm
        patient={patient}
        onSave={handleSavePatient}
        onCancel={handleCancel}
        isLoading={isSaving}
      />
    </div>
  );
};

export default PatientEditPage;
