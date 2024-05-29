class AddActiveToRental < ActiveRecord::Migration[7.0]
  def change
    add_column :rentals, :active, :boolean, default: true
  end
end
