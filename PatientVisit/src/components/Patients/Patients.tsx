import "./Patients.scss";
import { Patient, User } from "../../types/types";
import { getPatients } from "../../services/patient.service";
import FaceIcon from "@mui/icons-material/Face";
import { EntityList } from "../common/EntityList/EntityList";

interface PatientsProps {
  onPatientSelect?: (user: User) => void;
}

export const Patients: React.FC<PatientsProps> = ({ onPatientSelect }) => {
  const onSelect = (user: User) => {
    onPatientSelect?.(user);
  };

  return (
    <>
      <EntityList
        title="Patient List"
        fetchEntities={getPatients}
        transformEntity={(patient: Patient) => ({
          id: patient.patientId,
          name: patient.fullName,
        })}
        icon={<FaceIcon />}
        onSelect={onSelect}
      />
    </>
  );
};
