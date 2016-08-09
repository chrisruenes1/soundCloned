class AddDescriptionAndPublicColumnsToTracksTable < ActiveRecord::Migration
  def change
    add_column :tracks, :description, :text
    add_column :tracks, :public, :boolean, default: true
    add_index :tracks, :public 
  end
end
