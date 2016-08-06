class AddGenreColumnToTrackModel < ActiveRecord::Migration
  def change
    add_column :tracks, :genre, :string
    add_index :tracks, :genre
  end
end
