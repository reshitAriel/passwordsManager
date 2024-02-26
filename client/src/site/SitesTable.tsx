import { FC } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Site } from "../types/site.interface";
import EditIcon from "@mui/icons-material/Edit";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

interface SitesTableProps {
  sites?: Site[];
  handleEditClick: (site: Site) => void;
  handleDeleteClick: (site: Site) => void;
}

const SitesTable: FC<SitesTableProps> = ({
  sites,
  handleEditClick,
  handleDeleteClick,
}) => {
  if (!sites?.length) return <Typography>No Websites</Typography>;

  return (
    <TableContainer component={Paper} sx={{ minWidth: 650, maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Website</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sites.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleEditClick(row)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleDeleteClick(row)}>
                  <DeleteRoundedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SitesTable;
