export type Decision = 'APPROVED' | 'REVIEW' | 'REJECTED';

export interface DashboardSummary {
  totalApplications: number;
  approved: number;
  review: number;
  rejected: number;
  fraudAlerts: number;
  avgRiskScore: number;
}

export interface ApplicationRequest {
  applicantName: string;
  email: string;
  phone: string;
  employmentType: string;
  employerName: string;
  salary: number;
  creditScore: number;
  existingLoans: number;
  missedEmi: number;
  requestedAmount: number;
  loanPurpose: string;
  tenureMonths: number;
}

export interface ApplicationResponse extends ApplicationRequest {
  id: number;
  riskScore: number;
  decision: Decision;
  reasons: string[];
  fraudFlags: string[];
  explanation: string;
  createdAt: string;
}

export interface AuthUser {
  id: number;
  username: string;
  role: string;
  institution: string;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  institution: string;
}
