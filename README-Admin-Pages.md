# Admin Pages Documentation

This document provides an overview of the admin-only pages created for the Karapitiya PID Flow system. These pages are accessible only to users with the "admin" role and provide comprehensive administrative functionality.

## Overview

The admin section consists of four main pages:

1. **User Management** (`/admin/users`)
2. **Ward Management** (`/admin/wards`)
3. **Audit Logs** (`/admin/audit`)
4. **Reports** (`/admin/reports`)

## User Management

**Route:** `/admin/users`  
**Component:** `UserManagement.tsx`

### Features

- **User CRUD Operations**: Create, read, update, and delete user accounts
- **Role Management**: Assign and modify user roles (admin, registrar_clerk, ward_doctor, nurse)
- **Ward Assignment**: Assign ward doctors and nurses to specific wards
- **User Status Control**: Activate/deactivate user accounts
- **Search & Filtering**: Filter users by role, status, and search by name/email
- **Export Functionality**: Export user data to CSV format

### User Roles

- **Admin**: Full system access
- **Registrar Clerk**: Patient registration and basic operations
- **Ward Doctor**: Medical operations within assigned ward
- **Nurse**: Patient care within assigned ward

### Key Components

- User creation form with password management
- User editing dialog
- Status toggle switches
- Role-based badge system
- Export functionality

## Ward Management

**Route:** `/admin/wards`  
**Component:** `WardManagement.tsx`

### Features

- **Ward Configuration**: Create and manage hospital wards
- **Bed Management**: Track total and occupied beds per ward
- **Staff Assignment**: Assign head nurses and ward doctors
- **Occupancy Monitoring**: Real-time bed occupancy rates with visual indicators
- **Ward Types**: Support for different ward types (ICU, Pediatric, General, etc.)
- **Location Tracking**: Physical location management
- **Contact Information**: Ward-specific contact details

### Ward Types

- General Ward
- ICU (Intensive Care Unit)
- Pediatric Ward
- Maternity Ward
- Emergency Ward
- Surgical Ward

### Key Features

- **Occupancy Alerts**: Visual warnings when wards reach 90% capacity
- **Status Management**: Activate/deactivate wards (with safety checks)
- **Comprehensive Dashboard**: Overview cards showing total wards, beds, and occupancy rates
- **Export Functionality**: Export ward data including occupancy statistics

### Safety Features

- Cannot delete wards with occupied beds
- Cannot deactivate wards with patients
- Duplicate ward code prevention

## Audit Logs

**Route:** `/admin/audit`  
**Component:** `AuditLogs.tsx`

### Features

- **Comprehensive Logging**: Track all system activities and user actions
- **Advanced Filtering**: Filter by status, module, action, user, and date range
- **Detailed Event Information**: Complete audit trail with technical details
- **Security Monitoring**: Track failed login attempts and security events
- **Real-time Tracking**: Live activity monitoring

### Logged Modules

- **Patient Management**: Patient record access, updates, deletions
- **Admissions**: Admission and discharge activities
- **User Management**: User account changes and access
- **Ward Management**: Ward configuration changes
- **System**: Automated system events and backups
- **Authentication**: Login attempts and security events

### Log Information

Each audit log entry includes:
- Timestamp with precise timing
- User identification and role
- Action performed
- Resource affected
- IP address and session information
- User agent details
- Success/failure status
- Detailed description

### Filtering Options

- **Status**: Success, Failure, Warning
- **Module**: Filter by system component
- **Action**: Filter by specific actions
- **User**: Filter by specific users
- **Date Range**: Custom date range selection

## Reports & Analytics

**Route:** `/admin/reports`  
**Component:** `Reports.tsx`

### Features

- **Dashboard Metrics**: Key performance indicators with trend analysis
- **Report Generation**: Create various types of reports
- **Data Visualization**: Charts and graphs for data analysis
- **Export Options**: Multiple export formats (PDF, Excel, CSV)
- **Scheduled Reports**: Automated report generation (planned feature)

### Available Reports

#### Patient Demographics
- Age distribution analysis
- Gender breakdown statistics
- Population trends

#### Ward Utilization
- Bed occupancy rates by ward
- Capacity analysis
- Trend monitoring

#### Admission Trends
- Daily admission patterns
- Monthly statistics
- Discharge tracking

#### Staff Productivity
- Staff workload analysis
- Patient-to-staff ratios
- Department efficiency metrics

### Key Metrics Dashboard

- **Total Patients**: Active patient count with trend analysis
- **Bed Occupancy**: Overall hospital bed utilization
- **Average Stay Duration**: Patient stay analytics
- **Daily Admissions**: New admission tracking

### Report Categories

- **Patient Reports**: Demographics and medical statistics
- **Ward Reports**: Facility utilization and capacity
- **Staff Reports**: Personnel and productivity metrics
- **Financial Reports**: Cost and revenue analysis (planned)
- **Operational Reports**: System efficiency and performance

## Security & Access Control

### Role-Based Access

All admin pages are protected by role-based access control:

```typescript
<ProtectedRoute allowedRoles={["admin"]}>
  <MainLayout>
    <AdminComponent />
  </MainLayout>
</ProtectedRoute>
```

### Authentication Requirements

- Users must be authenticated
- Must have "admin" role
- Session-based access control
- Automatic redirect for unauthorized access

## Technical Implementation

### File Structure

```
src/pages/admin/
├── index.ts              # Export barrel file
├── UserManagement.tsx    # User management page
├── WardManagement.tsx    # Ward management page
├── AuditLogs.tsx        # Audit logging page
└── Reports.tsx          # Reports and analytics page
```

### Dependencies

- React 18+ with TypeScript
- React Router for navigation
- Lucide React for icons
- date-fns for date handling
- Custom UI components from shadcn/ui

### State Management

Each page uses local React state with proper TypeScript interfaces:

- Form state management
- Filter state handling
- Modal/dialog state control
- Data state with proper typing

### Data Flow

1. **Local State**: Sample data for demonstration
2. **API Integration**: Ready for backend integration
3. **Error Handling**: Comprehensive error management
4. **Loading States**: User feedback during operations

## Usage Instructions

### Accessing Admin Pages

1. Log in with an admin account
2. Navigate using the sidebar admin section
3. Each page provides comprehensive functionality
4. Use filters and search to find specific data
5. Export data as needed for external analysis

### Creating Users

1. Go to User Management
2. Click "Add User" button
3. Fill in required information
4. Assign appropriate role and ward (if applicable)
5. Set secure password
6. Save to create the user

### Managing Wards

1. Access Ward Management
2. View current ward status and occupancy
3. Create new wards with "Add Ward" button
4. Edit existing wards using the actions menu
5. Monitor bed occupancy rates
6. Export ward data for analysis

### Viewing Audit Logs

1. Open Audit Logs page
2. Use filters to narrow down events
3. Search for specific activities
4. Click on entries to view detailed information
5. Export logs for compliance or analysis

### Generating Reports

1. Navigate to Reports page
2. View key metrics dashboard
3. Select report category filter
4. Generate specific reports
5. Export in preferred format

## Future Enhancements

### Planned Features

- **Real-time Notifications**: Live alerts for critical events
- **Advanced Analytics**: Machine learning insights
- **Scheduled Reports**: Automated report delivery
- **Mobile Responsiveness**: Enhanced mobile experience
- **API Integration**: Backend service integration
- **Performance Optimization**: Lazy loading and caching

### Integration Points

- **Database Integration**: Replace sample data with real API calls
- **Authentication Service**: Enhanced security features
- **Notification System**: Real-time alerts and messaging
- **File Storage**: Document and image management
- **Backup System**: Automated data backup and recovery

## Troubleshooting

### Common Issues

1. **Access Denied**: Ensure user has admin role
2. **Missing Data**: Check if sample data is loaded
3. **Export Issues**: Verify browser download permissions
4. **Filter Problems**: Clear filters and try again

### Support

For technical support or feature requests, contact the development team or refer to the main project documentation.