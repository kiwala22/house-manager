# frozen_string_literal: true

json.extract! property, :id, :user_id, :branch, :price, :room_number, :status, :created_at, :updated_at
json.url property_url(property, format: :json)
