export default {
  handle(axiosRes) {
    if(axiosRes.data.status === 'success') {
      onSuc();
    }else {
      onFail();
    }
  },
  onSuc,
  onFail
}
