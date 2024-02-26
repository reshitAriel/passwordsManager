import { FC, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Site } from "../types/site.interface";
import { siteSchema } from "./siteSchema";
import { PasswordInput } from "../components/PasswordInput";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyIcon from "@mui/icons-material/Key";
import { useCopyToClipboard } from "react-use";
import { generatePassword } from "../tools/random-password.function";

type SitePopupProps = {
  site?: Site;
  onCloseSitePopup: () => void;
  handleSave: (site: Site) => void;
} & DialogProps;

const SitePopup: FC<SitePopupProps> = ({
  site: propsSite,
  onCloseSitePopup,
  handleSave,
  ...dialogProps
}) => {
  const [site, setSite] = useState<Partial<Site & { confirmPassword: string }>>(
    {}
  );
  const [error, setError] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    setSite(propsSite || {});
    return () => {
      setSite({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogProps.open]);

  const saveSiteMutation = useMutation({
    mutationKey: ["save-site"],
    mutationFn: async (data: Partial<Site & { confirmPassword: string }>) => {
      const response = await axios.post("/api/site", data);
      return response.data;
    },
    onSuccess: (data: Site) => {
      onCloseSitePopup();
      handleSave(data);
    },
  });

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async () => {
    try {
      await siteSchema.validate(site);
      saveSiteMutation.mutate(site);
    } catch (err) {
      setError((err as Record<string, string>)?.message);
    }
  };

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setSite((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleGeneratePasswordClick = () => {
    const password = generatePassword();
    copyToClipboard(password);

    setSite((prev) => ({ ...prev, password }));
  };

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>
        <IconButton onClick={onCloseSitePopup}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ paddingTop: "0.5rem !important" }}>
        <FormControl sx={{ gap: "1.5rem" }}>
          <TextField
            label="Website"
            variant="outlined"
            id="name"
            value={site?.name || ""}
            onChange={handleChange}
          />
          <TextField
            label="Username"
            variant="outlined"
            id="username"
            value={site?.username || ""}
            onChange={handleChange}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PasswordInput
              id="password"
              label="Password"
              value={site?.password || ""}
              onChange={handleChange}
            />
            {!site.id && (
              <Tooltip title="Generate random password" arrow>
                <IconButton onClick={handleGeneratePasswordClick}>
                  <KeyIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>

          {!!error && <Alert severity="warning">{error}</Alert>}
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default SitePopup;
