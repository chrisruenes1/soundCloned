class CreateTrackTable < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title, null:false
      t.integer :composer_id, null:false
      t.string :album
    end
    add_index :tracks, :composer_id
    add_index :tracks, :album
  end
end
