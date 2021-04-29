import styled from "styled-components";

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 33%;
  }

  .skip {
    display: block;
    font-family: Gordita;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: center;
    color: #00000030;

    &:hover {
      color: #00000050;
    }
  }

  @media screen and (max-width: 768px) {
    form {
      width: 90%;
    }
  }
`;

export default AuthWrapper;
