import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css'; // Імпортуйте як CSS Module

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

const Pagination = ({ pageCount, currentPage, onPageChange }: PaginationProps) => {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <div
      onClick={(e) => {
        const target = e.target as HTMLElement;
        // Перевіряємо, чи клік був на елементі пагінації з класом, щоб уникнути блокування інших кліків
        if (target.closest(`.${styles.pagination} a`)) {
          e.preventDefault(); // блокуємо перезавантаження сторінки при кліку на посилання
        }
      }}
    >
      <ReactPaginate
        pageCount={pageCount}
        forcePage={currentPage - 1}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination} // Застосовуємо клас з CSS Module
        pageLinkClassName={styles['page-link']} // Додаємо клас для посилань сторінок (якщо потрібно стилізувати їх окремо)
        activeClassName={styles.active} // Застосовуємо активний клас з CSS Module
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
      />
    </div>
  );
};

export default Pagination;