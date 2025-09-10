import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Building2,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Users,
  Bed,
  Activity,
  AlertTriangle,
  Download,
  Settings,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Ward {
  id: string;
  name: string;
  code: string;
  type:
    | "general"
    | "icu"
    | "pediatric"
    | "maternity"
    | "emergency"
    | "surgical";
  description: string;
  totalBeds: number;
  occupiedBeds: number;
  headNurse?: string;
  wardDoctor?: string;
  location: string;
  isActive: boolean;
  contactNumber?: string;
  createdAt: Date;
  lastUpdated: Date;
}

interface WardFormData {
  name: string;
  code: string;
  type:
    | "general"
    | "icu"
    | "pediatric"
    | "maternity"
    | "emergency"
    | "surgical";
  description: string;
  totalBeds: number;
  headNurse: string;
  wardDoctor: string;
  location: string;
  contactNumber: string;
}

const WardManagement = () => {
  const [wards, setWards] = useState<Ward[]>([
    {
      id: "1",
      name: "Pediatric Ward",
      code: "PED01",
      type: "pediatric",
      description: "Specialized care for children under 16 years",
      totalBeds: 30,
      occupiedBeds: 22,
      headNurse: "Sister Mary Johnson",
      wardDoctor: "Dr. Sarah Chen",
      location: "Building A, 2nd Floor",
      isActive: true,
      contactNumber: "+94771234567",
      createdAt: new Date("2024-01-01"),
      lastUpdated: new Date("2024-01-15"),
    },
    {
      id: "2",
      name: "Intensive Care Unit",
      code: "ICU01",
      type: "icu",
      description: "Critical care unit for severely ill patients",
      totalBeds: 20,
      occupiedBeds: 18,
      headNurse: "Sister Patricia Wilson",
      wardDoctor: "Dr. Michael Brown",
      location: "Building B, 3rd Floor",
      isActive: true,
      contactNumber: "+94771234568",
      createdAt: new Date("2024-01-01"),
      lastUpdated: new Date("2024-01-14"),
    },
    {
      id: "3",
      name: "General Ward A",
      code: "GEN01",
      type: "general",
      description: "General medical care and observation",
      totalBeds: 40,
      occupiedBeds: 28,
      headNurse: "Sister Jennifer Davis",
      wardDoctor: "Dr. Robert Smith",
      location: "Building C, 1st Floor",
      isActive: true,
      contactNumber: "+94771234569",
      createdAt: new Date("2024-01-01"),
      lastUpdated: new Date("2024-01-13"),
    },
    {
      id: "4",
      name: "Emergency Ward",
      code: "EMR01",
      type: "emergency",
      description: "24/7 emergency care and triage",
      totalBeds: 15,
      occupiedBeds: 8,
      headNurse: "Sister Lisa Anderson",
      wardDoctor: "Dr. David Lee",
      location: "Building A, Ground Floor",
      isActive: true,
      contactNumber: "+94771234570",
      createdAt: new Date("2024-01-01"),
      lastUpdated: new Date("2024-01-15"),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingWard, setEditingWard] = useState<Ward | null>(null);
  const [formData, setFormData] = useState<WardFormData>({
    name: "",
    code: "",
    type: "general",
    description: "",
    totalBeds: 0,
    headNurse: "",
    wardDoctor: "",
    location: "",
    contactNumber: "",
  });

  const wardTypes = [
    { value: "general", label: "General Ward", color: "bg-blue-500" },
    { value: "icu", label: "ICU", color: "bg-red-500" },
    { value: "pediatric", label: "Pediatric", color: "bg-pink-500" },
    { value: "maternity", label: "Maternity", color: "bg-purple-500" },
    { value: "emergency", label: "Emergency", color: "bg-orange-500" },
    { value: "surgical", label: "Surgical", color: "bg-green-500" },
  ];

  const filteredWards = wards.filter((ward) => {
    const matchesSearch =
      ward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ward.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ward.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === "all" || ward.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && ward.isActive) ||
      (statusFilter === "inactive" && !ward.isActive);

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateWard = () => {
    if (!formData.name || !formData.code || !formData.location) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicate ward code
    if (wards.some((ward) => ward.code === formData.code)) {
      toast({
        title: "Validation Error",
        description: "Ward code already exists. Please use a unique code.",
        variant: "destructive",
      });
      return;
    }

    const newWard: Ward = {
      id: Date.now().toString(),
      name: formData.name,
      code: formData.code,
      type: formData.type,
      description: formData.description,
      totalBeds: formData.totalBeds,
      occupiedBeds: 0,
      headNurse: formData.headNurse,
      wardDoctor: formData.wardDoctor,
      location: formData.location,
      contactNumber: formData.contactNumber,
      isActive: true,
      createdAt: new Date(),
      lastUpdated: new Date(),
    };

    setWards([...wards, newWard]);
    setIsCreateDialogOpen(false);
    resetForm();

    toast({
      title: "Success",
      description: "Ward created successfully.",
    });
  };

  const handleEditWard = () => {
    if (
      !editingWard ||
      !formData.name ||
      !formData.code ||
      !formData.location
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Check for duplicate ward code (excluding current ward)
    if (
      wards.some(
        (ward) => ward.code === formData.code && ward.id !== editingWard.id,
      )
    ) {
      toast({
        title: "Validation Error",
        description: "Ward code already exists. Please use a unique code.",
        variant: "destructive",
      });
      return;
    }

    setWards(
      wards.map((ward) =>
        ward.id === editingWard.id
          ? {
              ...ward,
              name: formData.name,
              code: formData.code,
              type: formData.type,
              description: formData.description,
              totalBeds: formData.totalBeds,
              headNurse: formData.headNurse,
              wardDoctor: formData.wardDoctor,
              location: formData.location,
              contactNumber: formData.contactNumber,
              lastUpdated: new Date(),
            }
          : ward,
      ),
    );

    setEditingWard(null);
    resetForm();

    toast({
      title: "Success",
      description: "Ward updated successfully.",
    });
  };

  const handleDeleteWard = (wardId: string) => {
    const ward = wards.find((w) => w.id === wardId);
    if (ward && ward.occupiedBeds > 0) {
      toast({
        title: "Cannot Delete Ward",
        description:
          "Cannot delete ward with occupied beds. Please transfer patients first.",
        variant: "destructive",
      });
      return;
    }

    setWards(wards.filter((ward) => ward.id !== wardId));
    toast({
      title: "Success",
      description: "Ward deleted successfully.",
    });
  };

  const toggleWardStatus = (wardId: string) => {
    const ward = wards.find((w) => w.id === wardId);
    if (ward && ward.occupiedBeds > 0 && ward.isActive) {
      toast({
        title: "Cannot Deactivate Ward",
        description:
          "Cannot deactivate ward with occupied beds. Please transfer patients first.",
        variant: "destructive",
      });
      return;
    }

    setWards(
      wards.map((ward) =>
        ward.id === wardId
          ? { ...ward, isActive: !ward.isActive, lastUpdated: new Date() }
          : ward,
      ),
    );

    toast({
      title: "Success",
      description: "Ward status updated successfully.",
    });
  };

  const openEditDialog = (ward: Ward) => {
    setEditingWard(ward);
    setFormData({
      name: ward.name,
      code: ward.code,
      type: ward.type,
      description: ward.description,
      totalBeds: ward.totalBeds,
      headNurse: ward.headNurse || "",
      wardDoctor: ward.wardDoctor || "",
      location: ward.location,
      contactNumber: ward.contactNumber || "",
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      type: "general",
      description: "",
      totalBeds: 0,
      headNurse: "",
      wardDoctor: "",
      location: "",
      contactNumber: "",
    });
  };

  const getOccupancyRate = (ward: Ward) => {
    return ward.totalBeds > 0 ? (ward.occupiedBeds / ward.totalBeds) * 100 : 0;
  };

  const getOccupancyColor = (rate: number) => {
    if (rate >= 90) return "text-red-600";
    if (rate >= 75) return "text-orange-600";
    if (rate >= 50) return "text-yellow-600";
    return "text-green-600";
  };

  const getTypeColor = (type: string) => {
    return wardTypes.find((t) => t.value === type)?.color || "bg-gray-500";
  };

  const exportWards = () => {
    const csv = [
      [
        "Ward Name",
        "Code",
        "Type",
        "Total Beds",
        "Occupied Beds",
        "Occupancy Rate",
        "Head Nurse",
        "Ward Doctor",
        "Location",
        "Contact",
        "Status",
      ],
      ...filteredWards.map((ward) => [
        ward.name,
        ward.code,
        ward.type,
        ward.totalBeds.toString(),
        ward.occupiedBeds.toString(),
        `${getOccupancyRate(ward).toFixed(1)}%`,
        ward.headNurse || "",
        ward.wardDoctor || "",
        ward.location,
        ward.contactNumber || "",
        ward.isActive ? "Active" : "Inactive",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wards.csv";
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Ward data exported successfully.",
    });
  };

  const totalBeds = wards.reduce((sum, ward) => sum + ward.totalBeds, 0);
  const totalOccupied = wards.reduce((sum, ward) => sum + ward.occupiedBeds, 0);
  const overallOccupancy =
    totalBeds > 0 ? (totalOccupied / totalBeds) * 100 : 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            Ward Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage hospital wards, bed allocation, and staff assignments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportWards}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Ward
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Ward</DialogTitle>
                <DialogDescription>
                  Add a new ward to the hospital system with all necessary
                  details.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Ward Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Pediatric Ward"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="code">Ward Code *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          code: e.target.value.toUpperCase(),
                        })
                      }
                      placeholder="PED01"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Ward Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(
                        value:
                          | "general"
                          | "icu"
                          | "pediatric"
                          | "maternity"
                          | "emergency"
                          | "surgical",
                      ) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {wardTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="totalBeds">Total Beds</Label>
                    <Input
                      id="totalBeds"
                      type="number"
                      min="0"
                      value={formData.totalBeds || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          totalBeds: parseInt(e.target.value) || 0,
                        })
                      }
                      placeholder="30"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Brief description of the ward"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="Building A, 2nd Floor"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="headNurse">Head Nurse</Label>
                    <Input
                      id="headNurse"
                      value={formData.headNurse}
                      onChange={(e) =>
                        setFormData({ ...formData, headNurse: e.target.value })
                      }
                      placeholder="Sister Mary Johnson"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="wardDoctor">Ward Doctor</Label>
                    <Input
                      id="wardDoctor"
                      value={formData.wardDoctor}
                      onChange={(e) =>
                        setFormData({ ...formData, wardDoctor: e.target.value })
                      }
                      placeholder="Dr. Sarah Chen"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    value={formData.contactNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                    placeholder="+94771234567"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateWard}>
                  Create Ward
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Wards</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wards.length}</div>
            <p className="text-xs text-muted-foreground">
              {wards.filter((w) => w.isActive).length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Beds</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBeds}</div>
            <p className="text-xs text-muted-foreground">Across all wards</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupied Beds</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOccupied}</div>
            <p className="text-xs text-muted-foreground">
              {totalBeds - totalOccupied} available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Occupancy Rate
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${getOccupancyColor(overallOccupancy)}`}
            >
              {overallOccupancy.toFixed(1)}%
            </div>
            <Progress value={overallOccupancy} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ward List</CardTitle>
          <CardDescription>
            Manage all hospital wards and their configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search wards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {wardTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ward</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Bed Occupancy</TableHead>
                  <TableHead>Staff</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWards.map((ward) => {
                  const occupancyRate = getOccupancyRate(ward);
                  return (
                    <TableRow key={ward.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{ward.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {ward.code}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getTypeColor(ward.type)} text-white`}
                        >
                          {wardTypes.find((t) => t.value === ward.type)?.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span>
                              {ward.occupiedBeds}/{ward.totalBeds}
                            </span>
                            <span className={getOccupancyColor(occupancyRate)}>
                              {occupancyRate.toFixed(0)}%
                            </span>
                          </div>
                          <Progress value={occupancyRate} className="h-2" />
                          {occupancyRate >= 90 && (
                            <div className="flex items-center text-red-600 text-xs">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Near capacity
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{ward.headNurse || "Not assigned"}</div>
                          <div className="text-muted-foreground">
                            {ward.wardDoctor || "Not assigned"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{ward.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={ward.isActive}
                            onCheckedChange={() => toggleWardStatus(ward.id)}
                          />
                          <span
                            className={
                              ward.isActive ? "text-green-600" : "text-red-600"
                            }
                          >
                            {ward.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => openEditDialog(ward)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Configure
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteWard(ward.id)}
                              className="text-red-600"
                              disabled={ward.occupiedBeds > 0}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredWards.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No wards found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Ward Dialog */}
      <Dialog open={!!editingWard} onOpenChange={() => setEditingWard(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Ward</DialogTitle>
            <DialogDescription>
              Update ward information and configuration.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="editName">Ward Name *</Label>
                <Input
                  id="editName"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editCode">Ward Code *</Label>
                <Input
                  id="editCode"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code: e.target.value.toUpperCase(),
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="editType">Ward Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(
                    value:
                      | "general"
                      | "icu"
                      | "pediatric"
                      | "maternity"
                      | "emergency"
                      | "surgical",
                  ) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {wardTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editTotalBeds">Total Beds</Label>
                <Input
                  id="editTotalBeds"
                  type="number"
                  min="0"
                  value={formData.totalBeds || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalBeds: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editDescription">Description</Label>
              <Textarea
                id="editDescription"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editLocation">Location *</Label>
              <Input
                id="editLocation"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="editHeadNurse">Head Nurse</Label>
                <Input
                  id="editHeadNurse"
                  value={formData.headNurse}
                  onChange={(e) =>
                    setFormData({ ...formData, headNurse: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="editWardDoctor">Ward Doctor</Label>
                <Input
                  id="editWardDoctor"
                  value={formData.wardDoctor}
                  onChange={(e) =>
                    setFormData({ ...formData, wardDoctor: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="editContactNumber">Contact Number</Label>
              <Input
                id="editContactNumber"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditWard}>
              Update Ward
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WardManagement;
