import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Spacer from "../../components/Spacer";

const Title = styled.h2`
  font-family: Gordita;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
`;

const NoActivity = styled.p`
  font-family: Gordita;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0px;

  .link {
    color: #cd2853;
    font-weight: 700;
  }
`;

const FeedItem = styled.div`
  padding: 0 2.4rem;
  background-color: #ffffff;
  pointer-events: none;

  .info {
    font-family: Gordita;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
  }

  .time {
    font-family: Gordita Light;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0px;
  }
`;

const tempFeed = [
  {
    info: "You have successfully paid the sum of £138.00.",
    time: "Now",
  },
  {
    info: "£138.00 payment was unsuccessful.",
    time: "Yesterday",
  },
  {
    info: "You have Sucessfully paid the sum of £18.00.",
    time: "Monday",
  },
];

const Home = () => {
  const [feed] = useState(tempFeed);

  return (
    <>
      <Spacer y={6} />
      <Title>Activity feed</Title>
      <Spacer y={4.8} />
      {!feed.length && (
        <NoActivity>
          <span>You do not have any recent activity.</span>{" "}
          <NavLink to="/dashboard/events" className="link textUnderline">
            Go to Events
          </NavLink>
        </NoActivity>
      )}
      {feed.length &&
        feed.map((item, index) => (
          <div key={index}>
            <FeedItem>
              <Spacer y={0.8} />
              <p className="info">{item.info}</p>
              <Spacer y={0.8} />
              <p className="time">{item.time}</p>
              <Spacer y={0.8} />
            </FeedItem>
            <Spacer y={1.2} />
          </div>
        ))}
    </>
  );
};

export default Home;
