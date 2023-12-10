import "./Hospitals.scss";
import { Hospital, User } from "../../types/types";
import { getHospitals } from "../../services/patient.service";
import MedicationIcon from "@mui/icons-material/Medication";
import { EntityList } from "../common/EntityList/EntityList";

interface HospitalsProps {
  onHospitalSelect?: (user: User) => void;
}

export const Hospitals: React.FC<HospitalsProps> = ({ onHospitalSelect }) => {
  return (
    <>
      <EntityList
        title="Hospital List"
        fetchEntities={getHospitals}
        transformEntity={(hospital: Hospital) => ({
          id: hospital.hospitalId,
          name: hospital.hospitalName,
        })}
        icon={<MedicationIcon />}
        onSelect={onHospitalSelect}
      />
    </>
  );
};
