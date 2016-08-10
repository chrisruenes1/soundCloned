class AddDurationColumnToTrack < ActiveRecord::Migration
  def change
    add_column :tracks, :duration, :float, null: false, default: 0
  end
end
