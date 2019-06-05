//设置日期和时间格式
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//将Date类型转换为yyyy-mm-dd
function convertDate(date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString();
  var dd = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
}
//将Date类型转换为时间戳
function dateToStamp(date){
  return date.getTime(date);
}
//判断当前时间是否在start,end之内
function betweenDate(cur,start,end){
  if (dateToStamp(cur) >= dateToStamp(start) && dateToStamp(cur) <= dateToStamp(end)){
    return true;
  }
  return false;
}
module.exports = {
  formatTime: formatTime,
  convertDate:convertDate
}  