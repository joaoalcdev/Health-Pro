import _ from 'lodash';

export const returnPaginationRange = (totalPage, page, limit, siblings) => {
  let totalPageNoInArray = 7 + siblings;
  if (totalPageNoInArray >= totalPage) {
    return _.range(1, totalPage + 1)
  }

  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rightSiblingsIndex = Math.min(page + siblings, totalPage);

  let showLeftDots = leftSiblingsIndex > 2
  let showRightDots = rightSiblingsIndex < totalPage - 2

  if (!showLeftDots && showRightDots) {
    let leftItemsCount = 3 + 2 * siblings;
    let leftRange = _.range(1, leftItemsCount + 1);
    return [...leftRange, ' ...', totalPage] // [1, 2, 3, 4, 5, '...', 10]
  } else if (showLeftDots && !showRightDots) {
    let rightItemsCount = 3 + 2 * siblings;
    let rightRange = _.range(totalPage - rightItemsCount, totalPage + 1);
    return [1, '... ', ...rightRange] // [1, '...', 6, 7, 8, 9, 10]
  } else {
    let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, '... ', ...middleRange, ' ...', totalPage] // [1, '...', 4, 5, 6, 7, 8, '...', 10]
  }
} 