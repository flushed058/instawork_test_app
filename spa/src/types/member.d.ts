interface Member {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: Role;
}

interface ApiError {
  message: string;
  status?: number;
}

type Role = 'regular' | 'admin'