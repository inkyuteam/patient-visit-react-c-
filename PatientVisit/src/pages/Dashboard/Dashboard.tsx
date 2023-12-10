import "./Dashboard.scss";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { Patients } from "../../components/Patients/Patients";
import { Hospitals } from "../../components/Hospitals/Hospitals";
import { VisitHistory } from "../../components/VisitHistory/VisitHistory";
import { User } from "../../types/types";

type TabPanel = {
  label: string;
};

const tabPanels: TabPanel[] = [
  { label: "Patients" },
  { label: "Hospitals" },
  { label: "Visit History" },
];

export const Dashboard = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState<User | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<User | null>(null);

  const onPatientSelect = (user: User) => {
    setSelectedTabIndex(2);
    setSelectedPatient(user);
  };

  const onHospitalSelect = (user: User) => {
    setSelectedTabIndex(2);
    setSelectedHospital(user);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  const onDeletePatient = () => {
    setSelectedPatient(null);
  };

  const onDeleteHospital = () => {
    setSelectedHospital(null);
  };

  const ActiveTabPanel = () => {
    switch (selectedTabIndex) {
      case 0:
        return <Patients onPatientSelect={onPatientSelect} />;
      case 1:
        return <Hospitals onHospitalSelect={onHospitalSelect} />;
      case 2:
        return selectedPatient && selectedHospital ? (
          <VisitHistory
            patient={selectedPatient}
            hospital={selectedHospital}
            onDeletePatient={onDeletePatient}
            onDeleteHospital={onDeleteHospital}
          />
        ) : selectedPatient ? (
          <VisitHistory
            patient={selectedPatient}
            onDeletePatient={onDeletePatient}
          />
        ) : selectedHospital ? (
          <VisitHistory
            hospital={selectedHospital}
            onDeleteHospital={onDeleteHospital}
          />
        ) : (
          <VisitHistory />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }} mt={5}>
        <Tabs value={selectedTabIndex} onChange={handleChange} centered>
          {tabPanels.map((panel: TabPanel) => {
            return (
              <Tab
                label={panel.label}
                sx={{ textTransform: "none", fontSize: 24 }}
                key={panel.label}
              />
            );
          })}
        </Tabs>
      </Box>
      <ActiveTabPanel />
    </>
  );
};
