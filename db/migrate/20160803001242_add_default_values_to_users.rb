class AddDefaultValuesToUsers < ActiveRecord::Migration
  def change
    change_column :users, :group_name, :string, null:false, default:"The Peaches"
    change_column :users, :city, :string, null:false, default:"New York City"
  end
end
