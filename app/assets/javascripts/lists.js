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
  this.task_counter = attributes.tasks.count + 1
  debugger
}

function Lists(attributes){
  this.lists = attributes
}

List.success = function(json){
  var list = new List(json);
  var listDiv = list.renderDiv()
  var $lists = $("div#lists")
  $lists.html("")
  $lists.append(listDiv)
}

Lists.success = function(json){
  var lists = new Lists(json);
  var listsDiv = lists.renderDiv()
  var $lists = $("div#listed_lists")
  $lists.html("")
  $lists.append(listsDiv)
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
  .success(Lists.success)
  .error(List.error)
}

List.linkClickListener = function(){
  $('a.list_nav_link').on("click", List.linkClick)
}

Lists.linkClickListener = function(){
  $('a#lists_link').on("click", Lists.linkClick)
}

List.ready = function(){
  List.templateSource = $("#list-template").html()
  List.template = Handlebars.compile(List.templateSource);
  List.linkClickListener()
}

Lists.ready = function(){
  Lists.templateSources = $("#lists-template").html()
  Lists.templates = Handlebars.compile(Lists.templateSources);
  Lists.linkClickListener()
}

List.prototype.renderDiv = function(){
  return List.template(this)
}

Lists.prototype.renderDiv = function(){
  return Lists.templates(this)
}

$(document).on('turbolinks:load', function(){
  List.ready()
    Lists.ready()


})
