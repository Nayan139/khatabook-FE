import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBorrower } from "../../redux/slices/borrowerSlice";
import { Chip, Tooltip, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import "./TableView.css";
import UpdateDialog from "../UpdateDialog/UpdateDialog";

const headCells = [
  {
    id: "debtorName",
    numeric: false,
    disablePadding: true,
    label: "Debtor name",
    sortable: true,
  },
  {
    id: "creditorName",
    numeric: true,
    disablePadding: false,
    label: "Creditor name",
    sortable: false,
  },
  {
    id: "paymentMode",
    numeric: true,
    disablePadding: false,
    label: "Payment mode",
    sortable: false,
  },
  {
    id: "payDate",
    numeric: true,
    disablePadding: false,
    label: "Pay date",
    sortable: true,
  },
  {
    id: "paybackDate",
    numeric: true,
    disablePadding: false,
    label: "Pay back date",
    sortable: true,
  },
  {
    id: "principalAmount",
    numeric: true,
    disablePadding: false,
    label: "Principal Amount",
    sortable: false,
  },
  {
    id: "isInterest",
    numeric: true,
    disablePadding: false,
    label: "Interest",
    sortable: false,
  },
  {
    id: "totalAmount",
    numeric: true,
    disablePadding: false,
    label: "Total amount",
    sortable: false,
  },
  {
    id: "debtorNumber",
    numeric: true,
    disablePadding: false,
    label: "Debtor Number",
    sortable: false,
  },
  {
    id: "isPaid",
    numeric: true,
    disablePadding: false,
    label: "Paid",
    sortable: true,
  },
  {
    id: "type",
    numeric: true,
    disablePadding: false,
    label: "Type",
    sortable: false,
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    sortable: false,
    label: "Actions",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              <> {headCell.label}</>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const TableView = ({ type }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [row, setRow] = useState([]);
  const [record, setRecord] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    console.log("event--------------name", event, name);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const payload = {
      pageNum: page,
      pageSize: rowsPerPage,
      sortOrder: order,
      sortBy: orderBy,
      type,
    };
    dispatch(createBorrower(payload));
  }, [page, rowsPerPage, order, orderBy]);

  const { data, total, error, loading } = useSelector(
    (state) => state.borrowers
  );
  useEffect(() => {
    setRow(data);
  }, [loading]);

  console.log("data", record);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {!loading && row.length ? (
                  row.map((item, index) => (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell
                        component="th"
                        id={index}
                        scope="row"
                        padding="none"
                      >
                        {item.debtorName}
                      </TableCell>
                      <TableCell align="center">{item.creditorName}</TableCell>
                      <TableCell align="center">
                        <Box className="table-row">
                          <Box sx={{ mb: 0.5 }}> {item.paymentMode}</Box>
                          {item.paymentApplication.name && (
                            <Tooltip title="Payment Application">
                              <Chip
                                color="primary"
                                size="small"
                                variant="outlined"
                                label={item.paymentApplication.name}
                              />
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {moment(item.payDate).format("DD MMMM YYYY")}
                      </TableCell>
                      <TableCell align="right">
                        {moment(item.paybackDate).format("DD MMMM YYYY")}
                      </TableCell>
                      <TableCell align="right">
                        {item.principalAmount}
                      </TableCell>
                      <TableCell align="center">
                        <Box className="table-row">
                          <Box sx={{ mb: 0.5 }}>
                            {item.isInterest ? "Yes" : "No"}
                          </Box>
                          {item.isInterest && (
                            <Tooltip title="Interest Rate">
                              <Chip
                                color="primary"
                                size="small"
                                variant="outlined"
                                label={`${item.interestRate} %`}
                              />
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box className="table-row">
                          <Tooltip
                            placement="top"
                            title={`Total Amount ${item.principalAmount} + ${item.interestAmount}`}
                          >
                            <Box sx={{ mb: 0.5 }}>{item.totalAmount}</Box>
                          </Tooltip>
                          {item.interestAmount > 0 && (
                            <Tooltip
                              title={`Interest Rate calculated by annum `}
                            >
                              <Chip
                                color="primary"
                                size="small"
                                variant="outlined"
                                label={`${item.interestAmount} `}
                              />
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box className="table-row">
                          <Box sx={{ mb: 0.5 }}>{item.debtorNumber}</Box>
                          {item.isWhatsapp && (
                            <Tooltip title="Whatsapp number">
                              <Chip
                                color="primary"
                                size="small"
                                variant="outlined"
                                label={`WhatsApp`}
                              />
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          color={item.isPaid ? "success" : "warning"}
                          size="small"
                          variant="outlined"
                          label={item.isPaid ? "Yes" : "No"}
                        />
                      </TableCell>
                      <TableCell align="right">
                        {item.type && (
                          <Chip
                            color={item.type === "CREDIT" ? "info" : "primary"}
                            size="small"
                            variant="outlined"
                            label={item.type}
                          />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Box className="action-table">
                          <Tooltip title={`Edit `}>
                            <CreateIcon
                              onClick={() => {
                                setRecord(item);
                                handleClickOpen();
                              }}
                            />
                          </Tooltip>
                          <Tooltip title={"Delete"}>
                            <DeleteIcon />
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>No Record</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {row.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </Box>
      <UpdateDialog
        open={open}
        handleClose={handleClose}
        type={type}
        record={record}
      />
    </>
  );
};

export default TableView;