# frozen_string_literal: true

class CreateProperties < ActiveRecord::Migration[7.0]
  def change
    create_table :properties do |t|
      t.integer :branch, null: false, default: 1
      t.integer :price
      t.integer :status, null: false, default: 1
      t.string :room_number

      # Foreign key
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
