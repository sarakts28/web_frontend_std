import { TablePagination } from '@mui/material';

interface PageNavigationProps {
  currentPage: number;
  totalElements: number;
  rowsPerPage?: number;
  setCurrentPage: (page: number) => void;
  showRowsPerPage?: boolean; // Optional prop to control visibility
  setRowsPerPage?: (rowsPerPage: number) => void;
}
const PageNavigation = ({
  currentPage,
  totalElements,
  rowsPerPage = 10,
  setRowsPerPage = () => {},
  setCurrentPage,
  showRowsPerPage = true,
}: PageNavigationProps) => {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={totalElements}
      page={currentPage}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={
        showRowsPerPage ? handleChangeRowsPerPage : undefined
      }
      rowsPerPageOptions={showRowsPerPage ? [5, 10, 25] : []}
    />
  );
};

export default PageNavigation;
