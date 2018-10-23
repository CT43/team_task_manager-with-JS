class ListsController < ApplicationController


  def new
    @list = List.new
    @user_id = params[:user_id]
  end

  def create
    @list = List.new(list_params)
    if params[:new_user_num].empty?
      @list.user_id = session[:user_id]
    end
    @list.user_id = params[:new_user_num]
    @list.tasks.collect do |t|
      if t.name == ""
        t.destroy
      end
    end
    if @list.valid?
      @list.save
      redirect_to user_list_path(current_user, @list)
    else
      render :new
    end
  end

  def update
    @list = List.find_by(id: params[:real_id])
    if params[:user_id] === @list.user_id.to_s
      @task = Task.new
      @task.name = list_params[:tasks_attributes][:"0"][:name]
      @task.list_id = @list.id
      @task.save
      respond_to do |format|
          format.json {render :json => @list}
          format.html {render 'show.html.erb'}
      end
    else
      redirect_to root_path
    end
  end

  def index
    if params[:user_id]
      @lists = User.find(params[:user_id]).lists
      respond_to do |format|
          format.json {render :json => @lists}
          format.html {render 'index.html.erb'}
        end
    else
      @lists = List.all
    end
  end

  def show

    @list = List.find_by(id: params[:id])
    if params[:currentTarget] === "next"
      @nextList = List.where("user_id = ?", @list.user_id).where("id > ?", @list.id).first
      respond_to do |format|
          format.json {render :json => @nextList}
          format.html {render 'show.html.erb'}
      end
    elsif params[:currentTarget] === "previous"
      @previousList = List.where("user_id = ?", @list.user_id).where("id < ?", @list.id).last
      respond_to do |format|
          format.json {render :json => @previousList}
          format.html {render 'show.html.erb'}
      end
    else
      respond_to do |format|
          format.json {render :json => @list}
          format.html {render 'show.html.erb'}
      end
    end
  end

  def destroy
    @list = List.find(params[:id])
    @list.destroy
    redirect_to user_path(current_user)
  end

  private

    def list_params
      params.require(:list).permit(:name, task_ids:[], tasks_attributes: [:name])
    end

end
