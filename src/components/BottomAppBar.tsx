import { Link } from "react-router-dom";
import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import PreviewIcon from "@mui/icons-material/Preview";
import PrintIcon from "@mui/icons-material/Print";

/**
 * bottom app bar
 */
export default function BottomAppBar(): JSX.Element {
  return (
    <>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            component={Link}
            to="/"
            label="エディター"
            icon={<CreateIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/preview"
            label="プレビュー"
            icon={<PreviewIcon />}
          />
          <BottomNavigationAction
            component={Link}
            to="/print"
            label="印刷"
            icon={<PrintIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}
