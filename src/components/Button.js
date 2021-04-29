import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.2rem;
  height: 5.6rem;
  width: ${(props) =>
    props.fullWidth ? "100%" : props.width ?? "fit-content"};
  padding: 0 3.6rem;
  background-color: ${(props) => (props.disabled ? "#D9D9D9" : "#cd2853")};
  color: #ffffff;
  font-family: Eudoxus Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.75px;
  text-align: center;
  transition: background 250ms ease-in;

  &:hover {
    background-color: ${(props) => (props.disabled ? "#D9D9D9" : "#cd2853")};
  }
`;

const Button = ({
  className,
  type,
  fullWidth,
  width,
  text,
  disabled,
  color,
  as,
  href,
}) => {
  const styleProps = {
    className,
    type,
    fullWidth,
    width,
    text,
    disabled,
    color,
    as,
    href,
  };
  return <Wrapper {...styleProps}>{text}</Wrapper>;
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  width: PropTypes.string,
};

export default Button;
