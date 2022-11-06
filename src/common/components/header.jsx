import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Container,
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto"
  }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch"
      }
    }
  }
}));

const Header = () => {
  const [data, setData] = useState("");
  const params = useParams();
  const history = useNavigate();
  const searchResult = (e) => {
    e.preventDefault();
    history("/search/" + data);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters={true}>
            <Typography
              variant="h6"
              noWrap
              component="h1"
              sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}>
              NEWS
            </Typography>
            <form onSubmit={(e) => searchResult(e)}>
              <Search>
                <StyledInputBase
                  defaultValue={params.query}
                  placeholder="Search…"
                  onChange={(e) => setData(e.target.value)}
                  inputProps={{ "aria-label": "search" }}
                />
                <Button
                  style={{ color: "white" }}
                  onClick={(e) => searchResult(e)}>
                  <SearchIcon />
                </Button>
              </Search>
            </form>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
