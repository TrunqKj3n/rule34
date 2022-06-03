'use strict';
var _axios = require("axios");
var _cheerio = require("cheerio");
/**
 * @param {string} url
 * @return {undefined}
 */
async function rule34(url) {
  var exemptJson = await _axios.get("https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1000&pid=0&tags=" + encodeURIComponent(url));
  var $ = _cheerio.load(exemptJson.data);
  var posts = $("posts").find("post");
  /** @type {!Array} */
  var self = [];
  /** @type {number} */
  var i = 0;
  for (; i < posts.length; i++) {
    var fileUrl = $(posts[i]).attr("file_url");
    var type = $(posts[i]).attr("file_url").substring($(posts[i]).attr("file_url").lastIndexOf(".") + 1);
    var tagArr = $(posts[i]).attr("tags");
    var _preview_url = $(posts[i]).attr("preview_url");
    self.push({
      tags : tagArr,
      url : fileUrl,
      preview_url : _preview_url,
      type : type
    });
  }
  return self;
}
module.exports.rule34 = rule34;
