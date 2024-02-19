# frozen_string_literal: true

json.extract! tenant, :id, :name, :phone_number, :nin_number, :user_id, :created_at, :updated_at
json.url tenant_url(tenant, format: :json)
