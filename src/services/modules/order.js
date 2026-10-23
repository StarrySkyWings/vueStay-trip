import myRequest from "../request";

export function getOrderList(type = "all") {
  return myRequest.get({
    url: `/order/list?type=${type}`,
  });
}
