json.extract! user, :id, :username, :fname, :lname, :group_name, :city, :state, :bio, :custom_url, :comments, :tracks
json.image_url asset_path(user.image.url(:original))
