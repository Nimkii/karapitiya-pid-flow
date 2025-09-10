# Profile and Settings Demo

This document provides an overview of the newly created Profile and Settings pages for the Karapitiya PID Flow application.

## Features Added

### Profile Page (`/profile`)

A comprehensive profile management page that includes:

#### User Overview Card
- Avatar display with initials fallback
- User name and role badges
- Contact information (email, phone, location)
- Join date display
- Camera icon for avatar upload (when editing)

#### Tabbed Information Display
- **Personal Information Tab**
  - Full Name (editable)
  - Email (editable)
  - Phone Number (editable)
  - Location (editable)
  - Bio (editable textarea)

- **Professional Details Tab**
  - Employee ID (read-only)
  - Role (editable)
  - Department (editable)
  - Shift (editable)
  - Specialization (editable)
  - Join Date (read-only)

#### Interactive Features
- Edit/Save/Cancel functionality
- Real-time form validation
- Toast notifications for successful updates
- Responsive design for mobile and desktop

### Settings Page (`/settings`)

A comprehensive settings management page with five main categories:

#### 1. General Settings
- Language selection (English, Sinhala, Tamil)
- Timezone configuration
- Date format preferences
- Theme selection (Light, Dark, System)

#### 2. Notification Preferences
- Email notifications toggle
- Push notifications toggle
- SMS notifications toggle
- Specific alert types:
  - Admission alerts
  - Discharge alerts
  - Emergency alerts

#### 3. Security Settings
- Two-factor authentication toggle
- Session timeout configuration
- Password expiry settings
- Maximum login attempts

#### 4. System Configuration
- Auto-save functionality
- Audit logging toggle
- Backup frequency settings
- Data retention policies

#### 5. Advanced Options
- Export settings as JSON
- Import settings from file
- Reset all settings to defaults
- Clear all data (destructive action)

## Sample Data

### Profile Sample Data
```json
{
  "id": "1",
  "name": "Dr. Sarah Johnson",
  "email": "sarah.johnson@karapitiyahospital.lk",
  "phone": "+94 71 234 5678",
  "role": "Senior Consultant",
  "department": "Pediatrics",
  "location": "Karapitiya Teaching Hospital",
  "bio": "Experienced pediatrician with over 10 years of experience in infant and child healthcare. Specialized in neonatal care and pediatric emergencies.",
  "joinDate": "2019-03-15",
  "employeeId": "KTH-PED-001",
  "shift": "Morning",
  "specialization": "Neonatal Care"
}
```

### Settings Sample Data
```json
{
  "language": "en",
  "timezone": "Asia/Colombo",
  "dateFormat": "DD/MM/YYYY",
  "theme": "system",
  "emailNotifications": true,
  "pushNotifications": true,
  "smsNotifications": false,
  "admissionAlerts": true,
  "dischargeAlerts": true,
  "emergencyAlerts": true,
  "twoFactorAuth": false,
  "sessionTimeout": "30",
  "passwordExpiry": "90",
  "loginAttempts": "5",
  "autoSave": true,
  "backupFrequency": "daily",
  "dataRetention": "7",
  "auditLogging": true
}
```

## Navigation

### Sidebar Navigation
Both pages are accessible through the sidebar under the "Account" section:
- Profile (User icon)
- Settings (Settings icon)

### Top Bar User Menu
Quick access through the user dropdown menu in the top bar:
- Profile option
- Settings option

## Technical Implementation

### Technologies Used
- React 18 with TypeScript
- shadcn/ui component library
- Tailwind CSS for styling
- Lucide React for icons
- React Router for navigation

### Key Components
- Form validation and state management
- Responsive design patterns
- Toast notifications for user feedback
- File export functionality
- Local state persistence

### Accessibility Features
- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility
- High contrast support
- Focus management

## Testing the Pages

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the application and log in

3. Access the Profile page:
   - Click "Profile" in the sidebar under "Account"
   - Or click the user icon in the top bar and select "Profile"

4. Access the Settings page:
   - Click "Settings" in the sidebar under "Account"
   - Or click the user icon in the top bar and select "Settings"

## Future Enhancements

### Profile Page
- Image upload functionality
- Profile completion percentage
- Activity log/history
- Social links
- Emergency contact information

### Settings Page
- Role-based settings visibility
- Settings validation
- Backup/restore from cloud
- Advanced security options
- Integration with external systems

## File Structure

```
src/
├── pages/
│   ├── Profile.tsx       # Main profile page component
│   └── Settings.tsx      # Main settings page component
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx   # Updated with new navigation items
│   │   └── TopBar.tsx    # Updated with profile/settings links
└── App.tsx              # Updated with new routes
```

## Routes Added

- `/profile` - User profile management page
- `/settings` - Application settings page

Both routes are protected and require authentication to access.