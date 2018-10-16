class SessionsController < ApplicationController

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end

  def new
    @user = User.new
    @users = User.all
  end

  def create
    @user = User.find_by(name: params[:user][:name])
    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      redirect_to user_path(@user), notice: "Hi"
    else
      redirect_to login_path
    end
  end

  def loginbyfacebook
    @user = User.find_by(email: auth['info']['email']) do |u|
      u.uid = auth['uid']
      u.email = auth['info']['email']
      u.image = auth['info']['image']
    end
    session[:user_id] = @user.id
    render '/users/show'
  end

  private

  def auth
    request.env['omniauth.auth']
  end
end
