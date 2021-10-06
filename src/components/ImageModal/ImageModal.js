import { Modal } from "react-bootstrap";
import Image from "material-ui-image";

const ImageModal = (props) => {
  const show = props.show;
  const handleClose = props.handleClose;
  const imgUrl = props.imageUrl;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg" //xl
      centered
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Image
          src={`https://res.cloudinary.com/dfurufcqe/image/upload/w_1100,h_600,c_scale/v1616604961/${imgUrl}`}
          style={{ float: "center" }}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
