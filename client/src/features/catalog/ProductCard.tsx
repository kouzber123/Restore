import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";

interface Props {
  product: Product; //! passing individual data so no array
}

export default function ProductCard({ product }: Props) {
  return (
    <Card>
      <CardHeader avatar={<Avatar sx={{ bgcolor: "secondary.main" }}>{product.name.charAt(0).toUpperCase()}</Avatar>} title={product.name} titleTypographyProps={{ sx: { fontWeight: "bold", color: "primary.main" } }} />
      <CardMedia component="img" sx={{ height: 140, objectFit: "contain", bgcolor: "primary.light" }} image={product.pictureUrl} alt="green iguana" title={product.name} />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          £ {(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
}
