class CreateUser < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :fname
      t.string :lname
      t.string :username, null:false
      t.string :password_digest, null:false
      t.string :session_token, null:false
      t.string :group_name, null:false
      t.string :city, null:false
      t.string :state
      t.text :bio
    end
    add_index :users, :username, unique:true
    add_index :users, :session_token, unique:true
    add_index :users, :city
  end
end
