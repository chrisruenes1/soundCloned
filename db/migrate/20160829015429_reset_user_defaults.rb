class ResetUserDefaults < ActiveRecord::Migration
  def change
    change_column_default :users, :city, ""
    change_column_default :users, :group_name, "" 
  end
end
