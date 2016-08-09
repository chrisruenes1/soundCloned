class AddCustomUrlColumnToUser < ActiveRecord::Migration
  def change
    add_column :users, :custom_url, :string
    add_index :users, :custom_url, unique:true
  end
end
