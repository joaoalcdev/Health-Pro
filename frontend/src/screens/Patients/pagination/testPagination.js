import React, { useState } from 'react'
import TableForTest from './TableForTest'
import { getUsers, getLength } from './users'
import Pagination from './pagination';
import { SelectLimit } from './selectLimit';


const TestPagination = () => {

  // page and limit states
  const [page, setPage] = useState(1); // default page is 1 (first)
  const [limit, setLimit] = useState(25); // items per page

  let totalPage = Math.ceil(getLength() / limit); // total pages

  let pageNo;
  if (page <= totalPage) {
    pageNo = page;
  } else {
    setPage(totalPage);
    pageNo = totalPage;
  }

  // controllers
  function handlePageChange(value) {
    if (value === '&laquo;' || value === '... ') {
      setPage(1)
    } else if (value === '&lsaquo;') {
      if (page !== 1) {
        setPage(page - 1)
      }
    } else if (value === '&rsaquo;') {
      if (page !== totalPage) {
        setPage(page + 1)
      }
    } else if (value === '&raquo;') {
      setPage(totalPage)
    } else if (value === ' ...') {
      setPage(totalPage - 1)
    }
    else {
      setPage(value)
    }
  }

  return (
    <>
      <TableForTest
        users={getUsers(page, limit)}
      />
      <div className="flex flex-row items-center justify-center space-x-4">
        <SelectLimit onLimitChange={setLimit} />
        <Pagination
          totalPage={totalPage}
          page={pageNo}
          limit={limit}
          siblings={1}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default TestPagination