import "./VisitHistory.scss";
import {
  Box,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { History, User } from "../../types/types";
import { getVisitHistory } from "../../services/patient.service";
import FaceIcon from "@mui/icons-material/Face";
import MedicationIcon from "@mui/icons-material/Medication";

interface VisitHistoryProps {
  patient?: User;
  hospital?: User;
  onDeletePatient?: () => void;
  onDeleteHospital?: () => void;
}

export const VisitHistory: React.FC<VisitHistoryProps> = ({
  patient,
  hospital,
  onDeletePatient,
  onDeleteHospital,
}) => {
  const [rows, setRows] = useState<History[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const entities = await getVisitHistory(patient?.id, hospital?.id);
      setRows(entities);
    };
    fetchHistory();
  }, [patient?.id, hospital?.id]);

  const handleClick = () => {};

  return (
    <>
      <Box display="flex" justifyContent="center" mt={10}>
        <Box maxWidth={"90%"} width={"80%"}>
          <Typography mb={4} variant="h4" align="center">
            Visit History
          </Typography>
          <Box mb={4}>
            <Stack direction="row" spacing={1}>
              {patient ? (
                <Chip
                  icon={<FaceIcon />}
                  label={patient?.name}
                  variant="outlined"
                  onClick={handleClick}
                  onDelete={onDeletePatient}
                  color="primary"
                />
              ) : null}
              {hospital ? (
                <Chip
                  icon={<MedicationIcon />}
                  label={hospital?.name}
                  variant="outlined"
                  onClick={handleClick}
                  onDelete={onDeleteHospital}
                  color="primary"
                />
              ) : null}
            </Stack>
          </Box>
          <Box mb={4}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Patient Name</TableCell>
                    <TableCell align="center">Hospital Name</TableCell>
                    <TableCell align="center">Visit Date</TableCell>
                    <TableCell align="center">Reason For Visit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.visitId}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.patientName}
                      </TableCell>
                      <TableCell align="center">{row.hospitalName}</TableCell>
                      <TableCell align="center">{row.visitDate}</TableCell>
                      <TableCell align="left">{row.reasonForVisit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
};
