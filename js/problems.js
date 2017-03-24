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

  //回答状況取得
  var get_user_status = function(aoj_to_problemid, atcoder_to_problemid, user, callback){

    //初期化
    var solved = {};

    if(user.atcoder_id == "" && user.aoj_id == ""){
      callback(solved);
    }
    
    $.when(
      //Atcoder 状態取得
      $.ajax({
        url:"http://joi.azurewebsites.net/proxy.php",
        data:{url : "http://kenkoooo.com/atcoder-api/problems?user="+user.atcoder},
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
              solved[atcoder_to_problemid[this.id]] = "1";
            }
          });
        }
      }),
      
      //AOJ 状態取得
      $.ajax({
        url:"http://joi.azurewebsites.net/proxy.php",
        data:{url : "http://judge.u-aizu.ac.jp/onlinejudge/webservice/solved_record?user_id=" + user.aoj},
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
            solved[aoj_to_problemid[id]] = "1";
          });
        }
      })
      
    ).done(
      function(){
        callback(solved);
      }
    );

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

  if(("aoj_userid" in arg && "atcoder_userid" in arg) == false){
    arg.con_yo = "1";
    arg.con_ho = "1";
    arg.con_sc = "1";
    arg.year_begin = INIT_YEAR_BEGIN;
    arg.year_end = INIT_YEAR_END;
    arg.aoj_userid = "";
    arg.atcoder_userid = "";
    arg.rival_aoj_userid = "";
    arg.rival_atcoder_userid = "";
  }
  
  $("#con_yo").prop('checked', arg.con_yo === "1");
  $("#con_ho").prop('checked', arg.con_ho === "1");
  $("#con_sc").prop('checked', arg.con_sc === "1");
  $("#year_begin").val(arg.year_begin);
  $("#year_end").val(arg.year_end);
  $("#aoj_userid").val(arg.aoj_userid);
  $("#atcoder_userid").val(arg.atcoder_userid);
  $("#rival_aoj_userid").val(arg.rival_aoj_userid);
  $("#rival_atcoder_userid").val(arg.rival_atcoder_userid);


  var user_id = {"atcoder" : arg.atcoder_userid,
                 "aoj" : arg.aoj_userid};
  var rival_id = {"atcoder" : arg.rival_atcoder_userid,
                  "aoj" : arg.rival_aoj_userid};
  
  //統計 初期化
  var user_ac_counter = [];
  var rival_ac_counter = [];
  var problem_counter = [];
  
  for(var i=-1;i<=12;i++){
    user_ac_counter[i] = 0;
    rival_ac_counter[i] = 0;
    problem_counter[i] = 0;
  }

  $.getJSON("data/problems.json", function(data){
    var atcoder_to_problemid = {};
    var aoj_to_problemid = {};

    $(data).each(function(){
      atcoder_to_problemid[this.atcoder_id] = this.problem_id;
      aoj_to_problemid[this.aoj_id] = this.problem_id;
    });

    get_user_status(aoj_to_problemid, atcoder_to_problemid, user_id, function(user_ac){

      get_user_status(aoj_to_problemid, atcoder_to_problemid, rival_id, function(rival_ac){

        
        $("div.user_color").html('');

        if(rival_id.aoj == "" && rival_id.atcoder == ""){
          $('').appendTo("div.user_color");
        }else{
          $('<span class="user-mark">'+user_id.aoj+'/'+user_id.atcoder+'のみ</span>'+
            '<span class="rival-mark">'+rival_id.aoj+'/'+rival_id.atcoder+'のみ</span>'+
            '<span class="both-mark">両方</span>'
           ).appendTo("div.user_color");
        }

        $("table.problems tbody").html(
          '<tr><th>難易度</th><th>問題名</th><th>AOJ</th><th>出典</th></tr>'
        );
        
        //並び替え
        data.sort(sort_by("level","problem_id","false"));

        $(data).each(function(){
          //フィルター
          if(this.problem_id.substr(0,2) < arg.year_begin.substr(2,2) || arg.year_end.substr(2,2) < this.problem_id.substr(0,2)) return; //年度
          if(arg.con_yo !== "1" && this.problem_id.substr(2,2) == "01") return;
          if(arg.con_ho !== "1" && this.problem_id.substr(2,2) == "02") return;
          if(arg.con_sc !== "1" && "03" <= this.problem_id.substr(2,2) && this.problem_id.substr(2,2) <= "06") return;
          
          //統計カウント
          if(user_ac[this.problem_id] == "1"){
            user_ac_counter[this.level]++;
          }
          if(rival_ac[this.problem_id] == "1"){
            rival_ac_counter[this.level]++;
          }
          problem_counter[this.level]++;
          
          //表示関連
          var level_str = this.level;
          
          if(this.level == -1) level_str = "?";
          
          var td_class = "";
          if(user_ac[this.problem_id] == "1"){
            td_class += "ac";
          }else{
            td_class += "none";
          }
          
          td_class += "-";
          
          if(rival_ac[this.problem_id] == "1"){
            td_class += "ac";
          }else{
            td_class += "none";
          }
          
          var aoj_link = "";
          if(this.aoj_id != ""){
            aoj_link = '<a href="http://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id='+this.aoj_id+'"  target="_blank">★</a>'
          }

          
          //表示
          $('<tr>'+
            '<td style="background:'+level_color[this.level].back+'; text-align:center; font-weight:bold;">'+
            '<font color="'+level_color[this.level].str+'">'+
            level_str+
            '</font></td>'+
            '<td class="'+td_class+'">'+
            '<a href="http://'+this.atcoder_contest+'.contest.atcoder.jp/tasks/'+this.atcoder_id+'"  target="_blank">'+
            this.name+
            '</a></td>'+
            '<td class="'+td_class+'" style="text-align:center">'+aoj_link+'</td>'+
            '<td class="'+td_class+'">'+this.source+'</td>'+
            '</tr>'
           ).appendTo('table.problems tbody');

          //統計表
          var stat_header = '';
          
          var solved_rate = 0;

          var add_statistics = function(user, ac_counter, problem_counter, rival){
            var ac_counter_all = 0;
            var problem_counter_all = 0;
            var stat_body1 = '';
            var stat_body2 = '';

            if(rival){
              $('<tr><td colspan="14" class="user-name">'+
                '<span class="rival-mark">'+user.aoj+'/'+user.atcoder+'</span></td></tr>'
               ).appendTo("table.statistics tbody");
            }else{
              $('<tr><td colspan="14" class="user-name">'+
                '<span class="user-mark">'+user.aoj+'/'+user.atcoder+'</span></td></tr>'
               ).appendTo("table.statistics tbody");
            }
            for(var i=1;i<=12;i++){
              if(problem_counter[i] > 0)
                solved_rate = Math.floor(100*ac_counter[i]/problem_counter[i]);
              else
                solved_rate = "--";
              
              stat_body1 += '<td>'+ac_counter[i]+'/'+problem_counter[i]+'</td>';
              stat_body2 += '<td>'+solved_rate+'%</td>';
              ac_counter_all += ac_counter[i];
              problem_counter_all += problem_counter[i];
            }

            // ?
            if(problem_counter[-1] > 0)
              solved_rate = Math.floor(100*ac_counter[-1]/problem_counter[-1]);
            else
              solved_rate = "--";
            
            stat_body1 += '<td>'+ac_counter[-1]+'/'+problem_counter[-1]+'</td>';
            stat_body2 += '<td>'+solved_rate+'%</td>';
            ac_counter_all += ac_counter[-1];
            problem_counter_all += problem_counter[-1];
            
            // ALL
            if(problem_counter_all > 0)
              solved_rate = Math.floor(100*ac_counter_all/problem_counter_all);
            else
              solved_rate = "--";
            
            stat_body1 += '<td>'+ac_counter_all+'/'+problem_counter_all+'</td>';
            stat_body2 += '<td>'+solved_rate+'%</td>';

            $('<tr>'+stat_body1+'</tr><tr>'+stat_body2+'</tr>').appendTo("table.statistics tbody");
          }
          
          for(var i=1;i<=12;i++){
            stat_header += '<th style="background:'+level_color[i].back+'"><font color="'+level_color[i].str+'">'+i+'</font></th>';
          }
          stat_header += '<th style="background:'+level_color["-1"].back+'">?</th><th>ALL</th>';
          $("table.statistics tbody").html('<tr>'+stat_header+'</tr>');

          add_statistics(user_id, user_ac_counter, problem_counter,false);
          
          if((rival_id.aoj == "" && rival_id.atcoder == "") == false)
            add_statistics(rival_id, rival_ac_counter, problem_counter,true);
          
        });
      });  
    });
  });

});
