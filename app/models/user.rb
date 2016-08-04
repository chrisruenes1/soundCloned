# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  fname           :string
#  lname           :string
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  group_name      :string           default("The Peaches"), not null
#  city            :string           default("New York City"), not null
#  state           :string
#  bio             :text
#  custom_url      :string
#

class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, :group_name, :city, presence:true
  validates :username, :password_digest, :session_token, uniqueness:true
  validates :password, length: {minimum: 6, allow_nil: true}

  attr_reader :password

  after_initialize :ensure_session_token, :ensure_custom_url

  def self.generate_session_token
    session_token = SecureRandom::urlsafe_base64(16)
    while User.exists?(session_token: session_token)
      session_token = SecureRandom::urlsafe_base64(16)
    end
    session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
  
  def ensure_custom_url
    self.custom_url ||= self.id
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

end
