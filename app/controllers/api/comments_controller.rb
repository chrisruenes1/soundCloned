class Api::CommentsController < ApplicationController

  def index
    @comments = Comment.find_by(trackId: params[:track_id])
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.track_id = params[:track_id]
    if @comment.save!
      render "api/comments/show"
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      render "api/comments/show"
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    if @comment.destroy
      render "api/comment/show"
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def comment_params
    params.require(:comment).permit(:content, :author_id, :elapsed_time)
  end
end
