import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const cloudinary_host = process.env.REACT_APP_CLOUDINARY_URL;

const EditImage = (props) => {
  const id = props.imgId;
  const productId = props.productId;

  return (
    <Card>
      <CardMedia
        component="img"
        height="400rem"
        image={`${cloudinary_host}/v1616604961/${id}`}
        title="Contemplative Reptile"
      />
      <CardActions disableSpacing>
        <IconButton
          aria-label="delete"
          onClick={() => {
            props.onDelete(id, productId);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EditImage;
