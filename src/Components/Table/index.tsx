import React, { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Box,
} from '@mui/material';
import { Colors } from '../../Utilities/Colors';
import { GenericStyle } from '../../Utilities/GenericStyle';

export interface ColumnConfig {
  id: string;
  label?: string;
  align?: 'left' | 'center' | 'right';
  minWidth?: number;
  style?: React.CSSProperties;
}

export interface CommonTableProps<T> {
  data?: T[];
  columns: ColumnConfig[];
  onRowClick?: (row: T) => void;
  filterKey?: keyof T;
  noRowsPerPage?: number;
  rowStyle?: React.CSSProperties;
  stickyHeader?: boolean;
}

const CommonTable = <T,>({
  data = [],
  columns,
  onRowClick,
  filterKey,
  noRowsPerPage = 5,
  rowStyle,
  stickyHeader = false,
}: CommonTableProps<T>) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(noRowsPerPage);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  const handleSort = (key: keyof T) => {
    const isAsc = sortConfig.key === key && sortConfig.direction === 'asc';
    setSortConfig({ key, direction: isAsc ? 'desc' : 'asc' });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!] as string | number;
      const bValue = b[sortConfig.key!] as string | number;

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    if (!filterKey) return sortedData;

    return sortedData.filter((row) => String(row[filterKey]).toLowerCase());
  }, [sortedData, filterKey]);

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle Pagination
  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
      {!data || data.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '300px',
          }}
        >
          No Data
        </Box>
      ) : (
        <>
          <TableContainer
            sx={{
              maxHeight: '60vh',
              overflowY: 'auto',
            }}
          >
            <Table stickyHeader={stickyHeader}>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || 'left'}
                      style={
                        column.style
                          ? column.style
                          : {
                              minWidth: column.minWidth,
                              color: Colors.white,
                              fontSize: GenericStyle.font14Regular.fontSize,
                              fontWeight: GenericStyle.font14Bold.fontWeight,
                              backgroundColor: Colors.applicationColor,
                            }
                      }
                    >
                      <TableSortLabel
                        active={sortConfig.key === column.id}
                        direction={sortConfig.direction}
                        onClick={() => handleSort(column.id as keyof T)}
                        sx={{
                          fontSize: GenericStyle.font14Regular.fontSize,
                          fontWeight: GenericStyle.font14Bold.fontWeight,
                        }}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    sx={
                      rowStyle
                        ? rowStyle
                        : {
                            backgroundColor:
                              index % 2 === 0
                                ? Colors.darkOrgane
                                : Colors.secondaryApplicationColor,
                            '&:hover': {
                              cursor: 'pointer',
                              '& > td': {
                                color: Colors.applicationColor,
                              },
                            },
                          }
                    }
                  >
                    {columns.map((column, columnIndex) => (
                      <TableCell
                        key={column.id}
                        align={column.align || 'left'}
                        sx={{
                          fontSize: GenericStyle.font12Regular.fontSize,
                          fontWeight: GenericStyle.font12Regular.fontWeight,
                          borderRight:
                            columnIndex < columns.length - 1
                              ? '1px solid #e0e0e0'
                              : 'none',
                        }}
                      >
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
};

export default CommonTable;
