class AddDepositToRentals < ActiveRecord::Migration[7.0]
  def change
    add_column :rentals, :deposit, :integer
  end
end
