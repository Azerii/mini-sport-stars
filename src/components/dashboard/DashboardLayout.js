import { Redirect, Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  dashboardEvents,
  dashboardHome,
  dashboardProfile,
  logout,
} from "../../assets";
import Events from "../../pages/dashboard/Events";
import Home from "../../pages/dashboard/Home";
import Profile from "../../pages/dashboard/Profile";
import { store } from "../../redux/store";
import { blackFilter } from "../../utils";
import Logo from "../Logo";
import Spacer from "../Spacer";

const Header = styled.div`
  display: flex;
  align-items: center;
  height: 10.8rem;
  padding: 0 2.4rem;
  background-color: #ffffff;
`;

const Wrapper = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  height: calc(100vh - 10.8rem);
  width: 24rem;
  display: flex;
  flex-direction: column;
  padding: 0 2.4rem;
  background-color: #ffffff;
  overflow: auto;
  z-index: 5;

  .item {
    display: flex;
    align-items: flex-start;
    padding: 1.6rem 2.4rem;
    color: #00000050;
    font-family: Gordita;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0px;
    text-align: center;
    transition: all 250ms ease-in;

    &.active {
      color: #000000;
      background-color: #cd285315;

      .icon {
        filter: ${blackFilter};
      }
    }
  }

  @media screen and (max-width: 768px) {
    position: fixed;
    bottom: 0;
    flex-direction: row;
    width: 100vw;
    height: fit-content;

    .lg {
      display: none;
    }
  }
`;

const Content = styled.div`
  width: -webkit-fill-available;
  height: calc(100vh - 10.8rem);
  overflow: auto;
  padding: 0 4.8rem;
  background-color: #f7f7fc;

  @media screen and (max-width: 768px) {
    padding: 0 2.4rem;
  }
`;

const DashboardLayout = () => {
  if (!store.getState().children.length) {
    return <Redirect to="/add-child" />;
  }
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <Wrapper>
        <Sidebar>
          <Spacer y={6} className="lg" />
          <NavLink
            exact
            to="/dashboard"
            className="item"
            // activeClassName="active"
          >
            <img src={dashboardHome} alt="Home Icon" className="icon" />
            <Spacer x={1.2} className="lg" />
            <span className="lg">Home</span>
          </NavLink>
          <Spacer y={1.2} />
          <NavLink
            to="/dashboard/events"
            className="item"
            // activeClassName="active"
          >
            <img src={dashboardEvents} alt="Events Icon" className="icon" />
            <Spacer x={1.2} className="lg" />
            <span className="lg">Events</span>
          </NavLink>
          <Spacer y={1.2} />
          <NavLink
            to="/dashboard/profile"
            className="item"
            // activeClassName="active"
          >
            <img src={dashboardProfile} alt="Home Icon" className="icon" />
            <Spacer x={1.2} className="lg" />
            <span className="lg">Profile</span>
          </NavLink>
          <Spacer y={1.2} />
          <a
            href="/sign-in"
            className="item"
            // activeClassName="active"
            onClick={() => localStorage.clear()}
          >
            <img src={logout} alt="Home Icon" className="icon" />
            <Spacer x={1.2} className="lg" />
            <span className="lg">logout</span>
          </a>
          <Spacer y={1.2} className="lg" />
        </Sidebar>
        <Content>
          <Switch>
            <Route exact path="/dashboard" component={Home} />
            <Route path="/dashboard/events" component={Events} />
            <Route path="/dashboard/profile" component={Profile} />
          </Switch>
        </Content>
      </Wrapper>
    </>
  );
};

export default DashboardLayout;
