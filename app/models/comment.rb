class Comment < ActiveRecord::Base
  validates :content, :author_id, :track_id, :elapsed_time, presence: true

  belongs_to(
    :author,
    class_name: "User",
    primary_key: :id,
    foreign_key: :author_id
  )

  belongs_to(
    :track,
    class_name: "Track",
    primary_key: :id,
    foreign_key: :track_id
  )
end
