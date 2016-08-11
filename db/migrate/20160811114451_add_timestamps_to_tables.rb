class AddTimestampsToTables < ActiveRecord::Migration
  def change
    add_column(:users, :created_at, :datetime)
    add_column(:users, :updated_at, :datetime)
    add_column(:comments, :created_at, :datetime)
    add_column(:comments, :updated_at, :datetime)
    add_column(:tracks, :created_at, :datetime)
    add_column(:tracks, :updated_at, :datetime)
  end
end
