import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

/** top app bar
 */
export default function TopAppBar() {
  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Typography>漢字練習帳クリエーター</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            aria-label="github"
            color="inherit"
            href="https://github.com/sikepuri-hanyu/hanzi-workbook-creator"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
