class CreateTenants < ActiveRecord::Migration[7.0]
  def change
    create_table :tenants do |t|
      t.string :name
      t.string :phone_number
      t.string :nin_number

      t.timestamps
    end
  end
end
