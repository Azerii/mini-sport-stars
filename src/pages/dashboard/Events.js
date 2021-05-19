import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import PropTypes from "prop-types";
import Spacer from "../../components/Spacer";
import CheckBox from "../../components/CheckBox";
import Modal from "../../components/Modal";
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
import { useEffect, useState } from "react";
import { Route, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getChildren,
  setEvent,
  setTempChildren,
  setTempActivity,
} from "../../redux/actions";
import axios from "axios";
import { store } from "../../redux/store";
import AlertBox from "../../components/AlertBox";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4.8rem;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const infoPack = {
  "saturday morning football": `
    Reception/Year 1
    £8 per session
    \n
    Year 2/Year 3 
    £8 per session 
    \n
    Year 4/5/6 
    £8 per session
  `,
  "half term": `
    May Half Term Football Camp 
    \n
    Week 1 
    Monday 31st May 
    Tuesday 1st June 
    Wednesday 2nd June 
    Thursday 3rd June 
    Friday 4th June 
    \n
    Cost 
    Single day - £30 
    \n
    5 days - £140
  `,
  "1 to 1 coaching": `No activities for now.`,
  "advanced centre": `No activities for now.`,
  "birthday parties": `No activities for now.`,
  "trial days": `No activities for now.`,
};

const activities = {
  "saturday morning football": [
    {
      activity: "Reception / Year 1 Football",
      price: 8,
    },
    {
      activity: "Year 2 / Year 3 Football",
      price: 8,
    },
    {
      activity: "Year 4 / Year 5 / Year 6 Football",
      price: 8,
    },
  ],
  "half term": [
    {
      activity: "Single day",
      price: 30,
    },
    {
      activity: "2 days",
      price: 60,
    },
    {
      activity: "3 days",
      price: 90,
    },
    {
      activity: "4 days",
      price: 115,
    },
    {
      activity: "5 days",
      price: 140,
    },
  ],
};

const activityPrices = {
  "reception / year 1 football": 8,
  "year 2 / year 3 football": 8,
  "year 4 / year 5 / year 6 football": 8,
  "single day": 30,
  "2 days": 60,
  "3 days": 90,
  "4 days": 115,
  "5 days": 140,
};

const stripe_api_key =
  "pk_test_51H9t0qL1lruO1TxM95muxi9GSAQPltFr3bajfWVoNX369vEnE7slL4IVqTolIvh9uYBEul4PZUgP8RXBktJnqJdP00J0z9Vr9g";

const Event = ({ href, imgSrc, title, desc, setEvent }) => {
  return (
    <Card to={href} onClick={() => setEvent(title.toLowerCase())}>
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Events = (props) => {
  const query = useQuery();
  const [events] = useState(tempEvents);
  const [btnActive, setBtnActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [success, setSuccess] = useState(false);

  const current_event_check = (title__) => {
    const title = title__.toLowerCase();

    return title === "saturday morning football" || title === "half term";
  };

  const handleCheckout = async () => {
    const access_token = store.getState().token;
    const children_ids = props.temp_children.map((id) => Number(id));
    const data = {
      event_name: props.current_event,
      children_ids,
      selected_activity: props.temp_activity,
      unit_price: activityPrices[props.temp_activity.toLowerCase()],
    };
    const url =
      "https://minisportstars-backend.herokuapp.com/api/register_children";

    try {
      setLoading(true);
      let res = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      if (res && res.data && res.data.status === "success") {
        setLoading(false);
        let { stripe_key } = res.data.data;
        let stripePromise = await loadStripe(stripe_api_key);

        stripePromise.redirectToCheckout({
          sessionId: stripe_key,
        });
      }
      if (res.data.error) {
        setLoading(false);
        console.log(res.data.error);
        alert(res.data.error.message);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  };

  const handleSelect = (e, index, activity = false) => {
    e.preventDefault();
    const selectedEl = document.querySelector(`#${index}`);
    const selectedElCheckbox = document.querySelector(`#${index} .checkBox`);

    if (activity) {
      document.querySelectorAll(`.listItem`).forEach((item) => {
        item.classList.remove("selected");
        item.querySelector(`.checkBox input`).checked &&
          item.querySelector(`.checkBox`).click();
      });

      selectedEl.classList.toggle("selected");
      !selectedEl.querySelector(`.checkBox input`).checked &&
        selectedElCheckbox.click();
    } else {
      selectedEl.classList.toggle("selected");
      selectedElCheckbox.click();
    }

    const checkedInputs = document.querySelectorAll(
      `input[type="checkbox"]:checked`
    );

    if (checkedInputs.length) {
      setBtnActive(true);
    } else {
      setBtnActive(false);
    }
  };

  const handleSubmit_children = (e, target) => {
    e.preventDefault();
    const inputArr = Array.from(
      document.querySelectorAll(`input[type="checkbox"]:checked`)
    );
    const children_ids = inputArr.map((input) => input.dataset.id);

    props.setTempChildren(children_ids);
    window.location.replace(target);
  };

  const handleSubmit_activity = (e, target) => {
    e.preventDefault();

    let selected_activity;
    document.querySelectorAll(`input[type="checkbox"]`).forEach((input) => {
      if (input.checked) {
        selected_activity = input.dataset.name;
      }
    });

    props.setTempActivity(selected_activity);
    window.location.replace(target);
  };

  const showPaymentSuccessAlert = () => {
    const status = query.get("payment_status");

    if (!status) {
      return;
    }

    if (status === "success") {
      setSuccess(true);
      setAlertText("Your payment was received successfully");
      document.querySelector(".alertBox").classList.add("show");
    } else {
      setSuccess(false);
      setAlertText("Payment failed. Please try again in a few minutes.");
      document.querySelector(".alertBox").classList.add("show");
    }

    // setTimeout(
    //   () => document.querySelector(".alertBox").classList.remove("show"),
    //   30000
    // );
  };

  useEffect(() => {
    getChildren();
    showPaymentSuccessAlert();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Spacer y={4.8} />
      <AlertBox className="alertBox" success={success} text={alertText} />
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
              href={`/dashboard/events/info?title=${item.title}`}
              {...props}
            />
          ))}
        <Spacer y={4.8} />
      </Wrapper>

      {/* Info */}
      <Route path="/dashboard/events/info">
        <Modal>
          <div className="inner">
            <Link to="/dashboard/events" className="closeIcon">
              <img src={close} alt="close" />
            </Link>
            <h3 className="title textCapitalize">{props.current_event}</h3>
            <Spacer y={2.4} />
            {infoPack[props.current_event] &&
              infoPack[props.current_event].split("\n").map((item, index) => (
                <p key={`${index}_${item}`} className="textRegular infoText">
                  <span>{item}</span>
                  <br />
                </p>
              ))}
            <Spacer y={4.8} />
            <div className="actionBtns">
              <Link to="/dashboard/events" className="btn secondary">
                Back
              </Link>
              {current_event_check(props.current_event) && (
                <Link to="/dashboard/events/register" className="btn primary">
                  Continue
                </Link>
              )}
            </div>
          </div>
        </Modal>
      </Route>

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
                handleSubmit_children(e, "/dashboard/events/choose-activity")
              }
            >
              {props.children &&
                props.children.length &&
                props.children.map((child, index) => (
                  <div key={`child_${index + 1}`}>
                    <div
                      className="listItem"
                      id={`id_${index + 1}`}
                      onClick={(e) => {
                        handleSelect(e, `id_${index + 1}`);
                      }}
                    >
                      <div className="info">
                        <img
                          src={dashboardProfileBlack}
                          alt="Profile Icon"
                          className="icon"
                        />
                        <Spacer x={1.2} />
                        <span>{child.name}</span>
                      </div>
                      <CheckBox
                        className="checkBox"
                        id={`${child.id}`}
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
                <button
                  className={`btn primary ${btnActive ? "" : "disabled"}`}
                  disabled={btnActive ? false : true}
                >
                  Continue
                </button>
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
              onSubmit={(e) =>
                handleSubmit_activity(e, "/dashboard/events/payment")
              }
            >
              {activities &&
                activities[props.current_event] &&
                activities[props.current_event].map((item, index) => (
                  <div key={`class_${index + 1}`}>
                    <div
                      className="listItem"
                      id={`id_${index + 1}`}
                      onClick={(e) => handleSelect(e, `id_${index + 1}`, true)}
                    >
                      <span className="label">{item.activity}</span>
                      <CheckBox
                        className="checkBox"
                        id={`${index + 1}`}
                        name={item.activity}
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
                <button
                  className={`btn primary ${btnActive ? "" : "disabled"}`}
                  disabled={btnActive ? false : true}
                >
                  Continue
                </button>
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
              <div className="activityRow">
                <p>
                  <span className="textRegular">{props.temp_activity}</span>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <span className="textLight">
                    X{props.temp_children.length}
                  </span>
                </p>
                <p className="textMedium">
                  £
                  {props.temp_activity &&
                    activityPrices[props.temp_activity.toLowerCase()] &&
                    activityPrices[props.temp_activity.toLowerCase()] *
                      props.temp_children.length}
                </p>
              </div>
              <Spacer y={4.8} />
              <div className="divider"></div>
              <Spacer y={1.2} />
              <div className="activityRow">
                <p className="textMedium">Total</p>
                <p className="textBold">
                  £
                  {props.temp_activity &&
                    activityPrices[props.temp_activity.toLowerCase()] &&
                    activityPrices[props.temp_activity.toLowerCase()] *
                      props.temp_children.length}
                </p>
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
              <button
                className={`btn primary ${loading ? "disabled" : ""}`}
                onClick={handleCheckout}
                disabled={loading ? true : false}
              >
                {loading ? "..." : "Paynow"}
              </button>
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

const mapStateToProps = (state) => {
  return {
    current_event: state.current_event,
    children: state.children,
    temp_children: state.temp_children,
    temp_activity: state.temp_activity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEvent: (title) => dispatch(setEvent(title)),
    setTempChildren: (data) => dispatch(setTempChildren(data)),
    setTempActivity: (data) => dispatch(setTempActivity(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
