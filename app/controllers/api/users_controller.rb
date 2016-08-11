class Api::UsersController < ApplicationController
  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login_user!(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status:422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status:422
    end
  end

  def find_by_url
    @user = User.find_by(custom_url: params[:custom_url])
    if @user
      render "api/users/show"
    else
      render json: ["Sorry, we couldn't find that user!"], status:404
    end
  end

  def update_by_url
    @user = User.find_by(custom_url: params[:custom_url])
    if @user.update(user_params)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status:422
    end
  end

  def user_params
    params.require(:user).permit(:username, :password, :fname, :lname, :group_name, :city, :state, :bio, :custom_url, :image)
  end

end
