# == Schema Information
#
# Table name: comments
#
#  id           :integer          not null, primary key
#  content      :text             not null
#  author_id    :integer          not null
#  track_id     :integer          not null
#  elapsed_time :float            not null
#  created_at   :datetime
#  updated_at   :datetime
#

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
