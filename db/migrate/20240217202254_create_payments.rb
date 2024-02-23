# frozen_string_literal: true

class CreatePayments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.integer :amount, null: false
      t.string  :tenant_name, null: false
      t.string  :phone_number, null: false
      t.string  :nin_number
      t.daterange :date_range

      # Foreign keys
      t.references :property, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
