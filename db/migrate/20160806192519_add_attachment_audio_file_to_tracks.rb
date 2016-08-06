class AddAttachmentAudioFileToTracks < ActiveRecord::Migration
  def self.up
    change_table :tracks do |t|
      t.attachment :audio_file
    end
  end

  def self.down
    remove_attachment :tracks, :audio_file
  end
end
