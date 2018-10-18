function List(attributes){
  this.name = attributes.name;
  this.id = attributes.id;
  this.previous = this.id - 1
  this.next = this.id + 1
  this.tasks = attributes.tasks;
  this.team = attributes.team;
  this.team_id = attributes.team_id;
  this.user = attributes.user;
  this.user_id = attributes.user_id;
}

function Lists(attributes){
  debugger
}

List.success = function(json){
  var list = new List(json);
  var listDiv = list.renderDiv()
  var $lists = $("div#lists")
  $lists.html("")
  $lists.append(listDiv)
}

List.lists = function(json){
  var list = new Lists(json);
  var listDiv = list.renderDiv()
  var $lists = $("div#lists")
  $lists.html("")
  $lists.append(listDiv)
}

List.error = function(response){
  console.log("whoops", response)
}

List.linkClick = function(e){
  e.preventDefault()

  $.ajax({
    url: this.href,
    dataType: "json",
    method: "GET"
  })
  .success(List.success)
  .error(List.error)
}

Lists.linkClick = function(e){
  e.preventDefault()


  $.ajax({
    url: this.href,
    dataType: "json",
    method: "GET"
  })
  .success(List.lists)
  .error(List.error)
}


// List.prototype.$li = function(){
//   return $("li#item_"+this.id)
// }
// List.prototype.destroy = function(){
//   this.$li().remove();
// }

// List.destroyListener = function(){
//   $("ul.todo-list").on("click", "input.destroy", function(e){
//     e.preventDefault();
//     // submit this form via ajax and then remove the item
//     var $form = $(this).parent("form");
//     var action = $form.attr("action");
//     var params = $form.serialize();
//
//     $.ajax({
//       url: action,
//       data: params,
//       dataType: "json",
//       method: "DELETE"
//     })
//     .success(List.destroy)
//   })
// }
List.linkClickListener = function(){
  $('a.list_nav_link').on("click", List.linkClick)
}

Lists.linkClickListener = function(){
  $('a#listed_lists').on("click", Lists.linkClick)
}

List.ready = function(){
  List.templateSource = $("#list-template").html()
  List.template = Handlebars.compile(List.templateSource);
  List.linkClickListener()
}

Lists.ready = function(){
  Lists.templateSource = $("#lists-template").html()
  Lists.template = Handlebars.compile(Lists.templateSource);
  Lists.linkClickListener()
}

List.prototype.renderDiv = function(){
  return List.template(this)
}

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

$(document).on('turbolinks:load', function(){
  List.ready()
  Lists.ready()
})
