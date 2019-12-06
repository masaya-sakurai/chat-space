$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `<div class="main__body--text">
                    <div class="main__body--text--mamber">
                      ${ message.user_name }
                    </div>
                    <div class="main__body--text--date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class="main__body--text--massage">
                    <p class="main__body--text--massage__content">
                      ${ message.content }
                    </p>
                    ${insertImage}
                  </div>`
    //メッセージに画像が含まれる場合のHTMLを作る
    } else {
      var html = `<div class="main__body--text">
                    <div class="main__body--text--mamber">
                      ${ message.user_name }
                    </div>
                    <div class="main__body--text--date">
                      ${ message.created_at }
                    </div>
                  </div>
                  <div class="main__body--text--massage">
                    <p class="main__body--text--massage__content">
                      ${ message.content }
                    </p>
                  </div>`
    }
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildHTML(message);
      $('.main__body').append(html);
      $('#message_content').val('');
      $('.main__body').animate({ scrollTop: $('.main__body')[0].scrollHeight});
      $('.main__form__btn').attr('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
});