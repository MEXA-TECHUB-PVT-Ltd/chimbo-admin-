/*eslint-disable*/
import React from "react";
import Carousel from "react-material-ui-carousel";
import ImgsViewer from "react-images-viewer";
import { Image } from "antd";
import homeDecor2 from "assets/images/download.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import BASE_URL from "BASE_URL";
import burceMars from "assets/images/noProfile.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",

  boxShadow: 24,
};
const ImageViewer = ({ images }) => {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const handleOpen = (index) => {
    setIndex(index);
    setOpen(true);
  };
  const fileType = homeDecor2.split(".").pop();
  console.log(fileType);
  const handleClose = () => setOpen(false);
  console.log(images.length);
  const imagesArray =
    images.length !== 0
      ? images?.map((item) => {
          // const fileType = item.split(".").pop();
          // console.log(fileType);
          // const fileType2 = fileType === ("jpg" || "png" || "jpeg") ? "image" : "video";
          // console.log(fileType2);
          return item !== undefined ? item.replace("public", `${BASE_URL}`) : burceMars;
        })
      : [homeDecor2];
  console.log(imagesArray);
  const arrayOfImages = imagesArray;
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
              <Carousel
                index={index}
                indicators={false}
                sx={{ width: 600, height: 600, textAlign: "center", background: "gray" }}
                autoPlay={false}
              >
                {arrayOfImages.map((item, index) => {
                  if (item.split(".").pop() === ("jpg" || "png" || "jpeg")) {
                    return <img src={item} width="fit-content" height="600" key={index} />;
                  } else {
                    return (
                      <video
                        controls
                        key={index}
                        preload="metadata"
                        width="fit-content"
                        height="600"
                      >
                        <source src={item} />
                      </video>
                    );
                  }
                })}
              </Carousel>
            </Typography>
          </Box>
        </Modal>
      </div>
      <Carousel
        sx={{
          width: 300,
          height: 300,
          cursor: "pointer",
          textAlign: "center",
          background: "#dbd9d3",
          borderRadius: "10px",
        }}
      >
        {arrayOfImages.map((item, index) => {
          if (item.split(".").pop() === ("jpg" || "png" || "jpeg")) {
            return (
              <img
                src={item}
                width="fit-content"
                height="300"
                onClick={() => {
                  handleOpen(index);
                }}
                key={index}
              />
            );
          } else {
            return (
              <video
                onClick={() => {
                  handleOpen(index);
                }}
                key={index}
                preload="metadata"
                width="fit-content"
                height="300"
              >
                <source src={item} />
              </video>
            );
          }
        })}
      </Carousel>
    </>
  );
};

export default ImageViewer;
