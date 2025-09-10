# Karapitiya Teaching Hospital - Patient Records Management System (PRMS)

A comprehensive digital patient records and admission management system designed specifically for Karapitiya Teaching Hospital. This system features a unique Patient ID (PID) generation system and role-based access control for healthcare staff.

## Features

### Core Functionality
- **Digital Patient Registration**: Complete patient information management with unique PID generation
- **Admission Management**: Streamlined patient admission and discharge processes
- **Medical Records**: Comprehensive electronic medical records system
- **Role-Based Access Control**: Different interfaces for admins, doctors, nurses, and registrar clerks
- **Real-time Dashboard**: Live updates on patient status, admissions, and critical alerts

### Unique Patient ID (PID) System
- **Format**: KTH-YYMM-SSSSS-C (Site-Year-Month-Sequence-CheckDigit)
- **Example**: KTH-2508-00073-6
- **Features**:
  - Mod-11 check digit validation
  - QR code generation for easy scanning
  - Hospital-specific prefix (KTH)
  - Sequential numbering with validation

### User Roles
- **Admin**: User management, ward management, audit logs, system reports
- **Doctor**: Patient management, medical orders, critical patient monitoring
- **Nurse**: Task management, patient care, vital signs monitoring
- **Registrar Clerk**: Patient registration, admission processing, PID generation

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: TanStack Query for server state
- **Authentication**: Context-based authentication system
- **Form Handling**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard and analytics
│   ├── layout/         # Layout components (sidebar, topbar)
│   ├── patients/       # Patient management components
│   ├── pid/           # PID generation and validation
│   └── ui/            # Reusable UI components
├── contexts/
│   └── AuthContext    # Authentication context
├── hooks/             # Custom React hooks
├── lib/
│   └── pid.ts         # PID generation and validation logic
├── pages/             # Application pages
│   ├── admin/         # Admin-specific pages
│   ├── Login.tsx
│   ├── PatientRegister.tsx
│   ├── NewAdmission.tsx
│   └── ...
└── types/             # TypeScript type definitions
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Nimkii/karapitiya-pid-flow.git
cd karapitiya-pid-flow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm start` - Start production preview server

## Key Components

### PID System
The Patient ID system is the core of this application:

- **Generation**: Automatic PID generation with hospital prefix
- **Validation**: Real-time PID validation with check digit verification
- **Search**: Quick PID search functionality in the top navigation
- **QR Codes**: Generate QR codes for easy patient identification

### Dashboard Features
- **Role-specific KPIs**: Different metrics for each user role
- **Real-time Activity Feed**: Live updates on system activities
- **Critical Patient Alerts**: Immediate notifications for urgent cases
- **Quick Actions**: Role-based quick access buttons

### Patient Management
- **Registration**: Comprehensive patient information collection
- **Search & Edit**: Advanced patient search and information updating
- **Medical Records**: Complete medical history management
- **Admission Tracking**: Current admissions and patient status

### Admin Features
- **User Management**: Create and manage system users
- **Ward Management**: Hospital ward configuration
- **Audit Logs**: System activity tracking
- **Reports**: Generate various administrative reports

## Authentication & Security

- Protected routes with role-based access control
- Secure authentication context
- Different permission levels for various user roles
- Audit logging for system activities

## Development Notes

### Code Style
- TypeScript for type safety
- ESLint configuration for code quality
- Tailwind CSS for styling consistency
- Component-based architecture

### State Management
- TanStack Query for server state management
- React Context for authentication state
- Local state management with React hooks

### Form Validation
- Zod schemas for runtime type checking
- React Hook Form for form state management
- Real-time validation feedback

## Deployment

The application can be deployed using various platforms:

### Using Render (configured)
The project includes a `render.yaml` configuration file for easy deployment on Render.
