import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #00000040;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4.8rem 0;
  z-index: 10;

  .inner {
    width: 50%;
    background-color: #ffffff;
    padding: 4.8rem;
    position: relative;
    flex-shrink: 0;
  }

  form {
    width: 100%;
  }

  .closeIcon {
    position: absolute;
    top: 2.4rem;
    right: 2.4rem;
    cursor: pointer;

    img {
      height: 2.4rem;
    }
  }

  .title {
    font-family: Gordita;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
  }

  .listItem {
    padding: 0.8rem 2.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #00000015;
    cursor: pointer;

    .info {
      display: flex;
      align-items: flex-start;
      font-family: Gordita;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: left;
      color: ##1a1a1a;
      pointer-events: none;

      .icon {
        height: 2rem;
        pointer-events: none;
      }
    }

    .label {
      font-family: Gordita;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: left;
      color: #00000050;
      pointer-events: none;
      pointer-events: none;
    }

    .checkBox {
      pointer-events: none;
    }

    &.selected {
      border-color: #00000050;

      .label {
        color: #000000;
      }
    }
  }

  .infoText {
    font-size: 1.4rem;
  }

  .actionBtns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 6rem;

    .btn {
      display: inline-block;
      width: 100%;
      padding: 1.2rem 0;
      font-family: Gordita;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      letter-spacing: 0px;
      text-align: center;
      border-radius: 1rem;
      border: none;
      background-color: #ffffff;
      transition: all 250ms ease-in;

      &.secondary {
        border: 1px solid #cd285350;
        color: #00000050;
      }

      &.primary {
        color: #ffffff;
        background-color: #cd2853;
      }

      &.disabled {
        color: #ffffff !important;
        background-color: #d9d9d9 !important;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .inner {
      width: 90%;
      padding: 2.4rem;
      margin-top: 2.4rem;
    }

    .actionBtns {
      .btn {
        font-size: 16px;
      }
    }
  }
`;

export default Modal;
