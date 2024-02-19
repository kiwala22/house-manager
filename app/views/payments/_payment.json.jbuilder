# frozen_string_literal: true

json.extract! payment, :id, :amount, :user_id, :property_id, :tenant_id, :created_at, :updated_at
json.url property_url(property, format: :json)
