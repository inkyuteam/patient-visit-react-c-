export type User = {
    id: number;
    name: string;
  };

  export type Patient = {
    patientId: number;
    fullName: string;
    dateOfBirth: string;
    gender: string;
  }

  export type Hospital = {
    hospitalId: number;
    hospitalName: string;
    address: string;
  }

  export type History = {
    visitId: number;
    patientName: string;
    hospitalName: string;
    visitDate: string;
    reasonForVisit: string;
  }