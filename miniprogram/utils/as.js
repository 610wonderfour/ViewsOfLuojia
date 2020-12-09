/***
 * 扩展系统自带的showActionSheet，解决选项超过6个时无法使用问题
 */
function as(){}

as.showActionSheet = function showActionSheet (config) {
  if (config.itemList.length > 6) {
    var myConfig = {};
    for (var i in config) { //for in 会遍历对象的属性，包括实例中和原型中的属性。（需要可访问，可枚举属性）
      myConfig[i] = config[i];
    }
    myConfig.page = 1;
    myConfig.itemListBak = config.itemList;
    myConfig.itemList = [];
    var successFun = config.success;
    myConfig.success = function (res) {
      if (res.tapIndex == 5) {//下一页
        myConfig.page++;
        showActionSheet(myConfig);
      } else {
        res.tapIndex = res.tapIndex + 5 * (myConfig.page-1);
        successFun(res);
      }
    }
    showActionSheet(myConfig);
    return ;
  }
  if (!config.page) {
    wx.showActionSheet(config);
  }else{
    var page = config.page;
    var itemListBak = config.itemListBak;
    var itemList = [];
    for (var i = 5 * (page - 1); i < 5 * page && i < itemListBak.length; i++) {
      itemList.push(itemListBak[i]);
    }
    if (5 * page < itemListBak.length) {
      itemList.push('下一页');
    }
    config.itemList = itemList;
    wx.showActionSheet(config);
  } 
}



module.exports = as;