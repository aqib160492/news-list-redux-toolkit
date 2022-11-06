import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Link
} from "@mui/material";
import { useDispatch } from "react-redux";
import { hideItem } from "../../features/news-list/newsSlice";

const NewsCard = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <Grid item md={4} sm={12} display="flex" key={item.title}>
      <Card width="100%">
        <CardMedia
          component="img"
          height="180"
          image={item.urlToImage}
          alt={item.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => dispatch(hideItem(item))}>
            Hide
          </Button>
          <Link
            variant="button"
            href={item.url}
            underline="none"
            target="_blank"
            rel="noopener"
            size="small">
            Read More
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default NewsCard;
