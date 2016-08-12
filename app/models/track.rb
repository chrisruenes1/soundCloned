# == Schema Information
#
# Table name: tracks
#
#  id                      :integer          not null, primary key
#  title                   :string           not null
#  composer_id             :integer          not null
#  album                   :string
#  image_file_name         :string
#  image_content_type      :string
#  image_file_size         :integer
#  image_updated_at        :datetime
#  audio_file_file_name    :string
#  audio_file_content_type :string
#  audio_file_file_size    :integer
#  audio_file_updated_at   :datetime
#  description             :text
#  public                  :boolean          default(TRUE)
#  genre                   :string
#

class Track < ActiveRecord::Base
  has_attached_file :image, default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/


  has_attached_file :audio_file, default_url: "NoMoreHeroes-NineToLife.mp3"
  validates_attachment_content_type :audio_file, content_type: /\Aaudio\/.*\Z/


  validates :title, :composer_id, :duration, :audio_file, presence: true

  belongs_to(
    :composer,
    class_name: "User",
    primary_key: :id,
    foreign_key: :composer_id
  )

  has_many(
    :comments,
    dependent: :destroy,
    class_name: "Comment",
    primary_key: :id,
    foreign_key: :track_id
  )
end
