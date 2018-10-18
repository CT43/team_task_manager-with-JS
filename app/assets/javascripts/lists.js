function List(attributes){
  this.name = attributes.name;
  this.id = attributes.id;
}

List.success = function(json){
  var list = new List(json);
  var listDiv = list.renderDiv()
  var $lists = $("div#lists")
  $lists.html("")
  $("div#list_navigation").html("")
  $lists.append(listDiv)
}

List.error = function(response){
  console.log("Yu broke it?", response)
}

List.formSubmit = function(e){
  e.preventDefault()

  $.ajax({
    url: this.href,
    dataType: "json",
    method: "GET"
  })
  .success(List.success)
  .error(List.error)
}

List.destroy = function(json){
  var list = new List(json);
  list.destroy()
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
List.formSubmitListener = function(){
  $('a.list_nav_link').on("click", List.formSubmit)
}

List.ready = function(){
  List.templateSource = $("#list-template").html()
  List.template = Handlebars.compile(List.templateSource);
  List.formSubmitListener()
  // List.destroyListener()
}

List.prototype.renderDiv = function(){

  return List.template(this)
}

$(document).on('turbolinks:load', function(){
  List.ready()
})


// $(document).on('turbolinks:load', function(){
//   $("a#lists_link").on("click", function(e){
//     $.get(this.href).success(function(response){
//       var $ol = $("div#listed_lists ol")
//       $ol.html("")
//       debugger
//       response.forEach(function(list){
//         $ol.append("<li><a href="+`/users/${list.user_id}/lists/${list.id}`+">"+list.name+"</a></li>")
//       })
//     })
//
//     e.preventDefault()
//   })
//
//   $("a.list_nav_link").on("click", function(e){
//     $.get(this.href).success(function(response){
//       var $lists = $("div#lists")
//       $lists.html("")
//       debugger
//
//
//       var html = '<% escape_javascript @list%>'
//       $lists.html(html)
//     })
//
//
//     e.preventDefault()
//   })
// })
