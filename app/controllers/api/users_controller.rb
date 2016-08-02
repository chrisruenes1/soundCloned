class Api::UsersController < ApplicationController
  def new
    @user = new User
  end

  def show
    @user = User.find(params[:id])
  end

  def create
    @user = new User(user_params)
    if @user.save
      render :show
    else
      render json: @user.errors.full_messages, status:400
    end
  end

  def user_params
    params.require(:user).permit(:fname, :lname, :username, :group_name, :city, :state, :bio)
  end
end
