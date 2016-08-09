class AddDefaultValueToUserBio < ActiveRecord::Migration
  def change
    change_column :users, :bio, :text, default: ""
  end
end
