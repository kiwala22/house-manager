class CreateProperties < ActiveRecord::Migration[7.0]
  def change
    create_table :properties do |t|
      t.string :branch, null: false, default: ""
      t.integer :price
      t.integer :status, null: false, default: 1
      t.string :room_number

      t.timestamps
    end
  end
end
