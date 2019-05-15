$(function() {
    $('.fileimport').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')

      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })

      .done(function(datas){
        datas.forEach(function( data, index ) {

        var html = `<div class="menu__left" data-no="${index+3}"><form class="checkform" id="form${index+3}" action="/checks_new" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="OJxJz2RUz+qrcXQaPFNmMDjb1e3SjAiQUBcKb6jeAuJ8j5zjQTbo2s56NIwztlITFwN8fKaqwUg64SIneiaNCw==" /><input placeholder="出発駅" type="text" name="fromstation" class="fromstation" value=${data[0]}> <input placeholder="到着駅" type="text" name="tostation" class="tostation" value=${data[1]}> <input placeholder="金額" type="text" name="cost" class="cost" value=${data[2]}> <input type="submit" value="CHECK" style="display:none;"></div>`
        $('.left').append(html);
      });
    })

    .fail(function(XMLHttpRequest, textStatus, errorThrown) {
      $('#importbutton').prop('disabled', false);
      alert('error!!!');
      console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      console.log("textStatus     : " + textStatus);
      console.log("errorThrown    : " + errorThrown.message);
    })

  })
    $('#btn_id').click(function(){
      var targetform = document.getElementsByClassName("checkform");
      var targetcount = targetform.length;
      $('#form0').submit();
      $('#btn_id2').show();
    });

    $('#btn_id2').click(function(){
      var targetform = document.getElementsByClassName("checkform");
      var targetcount = targetform.length;
      var movedata = [['出発駅','到着駅','入力金額','最安値','判定','リンク']];
      var targetright = document.getElementsByClassName("menu__right__add");
      for (i = 0; i < targetcount; i++){
         tempdata = []
         tempdata.push(targetform[i].elements[2].value);
         tempdata.push(targetform[i].elements[3].value);
         tempdata.push(targetform[i].elements[4].value);
         tempdata.push(targetright[i].children[0].textContent.split(',').join('').trim());
         tempdata.push(targetright[i].children[1].textContent);
         tempdata.push(targetright[i].children[2]);
         movedata.push(tempdata);
      }
      var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);

      // CSV データの用意
      var csv_data = movedata.map(function(l){return l.join(',')}).join('\r\n');

      var blob = new Blob([bom, csv_data], { type: 'text/csv' });

      var url = (window.URL || window.webkitURL).createObjectURL(blob);

      var a = document.getElementById('downloader');
      a.download = 'data.csv';
      a.href = url;

      // ダウンロードリンクをクリックする
      $('#downloader')[0].click();
    });


    $(document).on("submit", ".checkform", function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      var target =$(this)
      var nextformno = ($(this).parent(0).data('no')+1);


      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })

      .done(function(data){
      var html = `<div class="menu__right__add"><span>${data[0]}</span>`
      var from = target.children('input')[2].value
      var to = target.children('input')[3].value
      var cost = target.children('input')[4].value
      var link = `${data[1]}`
      if (cost == data[0]){
        var html = `${html}&nbsp;&nbsp;<span>OK</span>&nbsp;&nbsp;&nbsp;&nbsp;<a href=${link}>url</a></div>`
      }else{
        var html = `${html}&nbsp;&nbsp;<span>NG</span>&nbsp;&nbsp;&nbsp;&nbsp;<a href=${link}>url</a></div>`
      }

        $('.right').append(html)
        var targetform = document.getElementsByClassName("checkform");
        $('#form'+nextformno).submit();
      })

      .fail(function(XMLHttpRequest, textStatus, errorThrown) {
      alert('error!!!');
      console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      console.log("textStatus     : " + textStatus);
      console.log("errorThrown    : " + errorThrown.message);
      });
    })
});
