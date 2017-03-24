$(function(){
  
  //難易度別 背景色 - 文字色
  var level_color = {
    "-1": {back:"#B3B3B3", str:"#FFFFFF"},
    "1" : {back:"#EBF1DE", str:"#000000"},
    "2" : {back:"#DCE6F2", str:"#000000"},
    "3" : {back:"#DBEEF4", str:"#000000"},
    "4" : {back:"#D2DBE5", str:"#000000"},
    "5" : {back:"#A5B6CB", str:"#000000"},
    "6" : {back:"#CCC1DA", str:"#000000"},
    "7" : {back:"#B3A2C7", str:"#000000"},
    "8" : {back:"#FCD5B5", str:"#000000"},
    "9" : {back:"#FFFF00", str:"#000000"},
    "10": {back:"#FF6600", str:"#000000"},
    "11": {back:"#FF0000", str:"#000000"},
    "12": {back:"#000000", str:"#FF0000"},
  };

  //ソート関数
  var sort_by = function(field1,field2,reverse){
    reverse = (reverse) ? -1 : 1;
    return function(a,b){
      var a_1 = parseInt(a[field1]);
      var b_1 = parseInt(b[field1]);
      var a_2 = parseInt(a[field2]);
      var b_2 = parseInt(b[field2]);

      if (a_1 == -1 && b_1 != -1) return reverse * -1;
      if (a_1 != -1 && b_1 == -1) return reverse * 1;
      if (a_1 > b_1) return reverse * -1;
      if (a_1 < b_1) return reverse * 1;

      if (a_2 == -1 && b_2 != -1) return reverse * -1;
      if (a_2 != -1 && b_2 == -1) return reverse * 1;
      if (a_2 > b_2) return reverse * -1;
      if (a_2 < b_2) return reverse * 1;
      
      return 0;
    }
  }

  //初期地
  INIT_YEAR_BEGIN = "2007";
  INIT_YEAR_END   = "2017";
  

  //パラメータ取得
  var arg  = new Object;
  url = location.search.substring(1).split('&');
  
  for(i=0; url[i]; i++) {
    var k = url[i].split('=');
    arg[k[0]] = k[1];
  }


  //パラメータ確認
  if("year_begin" in arg == false){
    arg.year_begin = INIT_YEAR_BEGIN;
  }
  if("year_end" in arg == false){
    arg.year_end = INIT_YEAR_END;
  }
  
  if("aoj_userid" in arg && "atcoder_userid" in arg){
    $("#con_yo").prop('checked', arg.con_yo === "1");
    $("#con_ho").prop('checked', arg.con_ho === "1");
    $("#con_sc").prop('checked', arg.con_sc === "1");
    $("#year_begin").val(arg.year_begin);
    $("#year_end").val(arg.year_end);
    $("#aoj_userid").val(arg.aoj_userid);
    $("#atcoder_userid").val(arg.atcoder_userid);
  }else{
    arg.con_yo = "1";
    arg.con_ho = "1";
    arg.con_sc = "1";
    arg.year_begin = INIT_YEAR_BEGIN;
    arg.year_end = INIT_YEAR_END;
    arg.aoj_userid = "";
    arg.atcoder_userid = "";
  }

  var atcoder_userid = arg.atcoder_userid;
  var aoj_userid = arg.aoj_userid;

  //AC済みID
  var solved_atcoder = {};
  var solved_aoj = {};

  //統計 初期化
  var stat_solved = [];
  var stat_problems = [];
  for(var i=1;i<=12;i++){
    stat_solved[i] = 0;
    stat_problems[i] = 0;
  }
  
  $.when(
    //先に終わらす処理
    
    //Atcoder 状態取得
    $.ajax({
		  url:"http://joi.azurewebsites.net/proxy.php",
      data:{url : "http://kenkoooo.com/atcoder-api/problems?user="+atcoder_userid},
      type:"get",
		  dataType:"json",
		  timeout:3000,
		  cache:false,
      error:function(){
        //alert("Atcoder読み込み失敗");
      },
      success:function(data){
        $(data).each(function(){
          if(this.status === "AC"){
            solved_atcoder[this.id] = "1";
          }
        });
      }
    }),
    
    //AOJ 状態取得
    $.ajax({
		  url:"http://joi.azurewebsites.net/proxy.php",
      data:{url : "http://judge.u-aizu.ac.jp/onlinejudge/webservice/solved_record?user_id=" + aoj_userid},
		  type:"get",
		  dataType:"xml",
		  timeout:3000,
		  cache:false,
		  error:function(){
			  //alert("AOJ読み込み失敗");
			},
      success:function(xml){
			  $(xml).find("solved").each(function(){
				  var id=$(this).find("problem_id").text().replace(/\n/g, "");
          solved_aoj[id] = "1";
			  });
		  }
    })
    
  ).done(function(){
    //HTMLを初期化
    $("table.problems tbody").html("<tr><th>難易度</th><th>問題名</th><th>AOJ</th><th>出典</th></tr>");
    
    //HTMLを生成
    $.getJSON("data/problems.json", function(data){
      data.sort(sort_by("level","sort","false"));

      //難易度表作成
      $(data).each(function(){
        //フィルター
        if(this.sort.substr(0,2) < arg.year_begin.substr(2,2) || arg.year_end.substr(2,2) < this.sort.substr(0,2)) return; //年度
        
        if(arg.con_yo !== "1" && this.sort.substr(2,2) == "01") return;
        if(arg.con_ho !== "1" && this.sort.substr(2,2) == "02") return;
        if(arg.con_sc !== "1" && "03" <= this.sort.substr(2,2) && this.sort.substr(2,2) <= "06") return;
        
        var td_class = "none";
        var aoj_link = "";
        var level_st = this.level;

        if(this.level == -1) level_st = "?";
        
        stat_problems[this.level]++;   //統計カウント
        
        if((!!this.aoj_id && solved_aoj[this.aoj_id] === "1") ||
           (!!this.atcoder_id && solved_atcoder[this.atcoder_id] === "1")){
          td_class = "ac";
          stat_solved[this.level]++;   //統計カウント
        }

        if(this.aoj_id != ""){
          aoj_link = '<a href="http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id='+this.aoj_id+'"  target="_blank">★</a>'
        }
        
        $('<tr>'+
          '<td style="background:'+level_color[this.level].back+'; text-align:center; font-weight:bold;">'+
          '<font color="'+level_color[this.level].str+'">'+
          level_st+
          '</font></td>'+
          '<td class="'+td_class+'">'+
          '<a href="http://'+this.atcoder_contest+'.contest.atcoder.jp/tasks/'+this.atcoder_id+'"  target="_blank">'+
          this.name+
          '</a></td>'+
          '<td class="'+td_class+'" style="text-align:center">'+aoj_link+'</td>'+
          '<td class="'+td_class+'">'+this.source+'</td>'+
          '</tr>').appendTo('table.problems tbody');
      });

      //統計表
      var stat_header = '';
      var stat_body1 = '';
      var stat_body2 = '';
      var stat_solved_sum = 0;
      var stat_problems_sum = 0;

      var solved_rate = 0;

      for(var i=1;i<=12;i++){
        if(stat_problems[i] > 0)
          solved_rate = Math.floor(100*stat_solved[i]/stat_problems[i]);
        else
          solved_rate = "--";
        
        stat_header += '<th style="background:'+level_color[i].back+'"><font color="'+level_color[i].str+'">'+i+'</font></th>';
        stat_body1 += '<td>'+stat_solved[i]+'/'+stat_problems[i]+'</td>';
        stat_body2 += '<td>'+solved_rate+'%</td>';
        stat_solved_sum += stat_solved[i];
        stat_problems_sum += stat_problems[i];
      }
      
      if(stat_problems_sum > 0)
        solved_rate = Math.floor(100*stat_solved_sum/stat_problems_sum);
      else
        solved_rate = "--";
      
      stat_header += '<th>ALL</th>';
      stat_body1 += '<td>'+stat_solved_sum+'/'+stat_problems_sum+'</td>';
      stat_body2 += '<td>'+solved_rate+'%</td>';
      
      
      $("table.statistics tbody").html('<tr>'+stat_header+'</tr><tr>'+stat_body1+'</tr><tr>'+stat_body2+'</tr>');

      
    });
  });

});
