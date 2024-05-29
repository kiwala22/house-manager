# frozen_string_literal: true

class CreateTenants < ActiveRecord::Migration[7.0]
  def change
    create_table :tenants do |t|
      t.string :name, null: false
      t.string :email
      t.string :phone
      t.string :ninNumber, null: false
      t.integer :status, null: false, default: 1

      t.timestamps
      t.references :user, null: false, foreign_key: true
    end
  end
end
