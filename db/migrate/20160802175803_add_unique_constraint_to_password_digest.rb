class AddUniqueConstraintToPasswordDigest < ActiveRecord::Migration
  def change
    add_index :users, :password_digest, unique:true
  end
end
