import styled from "styled-components";
import PropTypes from "prop-types";
import { checkedIcon } from "../assets";
import { useState } from "react";

const greyFilter =
  "brightness(0) saturate(100%) invert(65%) sepia(9%) saturate(325%) hue-rotate(166deg) brightness(87%) contrast(84%)";

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  height: 1.8rem;
  width: 1.8rem;
  border: 2px solid ${(props) => (props.grey ? "#899198" : "#000000")};
  border-radius: ${(props) => (props.circle ? "100%" : "2px")};
  cursor: pointer;

  input {
    display: none;
  }

  .checkedIcon {
    display: ${(props) => (props.checked ? "block" : "none")};
    height: 1rem;
    pointer-events: none;
    filter: ${(props) => (props.grey ? greyFilter : "unset")};
  }
`;

const handleClick = (id) => {
  const checkboxInput = document.querySelector(`input[type="checkbox"]#${id}`);
  checkboxInput.click();
};

const CheckBox = ({ name, grey, circle }) => {
  const [checked, setChecked] = useState(false);

  return (
    <Box
      grey={grey}
      circle={circle}
      checked={checked}
      onClick={() => handleClick(name)}
    >
      <input
        type="checkbox"
        name={name}
        id={name}
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <img src={checkedIcon} alt="check" className="checkedIcon" />
    </Box>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string,
  grey: PropTypes.bool,
  circle: PropTypes.bool,
};

export default CheckBox;
