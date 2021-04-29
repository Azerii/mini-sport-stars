import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Spacer from "./Spacer";

const Wrapper = styled.div`
  text-align: ${(props) => props.align ?? "left"};
  padding: 0 2.4rem;

  .heading {
    color: #1a1a1a;
    font-family: Gordita;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: 48px;
    letter-spacing: 0px;
  }

  .subHeading {
    color: ${(props) => props.subHeadingColor ?? "#8D9091"};
    font-family: Gordita;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
  }

  @media screen and (max-width: 768px) {
    padding: 0;
    width: 90%;

    .heading {
      font-size: 24px;
      line-height: 36px;
    }
    .subHeading {
      font-size: 14px;
      line-height: 22px;
    }
  }
`;

const Caption = ({
  className,
  heading,
  subHeading,
  subHeadingColor,
  align,
}) => {
  const styleProps = { className, subHeadingColor, align };
  return (
    <Wrapper {...styleProps}>
      <h2 className="heading textLargeBold">
        {heading &&
          heading.split("\n").map((section) => (
            <span key={section}>
              {section}
              <br />
            </span>
          ))}
      </h2>
      <Spacer y={1.2} />
      <h4 className="subHeading textRegular">
        {subHeading &&
          subHeading.split("\n").map((section) => (
            <span key={section}>
              {section}
              <br />
            </span>
          ))}
      </h4>
    </Wrapper>
  );
};

Caption.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string,
  subHeadingColor: PropTypes.string,
  align: PropTypes.string,
};

export default Caption;
