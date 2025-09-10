import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Download,
  Trash2,
  AlertTriangle,
  Save,
  RefreshCw,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SettingsData {
  // General Settings
  language: string;
  timezone: string;
  dateFormat: string;
  theme: string;

  // Notifications
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  admissionAlerts: boolean;
  dischargeAlerts: boolean;
  emergencyAlerts: boolean;

  // Security
  twoFactorAuth: boolean;
  sessionTimeout: string;
  passwordExpiry: string;
  loginAttempts: string;

  // System
  autoSave: boolean;
  backupFrequency: string;
  dataRetention: string;
  auditLogging: boolean;
}

const Settings = () => {
  const [settings, setSettings] = useState<SettingsData>({
    // General Settings
    language: "en",
    timezone: "Asia/Colombo",
    dateFormat: "DD/MM/YYYY",
    theme: "system",

    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    admissionAlerts: true,
    dischargeAlerts: true,
    emergencyAlerts: true,

    // Security
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",

    // System
    autoSave: true,
    backupFrequency: "daily",
    dataRetention: "7",
    auditLogging: true,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (
    key: keyof SettingsData,
    value: string | boolean,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Here you would typically save to your backend
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully updated.",
    });
    setHasChanges(false);
  };

  const handleReset = () => {
    // Reset to default values
    setSettings({
      language: "en",
      timezone: "Asia/Colombo",
      dateFormat: "DD/MM/YYYY",
      theme: "system",
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      admissionAlerts: true,
      dischargeAlerts: true,
      emergencyAlerts: true,
      twoFactorAuth: false,
      sessionTimeout: "30",
      passwordExpiry: "90",
      loginAttempts: "5",
      autoSave: true,
      backupFrequency: "daily",
      dataRetention: "7",
      auditLogging: true,
    });
    setHasChanges(false);
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "karapitiya-settings.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Settings Exported",
      description: "Your settings have been exported successfully.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <SettingsIcon className="w-8 h-8" />
            Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your application preferences and configurations
          </p>
        </div>
        <div className="flex gap-2">
          {hasChanges && (
            <Badge variant="secondary" className="animate-pulse">
              Unsaved Changes
            </Badge>
          )}
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            System
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <SettingsIcon className="w-4 h-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance & Localization
              </CardTitle>
              <CardDescription>
                Customize how the application looks and behaves for your region
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) =>
                      handleSettingChange("language", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="si">Sinhala</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) =>
                      handleSettingChange("timezone", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Colombo">
                        Asia/Colombo (UTC+05:30)
                      </SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="Asia/Dhaka">
                        Asia/Dhaka (UTC+06:00)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={settings.dateFormat}
                    onValueChange={(value) =>
                      handleSettingChange("dateFormat", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) =>
                      handleSettingChange("theme", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("emailNotifications", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive browser push notifications
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("pushNotifications", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("smsNotifications", checked)
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Alert Types</h4>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="admissionAlerts">Admission Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified of new patient admissions
                    </p>
                  </div>
                  <Switch
                    id="admissionAlerts"
                    checked={settings.admissionAlerts}
                    onCheckedChange={(checked) =>
                      handleSettingChange("admissionAlerts", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dischargeAlerts">Discharge Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified of patient discharges
                    </p>
                  </div>
                  <Switch
                    id="dischargeAlerts"
                    checked={settings.dischargeAlerts}
                    onCheckedChange={(checked) =>
                      handleSettingChange("dischargeAlerts", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emergencyAlerts">Emergency Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified of emergency situations
                    </p>
                  </div>
                  <Switch
                    id="emergencyAlerts"
                    checked={settings.emergencyAlerts}
                    onCheckedChange={(checked) =>
                      handleSettingChange("emergencyAlerts", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactorAuth">
                    Two-Factor Authentication
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    handleSettingChange("twoFactorAuth", checked)
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </Label>
                  <Select
                    value={settings.sessionTimeout}
                    onValueChange={(value) =>
                      handleSettingChange("sessionTimeout", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Select
                    value={settings.passwordExpiry}
                    onValueChange={(value) =>
                      handleSettingChange("passwordExpiry", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select expiry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loginAttempts">Max Login Attempts</Label>
                  <Select
                    value={settings.loginAttempts}
                    onValueChange={(value) =>
                      handleSettingChange("loginAttempts", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select attempts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 attempts</SelectItem>
                      <SelectItem value="5">5 attempts</SelectItem>
                      <SelectItem value="10">10 attempts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                System Configuration
              </CardTitle>
              <CardDescription>
                Configure system behavior and data management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoSave">Auto Save</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save changes as you work
                  </p>
                </div>
                <Switch
                  id="autoSave"
                  checked={settings.autoSave}
                  onCheckedChange={(checked) =>
                    handleSettingChange("autoSave", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auditLogging">Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">
                    Log all user actions for compliance
                  </p>
                </div>
                <Switch
                  id="auditLogging"
                  checked={settings.auditLogging}
                  onCheckedChange={(checked) =>
                    handleSettingChange("auditLogging", checked)
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={settings.backupFrequency}
                    onValueChange={(value) =>
                      handleSettingChange("backupFrequency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataRetention">Data Retention (years)</Label>
                  <Select
                    value={settings.dataRetention}
                    onValueChange={(value) =>
                      handleSettingChange("dataRetention", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select retention" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 year</SelectItem>
                      <SelectItem value="3">3 years</SelectItem>
                      <SelectItem value="5">5 years</SelectItem>
                      <SelectItem value="7">7 years</SelectItem>
                      <SelectItem value="10">10 years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                Advanced Options
              </CardTitle>
              <CardDescription>
                Import, export, and reset settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Export Settings</h4>
                    <p className="text-sm text-muted-foreground">
                      Download your current settings as a JSON file
                    </p>
                  </div>
                  <Button
                    onClick={exportSettings}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Import Settings</h4>
                    <p className="text-sm text-muted-foreground">
                      Upload a settings file to restore configuration
                    </p>
                  </div>
                  <Input type="file" accept=".json" className="w-auto" />
                </div>
              </div>

              <Separator />

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  The following actions cannot be undone. Please proceed with
                  caution.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                  <div>
                    <h4 className="font-medium text-destructive">
                      Reset All Settings
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Reset all settings to their default values
                    </p>
                  </div>
                  <Button
                    onClick={handleReset}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg">
                  <div>
                    <h4 className="font-medium text-destructive">
                      Clear All Data
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Permanently delete all application data
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
