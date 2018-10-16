class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def home
  end

  def new
    @user = User.new
  end

  def show
   @user = current_user
  end

  def create
  @user = User.new(user_params)
   if !params[:new_team_name].empty?
     @team = Team.create(name: params[:new_team_name])
     @user.team = @team
   end
   respond_to do |format|
     if @user.save
       session[:user_id] = @user.id
       format.html { redirect_to user_path(@user) }
     else
       format.html { render :new }
     end
   end
  end

  private
   def set_user
     @user = User.find(params[:id])
   end

   def user_params
     params.require(:user).permit( :name, :password, :email, :position, :team_id, :new_team_name)
   end
end
