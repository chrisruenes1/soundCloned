class CreateComment < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :content, null: false
      t.integer :author_id, null: false
      t.integer :track_id, null: false
      t.float :elapsed_time, null: false
    end
    add_index :comments, :author_id
    add_index :comments, :track_id
  end
end
