class AddNotNullToCustomUrl < ActiveRecord::Migration
  def change
    change_column :users, :custom_url, :string, null:false
  end
end
