/**
 * Created by li.man on 2019/6/17.
 */


// imgArr 图片库
var imgArr=[
  {src:'images/0.gif',id:'img_0'},
  
];
var degArr=[0,45,90,135,180,225,270,315];
/*{src:'images/1.jpg',id:'img_1'},
  {src:'images/2.jpg',id:'img_2'},
  {src:'images/3.jpg',id:'img_3'},
  {src:'images/4.jpg',id:'img_4'},
  {src:'images/5.jpg',id:'img_5'},
  {src:'images/6.jpg',id:'img_6'},
  {src:'images/7.jpg',id:'img_7'},
  {src:'images/8.jpg',id:'img_8'},
  {src:'images/9.jpg',id:'img_9'},
  {src:'images/10.jpg',id:'img_10'}
  */
/*
 * appendEl()
 * 使用文档碎片构建DOM结构，创建节点，追加到J_list中
 * @param num 显示图片的张数
 * */
var tmpImgArr=[],tmpDegArr=[];
 //默认显示9条图片
function appendEl(num) {
  tmpImgArr=getTmp(imgArr);
  tmpDegArr=getTmp(degArr);

  removeEl();
  var frag=document.createDocumentFragment();
  for(var i=0;i<num;i++){
    var li=document.createElement('li');
    var img=document.createElement('img');

    var data=getData(imgArr,'img');
    img.src=data.src;
    img.setAttribute('data-id',data.id);

   var deg=getData(degArr,'deg');
    img.setAttribute('style','transform:translate(-50%,-50%) rotate('+deg+'deg)');//='rotatedY('+deg+'deg)';
    li.appendChild(img);
    frag.appendChild(li);
  }
  $('#J_list').append(frag);
  THEN=Date.now(); // 开始时间


  // 获取标准图片
  setBZ();
}
// 删除节点
function removeEl(){
  var parent=document.getElementById('J_list');
  while(parent.children.length>0)
  parent.removeChild(parent.firstChild);

}
/*
 * RandomNum()
 * 产生最小值到最大值之间的函数，包括最小值但不包括最大值
 * min<=r<max
 * */
function RandomNum(min,max){
  var range=max-min;
  var rand=Math.random();
  return min+Math.floor(rand*range);
}
/*
 * getData()
 * 随机获取图片
 * @param data 要随机读取的数据
 * */

function getData(data,type) {
  var r,i;
  var arr=[];
  if(type==='img'){
    arr=tmpImgArr;
  }else{
    arr=tmpDegArr;
  }
  r=RandomNum(0,arr.length);
  i=arr[r];
  arr.splice(r,1);// 从tmp数组中删除这个随机下标
  // 如果数据和角度值不够条数，就重置为全部数据
  if(type==='img' && arr.length<1){
   tmpImgArr=getTmp(data);
  }
  else if(type==='deg' && arr.length<1) {
   tmpDegArr=getTmp(data);
  }
  return data[i];
}
/*
 * getTmp
 * 将随机数存放到临时数组中
 * */
function getTmp(data){
  var tmp=[];
  var len=data.length;
  for(var i=0;i<len;i++){
    tmp.push(i);
  }
  return tmp;
}


// 设置显示张数
function setNum(){
  var num=$('input.num').val();
  appendEl(num);
}
var THEN,NOW; //开始时间，结束时间
var CLICKNum=5; //总点击次数，初始化5次
$(function () {
  appendEl(9);
  getKey();

  $('#J_setting').on('click',function () {
    setNum();
    $('#J_lastNum').html(CLICKNum);
  });
  $('#J_refresh').on('click',function () {
    event.returnValue=true;
    $('.modal-shadow').removeClass('on');
    appendEl(9);
    CLICKNum=5;
    $('#J_lastNum').html(CLICKNum);
  });
});
// 设置标准
function setBZ(){
  // 获取标准图片
  var r=RandomNum(0,imgArr.length);
  var bz=imgArr[r];
  $('.bz-img img').attr({'src':bz.src},{'data-id':bz.id});
  $('.bz-img img').attr({'data-id':bz.id});
}
// 判断左侧干扰图中是否有标准图片
function hasBZ(){
  var d=$('.bz-img img').attr('data-id');
  var m=$('#J_list img[data-id='+d+']').size();
  return m;
}

// 获取键盘值
function getKey() {
  var key='';
  window.addEventListener('keydown',function (e) {
    var f=hasBZ();
    NOW=Date.now();
    CLICKNum--;
    if(CLICKNum<0){
      event.returnValue=false;
      $('.modal-shadow').addClass('on');
      $('.modal-shadow a.btn').html('重新开始');

    }else{
      if(e.keyCode===89 ){
        key='Y';
      }else {//if(e.keyCode===78){
        key='N';
      }
      var text='';
      if(f>0 && key==='Y') text='Y';
      else if(f===0 && key==='N') text='Y';
      else text='N';
      $('#J_result').html(text);
      $('#J_lastNum').html(CLICKNum);
      appendTable();// 列表信息
    }
    THEN=NOW;
    appendEl($('#num-img').val());

  },false);

  return key;
};

/*
* 统计列表
* */
function appendTable() {
  var num=4; //默认显示4列
  var frag=document.createDocumentFragment();
  var tr=document.createElement('tr');
  var len=$('#J_body tr').size();
  // var date1 = new Date(THEN),
  // b=date1.toLocaleDateString().replace(/\//g, "-")+ " " + date1.toTimeString().substr(0, 8);
  // var date2 = new Date(THEN),
  // e=date2.toLocaleDateString().replace(/\//g, "-")+ " " + date2.toTimeString().substr(0, 8);
  //Math.floor(NOW/1000)-Math.floor(THEN/1000)
  var arr=[len,THEN,NOW,NOW-THEN+' ms'];
  for(var i=0;i<num;i++){
    var td=document.createElement('td');
    tr.appendChild(td);
    td.innerHTML=arr[i];
    frag.appendChild(tr);
  }
  $('#J_body').append(frag);
}


/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
function formatTime(number,format) {

  var formateArr  = ['Y','M','D','h','m','s'];
  var returnArr   = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr)
  {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

//数据转化
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n
}

