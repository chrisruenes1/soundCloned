class Track < ActiveRecord::Base
  has_attached_file :image, default_url: "danny-elfman.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/
  validates :title, :composer_id, presence:true

  belongs_to(
    :composer,
    class_name: "User",
    primary_key: :id,
    foreign_key: :composer_id
  )

end
