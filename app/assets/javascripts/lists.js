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
  this.task_counter = attributes.tasks.length + 1
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
  List.templateSource = $("#list-template").html()
  List.template = Handlebars.compile(List.templateSource);

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
  Lists.templateSources = $("#lists-template").html()
  Lists.templates = Handlebars.compile(Lists.templateSources);

  $.ajax({
    url: this.href,
    dataType: "json",
    method: "GET"
  })
  .success(Lists.success)
  .error(List.error)
}

List.prototype.renderDiv = function(){
  return List.template(this)
}

Lists.prototype.renderDiv = function(){
  return Lists.templates(this)
}

$(document).on('turbolinks:load', function(){
  $('input.new_task_submit').on("click", List.linkClick)
  $('a#lists_link').on("click", Lists.linkClick)
  $('a.list_nav_link').on("click", List.linkClick)
})
