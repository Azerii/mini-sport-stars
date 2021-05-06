import styled from "styled-components";
import PropTypes from "prop-types";
import Spacer from "../../components/Spacer";
import CheckBox from "../../components/CheckBox";
import {
  advancedCentre,
  birthdayParties,
  close,
  dashboardProfileBlack,
  halfTerm,
  oneToOneCoaching,
  saturdayMorningFootball,
  trialDays,
} from "../../assets";
import { useState } from "react";
import { Route, useHistory } from "react-router";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4.8rem;
`;

const NoEvents = styled.p`
  font-family: Gordita;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;
`;

const Card = styled(Link)`
  display: block;
  padding: 2.4rem;
  background-color: #ffffff;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0px 0px 3px #00000008;
  transition: all 250ms ease-out;

  &:hover {
    box-shadow: 0px 0px 23px #00000008;
    transform: scale(1.05);
  }

  .imgWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 13.6rem;
    border-radius: 1rem;
    overflow: hidden;
    pointer-events: none;

    img {
      width: 100%;
    }
  }

  .title {
    font-family: Gordita;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0px;
    pointer-events: none;
  }

  .desc {
    font-family: Gordita;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    pointer-events: none;
  }
`;

const Paynow = styled.div`
  .activityRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 0;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
    text-align: left;
    color: #000000;
  }

  .divider {
    border-top: 1px solid #000000;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #00000040;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  .inner {
    width: 50%;
    background-color: #ffffff;
    padding: 4.8rem;
    margin: 4.8rem 0;
    position: relative;
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
    letter-spacing: 0px;
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

      .icon {
        height: 2rem;
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
      line-height: 27px;
      letter-spacing: 0px;
      text-align: center;
      border-radius: 1rem;
      border: none;
      background-color: #ffffff;

      &.secondary {
        border: 1px solid #cd285350;
        color: #00000050;
      }

      &.primary {
        color: #ffffff;
        background-color: #cd2853;
      }
    }
  }
`;

const tempEvents = [
  {
    imgSrc: oneToOneCoaching,
    title: "1 to 1 Coaching",
    desc:
      "This customized training will involve helping the player to identify their strengths and weaknesses. ",
  },
  {
    imgSrc: advancedCentre,
    title: "Advanced Centre",
    desc:
      "Designed to help players take their game to the ‘next level’, the Advanced Centre is a potent ground for attending players to improve their already-established skills.",
  },
  {
    imgSrc: saturdayMorningFootball,
    title: "Saturday Morning Football",
    desc:
      "The aim of these sessions is to engage as many children as possible, keeping them active during the weekend. ",
  },
  {
    imgSrc: halfTerm,
    title: "Half Term",
    desc:
      "At these days, we run a variety of different games and activities for the children to participate in. Some of these games consist of football, bastketball, tag Rugby and many more.",
  },
  {
    imgSrc: birthdayParties,
    title: "Birthday Parties",
    desc:
      "Come and join the fun as we deliver fun and inclusive birthday parties ready to cater your needs! Ranging from Multi-sports parties, football parties or parties full of fun games.",
  },
  {
    imgSrc: trialDays,
    title: "Trial Days",
    desc:
      "We welcome aspiring players of all abilities to the club and we are convinced that with our unique coaching methods, all representatives of the club will succeed. ",
  },
];
const tempChildren = [
  "Dibie Tobi",
  "Dibie Dayo",
  "Dibie Chibuikem",
  "Dibie Esther",
];

const activities = [
  "Reception / Year 1 Football",
  "Year 2 / Year 3 Football",
  "Year 4 / Year 5 / Year 6 Football",
  "Mums’ Football",
  "Dads’ Football",
];

const checkoutDetails = [
  {
    activity: "Reception / Year 1 Football",
    quantity: 1,
    price: 8.0,
  },
  {
    activity: "Mums’ Football",
    quantity: 2,
    price: 20.0,
  },
  {
    activity: "Year 4 / Year 5 / Year 6 Football",
    quantity: 1,
    price: 4.0,
  },
];

const Event = ({ href, imgSrc, title, desc }) => {
  return (
    <Card to={href}>
      <div className="imgWrapper">
        {imgSrc && <img src={imgSrc} alt={title} />}
      </div>
      <Spacer y={2.4} />
      {title && <h3 className="title">{title}</h3>}
      <Spacer y={1.2} />
      {desc && <p className="desc">{desc}</p>}
    </Card>
  );
};

const Events = () => {
  const history = useHistory();
  const [events] = useState(tempEvents);

  const handleSelect = (e, index) => {
    const selectedEl = e.target;

    selectedEl.classList.toggle("selected");
    document.querySelector(`input[type="checkbox"]#${index}`).click();
  };

  const handleSubmit = (e, target, pay) => {
    e.preventDefault();

    history.push(target);
  };

  return (
    <>
      <Spacer y={4.8} />
      <Wrapper>
        {!events.length && (
          <NoEvents>
            <span>There are no events currently.</span>
          </NoEvents>
        )}
        {events.length &&
          events.map((item) => (
            <Event
              key={item.title}
              imgSrc={item.imgSrc}
              title={item.title}
              desc={item.desc}
              href="/dashboard/events/register"
            />
          ))}
        <Spacer y={4.8} />
      </Wrapper>

      {/* Register child for event */}
      <Route path="/dashboard/events/register">
        <Modal>
          <div className="inner">
            <Link to="/dashboard/events" className="closeIcon">
              <img src={close} alt="close" />
            </Link>
            <h3 className="title">Register child for event</h3>
            <Spacer y={4.8} />
            <form
              onSubmit={(e) =>
                handleSubmit(e, "/dashboard/events/choose-activity")
              }
            >
              {tempChildren &&
                tempChildren.map((child, index) => (
                  <div key={`child_${index + 1}`}>
                    <div
                      className="listItem"
                      onClick={(e) => handleSelect(e, `child_${index + 1}`)}
                    >
                      <div className="info">
                        <img
                          src={dashboardProfileBlack}
                          alt="Profile Icon"
                          className="icon"
                        />
                        <Spacer x={1.2} />
                        <span>{child}</span>
                      </div>
                      <CheckBox
                        className="checkBox"
                        id={`child_${index + 1}`}
                        name={`child_${index + 1}`}
                        circle
                        grey
                      />
                    </div>
                    <Spacer y={2.4} />
                  </div>
                ))}
              <Spacer y={4.8} />
              <div className="actionBtns">
                <Link to="/dashboard/events" className="btn secondary">
                  Back
                </Link>
                <button className="btn primary">Continue</button>
              </div>
            </form>
          </div>
        </Modal>
      </Route>

      {/* Choose activity */}
      <Route path="/dashboard/events/choose-activity">
        <Modal>
          <div className="inner">
            <Link to="/dashboard/events" className="closeIcon">
              <img src={close} alt="close" />
            </Link>
            <h3 className="title">Choose activity</h3>
            <Spacer y={4.8} />
            <form
              onSubmit={(e) => handleSubmit(e, "/dashboard/events/payment")}
            >
              {activities &&
                activities.map((activity, index) => (
                  <div key={`class_${index + 1}`}>
                    <div
                      className="listItem"
                      onClick={(e) => handleSelect(e, `class_${index + 1}`)}
                    >
                      <span className="label">{activity}</span>
                      <CheckBox
                        className="checkBox"
                        id={`class_${index + 1}`}
                        name={`class_${index + 1}`}
                        circle
                        grey
                      />
                    </div>
                    <Spacer y={2.4} />
                  </div>
                ))}
              <Spacer y={4.8} />
              <div className="actionBtns">
                <Link to="/dashboard/events/register" className="btn secondary">
                  Back
                </Link>
                <button className="btn primary">Continue</button>
              </div>
            </form>
          </div>
        </Modal>
      </Route>

      {/* Payment */}
      <Route path="/dashboard/events/payment">
        <Modal>
          <div className="inner">
            <Link to="/dashboard/events" className="closeIcon">
              <img src={close} alt="close" />
            </Link>
            <h3 className="title">Payment</h3>
            <Spacer y={4.8} />
            <Paynow>
              {checkoutDetails.map((item) => (
                <div key={item.activity} className="activityRow">
                  <p>
                    <span className="textRegular">{item.activity}</span>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <span className="textLight">X{item.quantity}</span>
                  </p>
                  <p className="textMedium">£{item.price}</p>
                </div>
              ))}
              <Spacer y={4.8} />
              <div className="divider"></div>
              <Spacer y={1.2} />
              <div className="activityRow">
                <p className="textMedium">Total</p>
                <p className="textBold">£32.00</p>
              </div>
            </Paynow>
            <Spacer y={4.8} />
            <div className="actionBtns">
              <Link
                to="/dashboard/events/choose-activity"
                className="btn secondary"
              >
                Back
              </Link>
              <button className="btn primary">Pay now</button>
            </div>
          </div>
        </Modal>
      </Route>
    </>
  );
};

Event.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default Events;
