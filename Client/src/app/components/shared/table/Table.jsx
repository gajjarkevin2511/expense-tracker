import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";

import RowText from "./RowText";
import EnhancedTableHead from "./EnhancedTableHead";
import HeadText from "./HeadText";

const ReusableTable = ({
  columns = [],
  filters = [],
  data = [],
  label = "",
  sx = {
    overflow: "auto",
    borderRadius: "18px",
    boxShadow: "0 9px 17.5px rgb(0,0,0,0.05)",
  },
}) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          background: theme.palette.background.paper,
          ...sx,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "table",
            tableLayout: "fixed",
          }}
        >
          <Table sx={{ whiteSpace: "nowrap" }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <EnhancedTableHead
                    align={column.align}
                    key={column.key}
                    name={column.key}
                    sort={column.sort}
                  >
                    <HeadText>{column.title}</HeadText>
                  </EnhancedTableHead>
                ))}

                {/* Arrow */}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    align="center"
                    sx={{
                      padding: "16px",
                      borderBottom: "1px solid #e5eaef",
                      fontWeight: 800,
                      color: "#757575",
                    }}
                  >
                    No {label} found
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((row, rowIndex) => (
                  <TableRow
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f6f9fc",
                      },
                    }}
                    key={rowIndex}
                  >
                    {columns.map((column, colIndex) => (
                      <TableCell
                        key={`${column.key}-${colIndex}`}
                        align={column.align || "left"}
                        sx={{
                          borderBottom: "1px solid #e5eaef",
                          maxWidth: "fit-content",
                          overflow: "hidden", // Hide overflowing text
                          whiteSpace: "nowrap", // Prevent text wrapping
                          textOverflow: "ellipsis", // Show ellipsis when text overflows
                          ...column.sx,
                        }}
                      >
                        {column.render ? (
                          <RowText>{column.render(row, rowIndex)}</RowText>
                        ) : (
                          <RowText>{row[column.key]}</RowText>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default ReusableTable;
