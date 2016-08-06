class Api::TracksController < ApplicationController
  def index
    @tracks = Track.all
  end

  def show
    @track = Track.find(params[:id])
  end

  def create
    @track = Track.new(track_params)
    if @track.save
      render 'api/tracks/show'
    else
      render json: @track.errors.full_messages
    end
  end

  def update
    @track = Track.find(params[:id])
    if @track.update(track_params)
      render 'api/tracks/show'
    else
      render json: @track.errors.full_messages
    end
  end

  def destroy
    @track = Track.find(params[:id])
    if @track.destroy
      render 'api/tracks/show'
    else
      render json: @track.errors.full_messages
    end
  end

  def track_params
    params.require(:track).permit(:title, :album, :composer_id,
      :image_file_name, :image_file_size, :image_content_type, :image_updated_at,
      :audio_file_file_name, :audio_file_file_size, :audio_file_content_type, :audio_file_updated_at)
  end


end
