import { API } from "../module"

const _getMusicUrl = async (id: string = '') => {
  if (!id) {
    return
  }
  return API.getSongUrl({
    id
  }).then(res => {
    if (res.statusCode === 200) {
      console.log(' getSongUrl-res===>', res.data.data[0].url)
      return res.data.data[0].url
    }
  }).catch(err => {
    console.log(' getSongUrl-err===>', err)
  })
}

export { _getMusicUrl }
