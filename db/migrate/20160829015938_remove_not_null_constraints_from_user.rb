class RemoveNotNullConstraintsFromUser < ActiveRecord::Migration
  def change
    change_column_null :users, :city, true
    change_column_null :users, :group_name, true
  end
end
