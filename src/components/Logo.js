import styled from "styled-components";
import PropTypes from "prop-types";
import { logoMain } from "../assets";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;

  .logo {
    height: 6rem;
  }

  .text {
    font-family: Gordita;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: 0px;
    margin-left: 1.2rem;
  }
`;

const Logo = ({ className, noText }) => {
  return (
    <Wrapper className={className}>
      <img src={logoMain} alt="LOGO" className="logo" />
      {!noText && <span className="text">Mini Sport Stars FC</span>}
    </Wrapper>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  noText: PropTypes.string,
};

export default Logo;
