# frozen_string_literal: true

json.extract! tenant, :id, :name, :phone, :status, :ninNumber, :created_at, :updated_at, :user
json.url tenant_url(tenant, format: :json)
