# frozen_string_literal: true

class CreateRentals < ActiveRecord::Migration[7.0]
  def change
    create_table :rentals do |t|
      t.references :tenant, null: false, foreign_key: true
      t.references :property, null: false, foreign_key: true
      t.date :start_date, null: false
      t.date :end_date, null: false

      t.timestamps
      t.references :user, null: false, foreign_key: true
    end
  end
end
