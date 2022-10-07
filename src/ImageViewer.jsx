/*eslint-disable*/
import React from "react";
import Carousel from "react-material-ui-carousel";
import ImgsViewer from "react-images-viewer";
import { Image } from "antd";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",

  boxShadow: 24,
};
const ImageViewer = () => {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const handleOpen = (index) => {
    setIndex(index);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const arrayOfImages = [homeDecor3, homeDecor3, homeDecor2, homeDecor3];
  return (
    <>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <Carousel index={index} indicators={false} sx={{ width: 900 }}>
                {arrayOfImages.map((item, index) => (
                  <img src={item} key={index} width="100%" />
                ))}
              </Carousel>
            </Typography>
          </Box>
        </Modal>
      </div>
      <Carousel sx={{ width: 600, cursor: "pointer" }}>
        {arrayOfImages.map((item, index) => (
          <img
            src={item}
            width="100%"
            onClick={() => {
              handleOpen(index);
            }}
            key={index}
          />
        ))}
      </Carousel>
    </>
  );
};

export default ImageViewer;
