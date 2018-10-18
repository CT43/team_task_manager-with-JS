
$(document).on('turbolinks:load', function(){
  $("a#lists_link").on("click", function(e){
    $.get(this.href).success(function(response){
      var $ol = $("div#listed_lists ol")
      $ol.html("")
      response.forEach(function(list){
        $ol.append("<li><a href="+`/users/${list.user_id}/lists/${list.id}`+">"+list.name+"</a></li>")
      })
    })

    e.preventDefault()
  })
})
