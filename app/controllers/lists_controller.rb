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
    if params[:user_id]
      @list = List.find_by(id: params[:id])
      respond_to do |format|
          format.json {render :json => @list}
          format.html {render 'show.html.erb'}
      end
    else
      render 'index.html.erb'
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
