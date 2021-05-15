import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Spacer from "../../components/Spacer";
import { getFeed } from "../../redux/actions";

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

const getNotificationTime = (utc_date) => {
  const d = Date.now();
  const d_notification = Date.parse(utc_date);
  const diff = d - d_notification;
  const years = Math.floor(diff / (12 * 30 * 24 * 60 * 60 * 1000));
  const months = Math.floor(diff / (30 * 24 * 60 * 60 * 1000));
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const mins = Math.floor(diff / (60 * 1000));
  const secs = Math.floor(diff / 1000);

  if (years >= 1) {
    return `${years} ${years > 1 ? "years" : "year"} ago`;
  } else if (months >= 1) {
    return `${months} ${months > 1 ? "months" : "month"} ago`;
  } else if (days >= 1) {
    if (days === 1) {
      return "Yesterday";
    }
    return `${days} ${days > 1 ? "days" : "day"} ago`;
  } else if (hours >= 1) {
    return `${hours} ${hours > 1 ? "hours" : "hour"} ago`;
  } else if (mins >= 1) {
    return `${mins} ${mins > 1 ? "mins" : "min"} ago`;
  } else if (secs >= 1) {
    return "Now";
    // return `${secs} ${secs > 1 ? "seconds" : "second"} ago`;
  }

  return "--";
};

const Home = (props) => {
  const [feed] = useState(props.feed || []);

  useEffect(() => {
    getFeed();
    // eslint-diisable-next-line
  }, []);

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
      {feed &&
        feed.map((item, index) => (
          <div key={index}>
            <FeedItem>
              <Spacer y={0.8} />
              <p className="info">{`Successfully registered ${
                item.children_ids.length
              } ${item.children_ids.length > 1 ? "kids" : "kid"} for ${
                item.event_name
              } | ${item.event_activity_name}`}</p>
              <Spacer y={0.8} />
              <p className="time">
                {getNotificationTime(new Date(item.updated_at))}
              </p>
              <Spacer y={0.8} />
            </FeedItem>
            <Spacer y={1.2} />
          </div>
        ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    feed: state.feed,
  };
};

export default connect(mapStateToProps)(Home);
