jQuery(function($) {
  jQuery("#selectFileSample2").click(function() {
    var selectFileSample1 = document.getElementById("selectFileSample1").value;
    document.getElementById("selectFileSample3").value = selectFileSample1;
  });
});

$(function() {
    $('.checkform').on('submit', function(e){
    e.preventDefault();
    console.log(this);
    var formData = new FormData(this);
    var url = $(this).attr('action')
    var target =$(this)

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){

    var html = `<div class="menu__right__add">${data}`
    var from = target.children('input')[2].value
    console.log(from);
    var to = target.children('input')[3].value
    var cost = target.children('input')[4].value
    var link = `https://transit.yahoo.co.jp/search/result?flatlon=&fromgid=&from=${from}$tlatlon=&togid=&to=${to}&viacode=&via=&viacode=&via=&viacode=&via=&y=2019&m=03&d=21&hh=20&m2=6&m1=1&type=1&ticket=ic&expkind=1&ws=3&s=1&al=1&shin=1&ex=1&hb=1&lb=1&sr=1&kw=${to}`

    if (cost == data){
      var html = `${html}&nbsp;&nbsp;OK&nbsp;&nbsp;&nbsp;&nbsp;<a href=${link}>url</a></div>`
    }else{
      var html = `${html}&nbsp;&nbsp;NG&nbsp;&nbsp;&nbsp;&nbsp;<a href=${link}>url</a></div>`
    }

      $('.right').append(html)
    })

    //   var message = $('.chat__wrapper')[0].scrollHeight
    //   $('.chat__wrapper').animate({scrollTop: message});
    // })

    .fail(function(XMLHttpRequest, textStatus, errorThrown) {
    alert('error!!!');
　　console.log("XMLHttpRequest : " + XMLHttpRequest.status);
　　console.log("textStatus     : " + textStatus);
　　console.log("errorThrown    : " + errorThrown.message);
});
  })
});
