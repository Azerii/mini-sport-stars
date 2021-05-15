import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink, Route } from "react-router-dom";
import styled from "styled-components";
import { dashboardProfileBlack, plus } from "../../assets";
import AlertBox from "../../components/AlertBox";
import Button from "../../components/Button";
import Caption from "../../components/Caption";
import FormGroup from "../../components/FormGroup";
import Spacer from "../../components/Spacer";
import Modal from "../../components/Modal";
import {
  getChildren,
  getProfile,
  updateProfile,
  removeChild,
  setTempChildId,
} from "../../redux/actions";
import { formDataToJSON } from "../../utils";

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
      font-size: 12px;
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

const Profile = (props) => {
  const [loading, setLoading] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [success, setSuccess] = useState(false);

  const showSuccessAlert = (msg = "...", _success = false) => {
    setSuccess(_success);
    setAlertText(msg);

    document.querySelector(".alertBox").classList.add("show");
    setTimeout(
      () => document.querySelector(".alertBox").classList.remove("show"),
      3000
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data_JSON = formDataToJSON(formData);

    setLoading(true);

    let res = await updateProfile(data_JSON);

    if (res && res.status === "success") {
      setLoading(false);
      showSuccessAlert(res.message, true);
    } else if (res && res.status === "error") {
      setLoading(false);
      showSuccessAlert(res.message, false);
    } else {
      setLoading(false);
      showSuccessAlert("Something went wrong", false);
    }
  };

  const handleRemoveChild = async () => {
    setLoading(true);

    let res = await removeChild(props.temp_child_id);

    if (res && res.status === "success") {
      setLoading(false);
      showSuccessAlert(res.message, true);
      setTimeout(() => {
        window.location.replace("/dashboard/profile/children");
      }, 3000);
    } else if (res && res.status === "error") {
      setLoading(false);
      showSuccessAlert(res.message, false);
    } else {
      setLoading(false);
      showSuccessAlert("Something went wrong", false);
    }
  };

  useEffect(() => {
    getProfile();
    getChildren();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AlertBox success={success} className="alertBox" text={alertText} />
      <Spacer y={3.6} />
      <Wrapper>
        <Spacer y={1.2} />
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
            to="/dashboard/profile/children"
            activeClassName="active"
          >
            <span>Children</span>
            <div className="activeBar"></div>
          </NavLink>
        </Tabs>
        <Spacer y={3.6} />

        {/* Account overview */}
        <Route exact path="/dashboard/profile">
          <form onSubmit={handleUpdate}>
            <FormGroup
              fieldStyle="shortText"
              inputType="text"
              name="full_name"
              placeholder="Full name"
              defaultValue={props.user.full_name}
              required
            />
            <Spacer y={2.4} />
            <FormGroup
              fieldStyle="shortText"
              inputType="email"
              name="email"
              placeholder="Email address"
              defaultValue={props.user.email}
            />
            <Spacer y={2.4} />
            <FormGroup
              fieldStyle="shortText"
              inputType="text"
              name="phone_number"
              placeholder="Phone number"
              defaultValue={props.user.phone_number}
              required
            />
            <Spacer y={2.4} />
            <FormGroup
              fieldStyle="shortText"
              inputType="text"
              name="address"
              placeholder="Address"
              defaultValue={props.user.address}
              required
            />
            <Spacer y={4.8} />
            <Button
              text={loading ? "..." : "Save changes"}
              disabled={loading}
              fullWidth
            />
            <Spacer y={4.8} />
          </form>
        </Route>

        {/* Children */}
        <Route path="/dashboard/profile/children">
          <AddAnother
            as="a"
            href="/add-child?redirect=/dashboard/profile/children"
          >
            <img src={plus} alt="Plus" className="plusIcon" />
            <Spacer x={1.2} />
            <span>Add another child</span>
          </AddAnother>
          <Spacer y={3.6} />
          {props.children &&
            props.children.length &&
            props.children.map((child, index) => (
              <div key={`child_${index + 1}`}>
                <Child>
                  <div className="info">
                    <img
                      src={dashboardProfileBlack}
                      alt="Profile Icon"
                      className="icon"
                    />
                    <Spacer x={1.2} />
                    <span>{child.name}</span>
                  </div>
                  <Link
                    to="/dashboard/profile/children/remove-child"
                    className="remove"
                    onClick={() => props.setTempChildId(child.id)}
                  >
                    remove
                  </Link>
                </Child>
                <Spacer y={2.4} />
              </div>
            ))}
        </Route>

        {/* Remove child confirmation */}
        <Route path="/dashboard/profile/children/remove-child">
          <Modal>
            <div className="inner">
              <Spacer y={4.8} />
              <Caption
                heading={`Are you sure you want\nto remove this child?`}
                subHeading={`This action cannot be undone`}
                align="center"
                fullWidth
              />
              <Spacer y={4.8} />
              <div className="actionBtns">
                <Link
                  to="/dashboard/profile/children"
                  className="btn secondary"
                >
                  Cancel
                </Link>
                <button
                  className={`btn primary ${loading ? "disabled" : ""}`}
                  onClick={handleRemoveChild}
                  disabled={loading ? true : false}
                >
                  {loading ? "..." : "Remove"}
                </button>
              </div>
            </div>
          </Modal>
        </Route>
      </Wrapper>
      <Spacer y={3.6} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    children: state.children,
    temp_child_id: state.temp_child_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTempChildId: (id) => dispatch(setTempChildId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
