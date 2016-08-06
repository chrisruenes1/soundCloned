class TracksController < ApplciationController
  def index
    @tracks = Track.all
  end

  def show
    @track = Track.find(params[:id])
  end

  def create
    @track = Track.new(trackParams)
    if @track.save
      render 'api/tracks/show'
    else
      render json: @track.errors.full_messages
    end
  end

  def update
    @track = Track.find(params[:id])
    if @track.update(trackParams)
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

end
