import { useState } from "react";
import { NavLink, Route } from "react-router-dom";
import styled from "styled-components";
import { dashboardProfileBlack, plus } from "../../assets";
import AlertBox from "../../components/AlertBox";
import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import Spacer from "../../components/Spacer";

const Wrapper = styled.div`
  width: 70%;
  margin: auto;
  background-color: #ffffff;
  padding: 2.4rem 14.4rem;

  .title {
    color: #000000;
    font-family: Gordita;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
  }

  form {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    padding: 2.4rem;
    width: 100%;
  }
`;

const Tabs = styled.div`
  display: flex;
  width: fit-content;

  .tabLink {
    width: fit-content;
    padding: 1.2rem 2.4rem;
    border-bottom: 2px solid #c4c4c4;
    font-family: Gordita;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0px;
    position: relative;

    .activeBar {
      height: 4px;
      width: 100%;
      background-color: #cd2853;
      border-radius: 4px;
      position: absolute;
      bottom: -2px;
      left: 0;
      opacity: 0;
      transition: opacity 250ms ease-in;
    }

    &.active {
      color: #cd2853;

      .activeBar {
        opacity: 1;
      }
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;

    .tabLink {
      width: 50%;
      font-size: 10px;
      line-height: normal;
      padding: 1.2rem 0;
      text-align: center;
    }
  }
`;

const AddAnother = styled.button`
  display: flex;
  align-items: center;
  width: fit-content;
  font-family: Gordita;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;

  .plusIcon {
    height: 2.4rem;
  }
`;

const Child = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .info {
    display: flex;
    align-items: center;
    font-family: Gordita;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: ##1a1a1a;

    .icon {
      height: 2rem;
    }
  }

  .remove {
    background-color: transparent;
    color: #cd2853;
    font-family: Gordita Light;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
  }
`;

const tempChildren = [
  "Dibie Tobi",
  "Dibie Dayo",
  "Dibie Chibuikem",
  "Dibie Esther",
];

const Profile = () => {
  const [children] = useState(tempChildren);
  const addAnotherChild = (e) => {
    e.preventDefault();

    document.querySelector(".alertBox").classList.add("show");
    setTimeout(
      () => document.querySelector(".alertBox").classList.remove("show"),
      3000
    );
  };
  return (
    <>
      <AlertBox className="alertBox" text="Child saved successfully" />
      <Spacer y={3.6} />
      <Wrapper>
        <h2 className="title">My profile</h2>
        <Spacer y={4.8} />
        <Tabs>
          <NavLink
            className="tabLink"
            exact
            to="/dashboard/profile"
            activeClassName="active"
          >
            <span>Account overview</span>
            <div className="activeBar"></div>
          </NavLink>
          <NavLink
            className="tabLink"
            exact
            to="/dashboard/profile/add-child"
            activeClassName="active"
          >
            <span>Add child</span>
            <div className="activeBar"></div>
          </NavLink>
        </Tabs>
        <Spacer y={3.6} />

        {/* Account overview */}
        <Route exact path="/dashboard/profile">
          <form>
            <FormGroup
              fieldStyle="shortText"
              inputType="text"
              name="full_name"
              placeholder="Full name"
              defaultValue="Dibie Natasha"
            />
            <Spacer y={2.4} />
            <FormGroup
              fieldStyle="shortText"
              inputType="email"
              name="email_address"
              placeholder="Email address"
              defaultValue="natashadibie@gmail.com"
            />
            <Spacer y={2.4} />
            <FormGroup
              fieldStyle="shortText"
              inputType="text"
              name="phone_number"
              placeholder="Phone number"
              defaultValue="(239) 555-0108"
            />
            <Spacer y={2.4} />
            <FormGroup
              fieldStyle="shortText"
              inputType="text"
              name="address"
              placeholder="Address"
              defaultValue="6391 Elgin St. Celina, Delaware 10299"
            />
            {/* <Spacer y={2.4} />
            <FormGroup
              className="password"
              fieldStyle="shortText"
              inputType="password"
              name="password"
              placeholder="Password"
              defaultValue="shabalaba"
            /> */}
            <Spacer y={4.8} />
            <Button text="Save changes" fullWidth />
            <Spacer y={4.8} />
          </form>
        </Route>

        {/* Add child */}
        <Route path="/dashboard/profile/add-child">
          <AddAnother onClick={addAnotherChild}>
            <img src={plus} alt="Plus" className="plusIcon" />
            <Spacer x={1.2} />
            <span>Add another child</span>
          </AddAnother>
          <Spacer y={3.6} />
          {children.length &&
            children.map((child, index) => (
              <div key={`child_${index + 1}`}>
                <Child>
                  <div className="info">
                    <img
                      src={dashboardProfileBlack}
                      alt="Profile Icon"
                      className="icon"
                    />
                    <Spacer x={1.2} />
                    <span>{child}</span>
                  </div>
                  <button className="remove">remove</button>
                </Child>
                <Spacer y={2.4} />
              </div>
            ))}
        </Route>
      </Wrapper>
      <Spacer y={3.6} />
    </>
  );
};

export default Profile;
