# frozen_string_literal: true

class CreateReceipts < ActiveRecord::Migration[7.0]
  def change
    create_table :receipts do |t|
      t.integer :amount_paid, null: false
      t.daterange :date_range, null: false
      t.string :tenant_name, null: false

      # Foreign keys
      t.references :user, null: false, foreign_key: true
      t.references :payment, null: false, foreign_key: true

      t.timestamps
    end
  end
end
