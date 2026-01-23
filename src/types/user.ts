export type UserStatus = "active" | "inactive" | "pending" | "blacklisted";

export type Guarantor = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  relationship?: string;
};

export type User = {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  status: UserStatus;
  phoneNumber: string;
  createdAt: string;

  accountBalance?: string;
  accountNumber?: string;
  bank?: string;

  profile?: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    avatar?: string;
    bvn?: string;
    gender?: string;
    maritalStatus?: string;
    children?: string;
    residence?: string;
  };

  education?: {
    level?: string;
    employmentStatus?: string;
    sector?: string;
    duration?: string;
    officeEmail?: string;
    monthlyIncome?: string[];
    loanRepayment?: string;
  };

  socials?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };

  guarantors?: Guarantor[];
};
