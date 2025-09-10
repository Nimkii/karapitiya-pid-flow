import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  Mail,
  Phone,
  MapPin,
  Edit,
  Camera,
  Save,
  X,
  Stethoscope,
  Heart,
  Shield,
  UserCog,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
  bio: string;
  avatar: string;
  joinDate: string;
  employeeId: string;
  shift: string;
  specialization: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Generate role-specific profile data
  const generateProfileData = (): UserProfile => {
    const baseEmail = `${user?.username || "user"}@karapitiyahospital.lk`;

    switch (user?.role) {
      case "admin":
        return {
          id: "1",
          name: "System Administrator",
          email: baseEmail,
          phone: "+94 71 234 5678",
          role: "System Administrator",
          department: "Administration",
          location: "Karapitiya Teaching Hospital",
          bio: "Responsible for overall system administration, user management, and hospital operations oversight. Ensuring smooth functioning of the hospital management system.",
          avatar: "",
          joinDate: "2020-01-15",
          employeeId: "KTH-ADM-001",
          shift: "Day Shift",
          specialization: "Hospital Management",
        };
      case "doctor":
        return {
          id: "2",
          name: `Dr. ${user.username}`,
          email: baseEmail,
          phone: "+94 71 345 6789",
          role: "Ward Doctor",
          department: "General Medicine",
          location: "Karapitiya Teaching Hospital - Ward 01",
          bio: "Experienced physician dedicated to providing comprehensive medical care. Specialized in patient diagnosis, treatment planning, and medical order management.",
          avatar: "",
          joinDate: "2021-06-10",
          employeeId: "KTH-DOC-001",
          shift: "Morning",
          specialization: "Internal Medicine",
        };
      case "nurse":
        return {
          id: "3",
          name: `Nurse ${user.username}`,
          email: baseEmail,
          phone: "+94 71 456 7890",
          role: "Registered Nurse",
          department: "Patient Care",
          location: "Karapitiya Teaching Hospital - General Ward",
          bio: "Committed to providing exceptional patient care and support. Responsible for medication administration, vital signs monitoring, and patient comfort.",
          avatar: "",
          joinDate: "2022-03-20",
          employeeId: "KTH-NUR-001",
          shift: "Day Shift",
          specialization: "General Nursing",
        };
      case "registrar":
        return {
          id: "4",
          name: `${user.username}`,
          email: baseEmail,
          phone: "+94 71 567 8901",
          role: "Registrar Clerk",
          department: "Patient Registration",
          location: "Karapitiya Teaching Hospital - Registration Office",
          bio: "Ensuring accurate patient registration and admission processes. Managing patient records and facilitating smooth hospital entry procedures.",
          avatar: "",
          joinDate: "2023-01-08",
          employeeId: "KTH-REG-001",
          shift: "Day Shift",
          specialization: "Patient Registration",
        };
      default:
        return {
          id: "1",
          name: "Hospital Staff",
          email: baseEmail,
          phone: "+94 71 234 5678",
          role: "Staff Member",
          department: "General",
          location: "Karapitiya Teaching Hospital",
          bio: "Dedicated hospital staff member committed to providing quality healthcare services.",
          avatar: "",
          joinDate: "2023-01-01",
          employeeId: "KTH-STF-001",
          shift: "Day Shift",
          specialization: "General",
        };
    }
  };

  const [profile, setProfile] = useState<UserProfile>(generateProfileData());

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  const getRoleIcon = () => {
    switch (user?.role) {
      case "admin":
        return <Shield className="w-5 h-5" />;
      case "doctor":
        return <Stethoscope className="w-5 h-5" />;
      case "nurse":
        return <Heart className="w-5 h-5" />;
      case "registrar":
        return <UserCog className="w-5 h-5" />;
      default:
        return <UserCog className="w-5 h-5" />;
    }
  };

  const getRoleSpecificFields = () => {
    switch (user?.role) {
      case "admin":
        return [
          "System Access Level",
          "Administrative Permissions",
          "Security Clearance",
        ];
      case "doctor":
        return [
          "Medical License",
          "Board Certifications",
          "Areas of Expertise",
        ];
      case "nurse":
        return [
          "Nursing License",
          "CPR Certification",
          "Patient Care Specialties",
        ];
      case "registrar":
        return [
          "Registration Training",
          "Data Entry Certification",
          "Customer Service",
        ];
      default:
        return ["Professional Certifications", "Training Completed", "Skills"];
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-lg">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">{profile.name}</h3>
                <div className="flex flex-col gap-1">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {getRoleIcon()}
                    {profile.role}
                  </Badge>
                  <Badge variant="outline">{profile.department}</Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="truncate">{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CalendarDays className="w-4 h-4 text-muted-foreground" />
              <span>
                Joined {new Date(profile.joinDate).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <Card className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="professional">
                  Professional Details
                </TabsTrigger>
                <TabsTrigger value="rolespecific">
                  Role-Specific Info
                </TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="personal" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editedProfile.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    ) : (
                      <p className="px-3 py-2 bg-muted rounded-md">
                        {profile.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    ) : (
                      <p className="px-3 py-2 bg-muted rounded-md">
                        {profile.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editedProfile.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    ) : (
                      <p className="px-3 py-2 bg-muted rounded-md">
                        {profile.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={editedProfile.location}
                        onChange={(e) =>
                          handleInputChange("location", e.target.value)
                        }
                      />
                    ) : (
                      <p className="px-3 py-2 bg-muted rounded-md">
                        {profile.location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      rows={4}
                      value={editedProfile.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="px-3 py-2 bg-muted rounded-md min-h-[100px]">
                      {profile.bio}
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="professional" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <p className="px-3 py-2 bg-muted rounded-md">
                      {profile.employeeId}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    {isEditing ? (
                      <Input
                        id="role"
                        value={editedProfile.role}
                        onChange={(e) =>
                          handleInputChange("role", e.target.value)
                        }
                      />
                    ) : (
                      <p className="px-3 py-2 bg-muted rounded-md">
                        {profile.role}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    {isEditing ? (
                      <Input
                        id="department"
                        value={editedProfile.department}
                        onChange={(e) =>
                          handleInputChange("department", e.target.value)
                        }
                      />
                    ) : (
                      <p className="px-3 py-2 bg-muted rounded-md">
                        {profile.department}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shift">Shift</Label>
                    {isEditing ? (
                      <Input
                        id="shift"
                        value={editedProfile.shift}
                        onChange={(e) =>
                          handleInputChange("shift", e.target.value)
                        }
                      />
                    ) : (
                      <p className="px-3 py-2 bg-muted rounded-md">
                        {profile.shift}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    {isEditing ? (
                      <Input
                        id="specialization"
                        value={editedProfile.specialization}
                        onChange={(e) =>
                          handleInputChange("specialization", e.target.value)
                        }
                      />
                    ) : (
                      <p className="px-3 py-2 bg-muted rounded-md">
                        {profile.specialization}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="joinDate">Join Date</Label>
                    <p className="px-3 py-2 bg-muted rounded-md">
                      {new Date(profile.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="rolespecific" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    {getRoleIcon()}
                    <h3 className="text-lg font-semibold">
                      {user?.role === "admin" && "Administrative Information"}
                      {user?.role === "doctor" &&
                        "Medical Professional Details"}
                      {user?.role === "nurse" && "Nursing Professional Details"}
                      {user?.role === "registrar" &&
                        "Registration Department Details"}
                      {!user?.role && "Professional Information"}
                    </h3>
                  </div>

                  {user?.role === "admin" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>System Access Level</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          Full Administrative Access
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Security Clearance</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          Level 5 - Highest
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Managed Departments</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          All Hospital Departments
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Administrative Responsibilities</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          User Management, System Oversight, Reports
                        </p>
                      </div>
                    </div>
                  )}

                  {user?.role === "doctor" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Medical License Number</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          SLMC-{profile.employeeId}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Board Certifications</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          Internal Medicine, Emergency Care
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Patient Load</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          23 Active Patients
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>On-Call Schedule</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          Monday, Wednesday, Friday
                        </p>
                      </div>
                    </div>
                  )}

                  {user?.role === "nurse" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nursing License Number</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          SLNC-{profile.employeeId}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>CPR Certification</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          Valid until Dec 2025
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Assigned Patients</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          18 Patients (Current Shift)
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Specialty Training</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          Medication Administration, Vital Signs
                        </p>
                      </div>
                    </div>
                  )}

                  {user?.role === "registrar" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Registration Training</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          Certified Patient Registration Specialist
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Data Entry Accuracy</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          99.8% Accuracy Rate
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Daily Processing Volume</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          50-80 Patient Registrations
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>System Access</Label>
                        <p className="px-3 py-2 bg-muted rounded-md">
                          Patient Registration, Admission Management
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Performance Metrics</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          98%
                        </div>
                        <div className="text-sm text-green-700">
                          Performance Rating
                        </div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {user?.role === "admin"
                            ? "100%"
                            : user?.role === "doctor"
                              ? "95%"
                              : user?.role === "nurse"
                                ? "97%"
                                : "99%"}
                        </div>
                        <div className="text-sm text-blue-700">
                          {user?.role === "admin"
                            ? "System Uptime"
                            : user?.role === "doctor"
                              ? "Patient Satisfaction"
                              : user?.role === "nurse"
                                ? "Care Quality"
                                : "Accuracy Rate"}
                        </div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {user?.role === "admin"
                            ? "24/7"
                            : user?.role === "doctor"
                              ? "8hrs"
                              : user?.role === "nurse"
                                ? "12hrs"
                                : "8hrs"}
                        </div>
                        <div className="text-sm text-purple-700">
                          {user?.role === "admin"
                            ? "Availability"
                            : "Daily Hours"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
