json.extract! tenant, :id, :name, :phone, :status, :nin_number, :created_at, :updated_at, :user
json.url tenant_url(tenant, format: :json)
