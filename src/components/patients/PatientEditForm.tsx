import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  User,
  Calendar,
  Phone,
  MapPin,
  Camera,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Save,
  X,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Alert, AlertDescription } from "../ui/alert";
import { Patient } from "../../types";

// Form validation schema
const patientEditSchema = z.object({
  // Demographics
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  nic: z.string().regex(/^(?:\d{9}[vVxX]|\d{12})$/, "Invalid NIC format"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]),

  // Address
  addressLine1: z.string().min(5, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  district: z.string().min(2, "District is required"),

  // Contact
  phone: z
    .string()
    .regex(/^\+94\d{9}$/, "Phone number must be in +94XXXXXXXXX format"),
  emergencyName: z.string().min(2, "Emergency contact name is required"),
  emergencyRelationship: z.string().min(2, "Relationship is required"),
  emergencyPhone: z
    .string()
    .regex(/^\+94\d{9}$/, "Phone number must be in +94XXXXXXXXX format"),

  // Medical
  allergies: z.string().optional(),
  chronicConditions: z.string().optional(),

  // Photo
  photo: z.any().optional(),
});

type PatientEditFormData = z.infer<typeof patientEditSchema>;

const steps = [
  { id: 1, title: "Demographics", description: "Basic patient information" },
  { id: 2, title: "Address & Contact", description: "Location and contact details" },
  { id: 3, title: "Medical & Photo", description: "Medical history and photo" },
];

const sriLankanDistricts = [
  "Ampara",
  "Anuradhapura",
  "Badulla",
  "Batticaloa",
  "Colombo",
  "Galle",
  "Gampaha",
  "Hambantota",
  "Jaffna",
  "Kalutara",
  "Kandy",
  "Kegalle",
  "Kilinochchi",
  "Kurunegala",
  "Mannar",
  "Matale",
  "Matara",
  "Monaragala",
  "Mullaitivu",
  "Nuwara Eliya",
  "Polonnaruwa",
  "Puttalam",
  "Ratnapura",
  "Trincomalee",
  "Vavuniya",
];

const relationships = [
  "Father",
  "Mother",
  "Guardian",
  "Spouse",
  "Sibling",
  "Grandparent",
  "Other",
];

interface PatientEditFormProps {
  patient: Patient;
  onSave: (updatedPatient: Partial<Patient>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function PatientEditForm({
  patient,
  onSave,
  onCancel,
  isLoading = false,
}: PatientEditFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasChanges, setHasChanges] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    patient.photo || null
  );

  const form = useForm<PatientEditFormData>({
    resolver: zodResolver(patientEditSchema),
    defaultValues: {
      firstName: patient.name.first,
      lastName: patient.name.last,
      nic: patient.nic,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      addressLine1: patient.address.line1,
      addressLine2: patient.address.line2 || "",
      city: patient.address.city,
      district: patient.address.district,
      phone: patient.contacts.phone,
      emergencyName: patient.contacts.emergency.name,
      emergencyRelationship: patient.contacts.emergency.relationship,
      emergencyPhone: patient.contacts.emergency.phone,
      allergies: patient.allergies?.join(", ") || "",
      chronicConditions: patient.chronicConditions?.join(", ") || "",
    },
  });

  // Watch for form changes
  useEffect(() => {
    const subscription = form.watch(() => {
      setHasChanges(true);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const calculateAge = (dateOfBirth: string): number => {
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

  const nextStep = async () => {
    let fieldsToValidate: (keyof PatientEditFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ["firstName", "lastName", "nic", "dateOfBirth", "gender"];
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "addressLine1",
        "city",
        "district",
        "phone",
        "emergencyName",
        "emergencyRelationship",
        "emergencyPhone",
      ];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
        form.setValue("photo", file);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: PatientEditFormData) => {
    const updatedPatient: Partial<Patient> = {
      name: {
        first: data.firstName,
        last: data.lastName,
      },
      nic: data.nic,
      dateOfBirth: data.dateOfBirth,
      age: calculateAge(data.dateOfBirth),
      gender: data.gender,
      address: {
        line1: data.addressLine1,
        line2: data.addressLine2 || undefined,
        city: data.city,
        district: data.district,
      },
      contacts: {
        phone: data.phone,
        emergency: {
          name: data.emergencyName,
          relationship: data.emergencyRelationship,
          phone: data.emergencyPhone,
        },
      },
      allergies: data.allergies
        ? data.allergies.split(",").map((a) => a.trim()).filter(Boolean)
        : [],
      chronicConditions: data.chronicConditions
        ? data.chronicConditions.split(",").map((c) => c.trim()).filter(Boolean)
        : [],
      photo: photoPreview || undefined,
      updatedAt: new Date().toISOString(),
    };

    onSave(updatedPatient);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Patient Info Header */}
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <Avatar className="h-16 w-16">
                <AvatarImage src={photoPreview || patient.photo} />
                <AvatarFallback className="text-lg">
                  {patient.name.first[0]}
                  {patient.name.last[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">
                  Editing: {patient.name.first} {patient.name.last}
                </h3>
                <p className="text-gray-600">PID: {patient.pid}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIC Number *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456789V or 123456789012"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center">
                  {form.watch("dateOfBirth") && (
                    <div className="text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 inline mr-1" />
                      Calculated Age: {calculateAge(form.watch("dateOfBirth"))}{" "}
                      years
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address Line 1 *</FormLabel>
                      <FormControl>
                        <Input placeholder="House number and street" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Address Line 2 (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Additional address information" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City/Town *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city or town" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sriLankanDistricts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number *</FormLabel>
                      <FormControl>
                        <Input placeholder="+94712345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div></div>

                <FormField
                  control={form.control}
                  name="emergencyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name of emergency contact" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyRelationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select relationship" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {relationships.map((relationship) => (
                            <SelectItem key={relationship} value={relationship}>
                              {relationship}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emergencyPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Phone *</FormLabel>
                      <FormControl>
                        <Input placeholder="+94712345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Patient Photo
              </h3>
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={photoPreview || patient.photo} />
                  <AvatarFallback className="text-2xl">
                    {form.watch("firstName")?.[0] || patient.name.first[0]}
                    {form.watch("lastName")?.[0] || patient.name.last[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Label htmlFor="photo">Upload New Photo</Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="w-64"
                  />
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG files up to 5MB
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Medical Information
              </h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Known Allergies</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter allergies separated by commas (e.g., Penicillin, Shellfish)"
                          {...field}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="chronicConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chronic Conditions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter chronic conditions separated by commas (e.g., Diabetes, Asthma)"
                          {...field}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {hasChanges && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  You have unsaved changes. Click "Save Changes" to update the patient record.
                </AlertDescription>
              </Alert>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Patient</h1>
          <p className="text-gray-600">Update patient information and details</p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 h-0.5 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex space-x-3">
                  {currentStep < 3 ? (
                    <Button type="button" onClick={nextStep}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading || !hasChanges}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
