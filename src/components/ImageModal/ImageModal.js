import { Modal } from "react-bootstrap";
import Image from "material-ui-image";

const cloudinary_host = process.env.REACT_APP_CLOUDINARY_URL;

const ImageModal = (props) => {
  const show = props.show;
  const handleClose = props.handleClose;
  const imgUrl = props.imageUrl;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="xl" //xl, lg
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Image
          src={`${cloudinary_host}/w_1100,h_900,c_scale/v1616604961/${imgUrl}`}
          style={{ float: "center" }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
