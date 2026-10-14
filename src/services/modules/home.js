import myRequest from '../request'

export function getHomeHotSuggests() {
  return myRequest.get({
    url:'/home/hotSuggests'
  })
}