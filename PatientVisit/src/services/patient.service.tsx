import { Hospital, Patient, History } from "../types/types";

const PRV_API_URL = "https://localhost:5001";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Network response was not ok (status code: ${res.status})`);
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  } else {
    throw new Error("Received non-JSON response");
  }
}

export const getPatients: () => Promise<Patient[]> = async () => {
  const res = await fetch(`${PRV_API_URL}/api/Patient`);

  return handleResponse<Patient[]>(res);
};

export const getHospitals: () => Promise<Hospital[]> = async () => {
  const res = await fetch(`${PRV_API_URL}/api/Hospital`);

  return handleResponse<Hospital[]>(res);
};

export const getVisitHistory: (
  patientId?: number,
  hospitalId?: number
) => Promise<History[]> = async (patientId, hospitalId) => {
  const res = await fetch(
    `${PRV_API_URL}/api/VisitHistory?${
      patientId !== undefined ? `patientId=${patientId}` : ""
    }${patientId !== undefined && hospitalId !== undefined ? "&" : ""}${
      hospitalId !== undefined ? `hospitalId=${hospitalId}` : ""
    }`
  );

  return handleResponse<History[]>(res);
};
