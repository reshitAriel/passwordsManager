import SitesTable from "./SitesTable";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import SitePopup from "./SitePopup";
import axios from "axios";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";
import { Site } from "../types/site.interface";

const SitesPage = () => {
  const [isSitePopupOpen, setIsSitePopupOpen] = useState(false);
  useState(false);
  const [editingSite, setEditingSite] = useState<Site>();
  const [siteToDelete, setSiteToDelete] = useState<Site>();

  const { data: sites, refetch } = useQuery({
    queryKey: ["sites"],
    async queryFn() {
      const { data } = await axios.get<Site[]>("/api/site");

      return data;
    },
  });

  const handleSave = () => {
    refetch();
  };

  const handleEditClick = (site: Site) => {
    setEditingSite(site);
    setIsSitePopupOpen(true);
  };

  const handleDeleteClick = (site: Site) => {
    setSiteToDelete(site);
  };

  const handleCloseSitePopup = () => {
    setIsSitePopupOpen(false);
    setEditingSite(undefined);
  };

  const handleCloseDeleteSitePopup = () => {
    setSiteToDelete(undefined);
    refetch();
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box display="flex" justifyContent="space-between" paddingBlock="2rem">
        <Typography>Passwords Manager</Typography>
        <Button onClick={() => setIsSitePopupOpen(true)} variant="contained">
          new Website
        </Button>
      </Box>
      <Box flexGrow={1}>
        <SitesTable
          sites={sites}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
        <SitePopup
          site={editingSite}
          open={isSitePopupOpen}
          onCloseSitePopup={handleCloseSitePopup}
          handleSave={handleSave}
        />
        <ConfirmDeletePopup
          open={!!siteToDelete}
          name={siteToDelete?.name}
          itemId={siteToDelete?.id}
          onClosePopup={handleCloseDeleteSitePopup}
          deleteUrl="/api/site"
        />
      </Box>
    </Box>
  );
};

export default SitesPage;
