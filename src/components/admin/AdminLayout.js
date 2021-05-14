import { NavLink, Redirect } from "react-router-dom";
import styled from "styled-components";
import { adminDashboard, logout } from "../../assets";
import Logo from "../Logo";
import Spacer from "../Spacer";
import Search from "./Search";
import { useTable, useGlobalFilter } from "react-table";
import { useEffect, useMemo } from "react";
import { COLUMNS } from "./Columns";
// import MOCK_DATA from "./MOCK_DATA.json";
// import Filter from "./Filter";
import { getTransactions } from "../../redux/actions";
import { connect } from "react-redux";
import { store } from "../../redux/store";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10.8rem;
  padding: 0 2.4rem;
  background-color: #ffffff;
`;

// const Noftification = styled.div`
//   position: relative;
//   padding: 1.2rem;

//   .icon {
//     height: 2.4rem;
//   }

//   .badge {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 1.2rem;
//     height: 1.2rem;
//     background-color: #cd2853;
//     border-radius: 50%;
//   }
// `;

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

  .item {
    display: flex;
    align-items: flex-start;
    padding: 1.6rem 0;
    color: #00000050;
    font-family: Gordita;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0px;
    text-align: center;
    transition: all 250ms ease-in;

    .icon {
      margin-right: 1.2rem;
    }

    &.active {
      color: #cd2853;
    }
  }
`;

const Content = styled.div`
  width: -webkit-fill-available;
  height: calc(100vh - 10.8rem);
  overflow: auto;
  padding: 0 2.4rem;
  background-color: #f7f7fc;
`;

const TableWrapper = styled.div`
  background-color: #ffffff;
`;

const TableInner = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  background-color: #ffffff;

  td {
    border: 1px solid #efebf1;
    border-left: none;
    border-right: none;
    padding: 1.8rem;
    color: #828282;
    font-family: Gordita;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0px;
  }

  // tr:nth-child(even) {
  //   background-color: #f2f2f2;
  // }

  // tr:hover {
  //   background-color: #ddd;
  // }

  th {
    padding: 1.8rem;
    text-align: left;
    color: #899198;
    text-transform: uppercase;
    font-family: Gordita Regular;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    letter-spacing: 0em;
  }

  .checkbox {
    padding: 0 2.4rem;
  }
`;

const AdminLayout = (props) => {
  const transactions = useMemo(
    () =>
      props.transactions.map((transaction) => ({
        id: transaction.id,
        _name: "--",
        event_name: transaction.event_name,
        participants: transaction.children_ids.length,
        amount_paid: transaction.amount_paid,
        date_paid:
          transaction.amount_paid !== "not_paid"
            ? new Date(transaction.updated_at).toLocaleDateString()
            : "--",
      })),
    [props.transactions]
  );
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => transactions || [], [transactions]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter
  );

  const { globalFilter } = state;

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line
  }, []);

  if (!store.getState().admin_token) {
    return <Redirect to="/admin/sign-in" />;
  }

  return (
    <>
      <Header>
        <Logo />
        <Search filter={globalFilter} setFilter={setGlobalFilter} />
        {/* <div>
          <Noftification>
            <span className="badge"></span>
            <img src={bell} alt="Bell" className="icon" />
          </Noftification>
        </div> */}
      </Header>
      <Wrapper>
        <Sidebar>
          <Spacer y={6} />
          <NavLink to="/admin" className="item" activeClassName="active">
            <img src={adminDashboard} alt="dashboard Icon" className="icon" />
            <Spacer x={1.2} />
            <span>Dashboard</span>
          </NavLink>
          <Spacer y={1.2} />
          <a
            href="/admin/sign-in"
            className="item"
            onClick={() => localStorage.clear()}
          >
            <img src={logout} alt="Home Icon" className="icon" />
            <Spacer x={1.2} className="lg" />
            <span className="lg">logout</span>
          </a>
        </Sidebar>
        <Content>
          <>
            <Spacer y={7.2} />
            <TableWrapper>
              <Spacer y={4.8} />
              {/* <Filter />
              <Spacer y={4.8} /> */}
              <TableInner {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {/* <th className="checkbox">
                  <CheckBox grey name={`select_all`} />
                </th> */}
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {/* <td className="checkbox">
                    <CheckBox name={`row_${row.id}`} grey />
                  </td> */}
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </TableInner>
            </TableWrapper>
            <Spacer y={4.8} />
          </>
        </Content>
      </Wrapper>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
  };
};

export default connect(mapStateToProps)(AdminLayout);
