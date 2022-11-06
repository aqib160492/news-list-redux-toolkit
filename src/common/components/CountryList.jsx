import { Card, Grid, Select, MenuItem } from "@mui/material";
import { constant } from "../../common/constant";
import { useDispatch } from "react-redux";
import { sortItem } from "../../features/news-list/newsSlice";

const CountryList = ({ country, setCountry }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Grid item md={6} variant={Card}>
        country:{" "}
        <Select value={country} onChange={(e) => setCountry(e.target.value)}>
          {constant.COUNTRIES.map((country) => {
            return (
              <MenuItem key={country.value} value={country.value}>
                {country.value}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
      <Grid item md={6} variant={Card}>
        Sort:{" "}
        <Select
          defaultValue={"ASC"}
          onChange={(e) => dispatch(sortItem(e.target.value))}>
          <MenuItem key={"ASC"} value={"ASC"}>
            {"ASC"}
          </MenuItem>
          <MenuItem key={"DESC"} value={"DESC"}>
            {"DESC"}
          </MenuItem>
        </Select>
      </Grid>
    </>
  );
};
export default CountryList;
