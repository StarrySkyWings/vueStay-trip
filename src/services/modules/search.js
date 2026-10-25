import myRequest from '../request'

export function getSearchConditions() {
  return myRequest.get({
    url:'/search/top'
  })
}

export function getSearchHouse() {
  return myRequest.get({
    url:'/search/result'
  })
}