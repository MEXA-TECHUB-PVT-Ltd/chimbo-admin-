import { styled } from "@mui/material/styles";
/*eslint-disable*/
const arrowButton = styled('button')({



    display: "block",
    width: "42px",
    height: "42px",
    lineHeight: "9px",
    border: "1px solid #f5f5f5",
    borderRadius: "50%",
    color: "black",
    textAlign: "center",
    textDecoration: "none",
    background: "transparent",
    boxShadow: "0 0 3px black",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {


        color: "#1A73E8"

    }



})


const NBButton = styled(arrowButton)({
    border: "1px solid #f5f5f5",
    background: "transparent",
    color: "black",
    lineHeight: "0px",
})

export default arrowButton;
export { NBButton };