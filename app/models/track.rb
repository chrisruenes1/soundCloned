class Track < ActiveRecord::Base
  validates :title, :composer_id, presence:true

  belongs_to(
    :composer,
    class_name: "User",
    primary_key: :id,
    foreign_key: :composer_id
  )
end
