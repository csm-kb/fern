# frozen_string_literal: true

require_relative "playlist/types/PlaylistCreateRequest"
require_relative "playlist/types/PLAYLIST_ID"
require_relative "commons/types/USER_ID"
require "json"

module SeedClient
  module Playlist
    class Playlist < Playlist::PlaylistCreateRequest
      attr_reader :playlist_id, :owner_id, :additional_properties

      # @param playlist_id [Playlist::PLAYLIST_ID]
      # @param owner_id [Commons::USER_ID]
      # @param additional_properties [OpenStruct] Additional properties unmapped to the current class definition
      # @return [Playlist::Playlist]
      def initialze(playlist_id:, owner_id:, additional_properties: nil)
        # @type [Playlist::PLAYLIST_ID]
        @playlist_id = playlist_id
        # @type [Commons::USER_ID]
        @owner_id = owner_id
        # @type [OpenStruct] Additional properties unmapped to the current class definition
        @additional_properties = additional_properties
      end

      # Deserialize a JSON object to an instance of Playlist
      #
      # @param json_object [JSON]
      # @return [Playlist::Playlist]
      def self.from_json(json_object:)
        struct = JSON.parse(json_object, object_class: OpenStruct)
        playlist_id = struct.playlist_id
        owner_id = struct.owner - id
        new(playlist_id: playlist_id, owner_id: owner_id, additional_properties: struct)
      end

      # Serialize an instance of Playlist to a JSON object
      #
      # @return [JSON]
      def to_json(*_args)
        { "playlist_id": @playlist_id, "owner-id": @owner_id }.to_json
      end

      # Leveraged for Union-type generation, validate_raw attempts to parse the given hash and check each fields type against the current object's property definitions.
      #
      # @param obj [Object]
      # @return [Void]
      def self.validate_raw(obj:)
        obj.playlist_id.is_a?(String) != false || raise("Passed value for field obj.playlist_id is not the expected type, validation failed.")
        obj.owner_id.is_a?(String) != false || raise("Passed value for field obj.owner_id is not the expected type, validation failed.")
      end
    end
  end
end