import { useEffect } from "react";
import "./Pagination.scss";

type Props = {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

const PAGE_SIZES = [10, 20, 50, 100];

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));




const getPages = (current: number, totalPages: number) => {
  
  const pages: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  const left = Math.max(1, current - 1);
  const right = Math.min(totalPages, current + 1);

  pages.push(1);

  if (left > 2) pages.push("...");

  for (let i = left; i <= right; i++) {
    if (i !== 1 && i !== totalPages) pages.push(i);
  }

  if (right < totalPages - 1) pages.push("...");

  pages.push(totalPages);

  return pages;
};

const Pagination = ({ total, page, pageSize, onPageChange, onPageSizeChange }: Props) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = clamp(page, 1, totalPages);
  const pages = getPages(safePage, totalPages);

  const start = total === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const end = Math.min(total, safePage * pageSize);

  useEffect(() => {
  if (page !== safePage) onPageChange(safePage);
}, [page, safePage, onPageChange]);


  return (
    <div className="pagination">
      <div className="pagination__left">
        <span>Showing</span>

        <select
          className="pagination__select"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {PAGE_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <span>
          {total > 0 ? `${start}-${end}` : 0} out of {total}
        </span>
      </div>

      <div className="pagination__right">
        <button
          className="pagination__btn pagination__btn--nav"
          type="button"
          onClick={() => onPageChange(safePage - 1)}
          disabled={safePage === 1}
        >
          ‹
        </button>

        <div className="pagination__pages">
          {pages.map((p, idx) =>
            p === "..." ? (
              <span key={`dots-${idx}`} className="pagination__dots">
                …
              </span>
            ) : (
              <button
                key={p}
                className={`pagination__btn ${p === safePage ? "is-active" : ""}`}
                type="button"
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          className="pagination__btn pagination__btn--nav"
          type="button"
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Pagination;
