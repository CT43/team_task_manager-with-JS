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
    data: {
    currentTarget: e.currentTarget.className,
  },
    method: "GET"
  })
  .success(List.success)
  .error(List.error)
}

List.newTask = function(e){
  e.preventDefault()
  List.templateSource = $("#list-template").html()
  List.template = Handlebars.compile(List.templateSource);

  var $form = $(this);
  var action = $form.attr("action");
  var params = $form.serialize();
  $.ajax({
    url: this.href,
    data: params,
    dataType: "json",
    method: "POST"
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

$(document).ready(function(){
  $(document).on('submit', 'form.edit_list', List.newTask);
  $(document).on('click', 'a#lists_link', Lists.linkClick);
  $(document).on('click', 'a.next', List.linkClick);
  $(document).on('click', 'a.previous', List.linkClick);
})
