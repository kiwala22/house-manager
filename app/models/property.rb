# frozen_string_literal: true

class Property < ApplicationRecord
  enum status: { occupied: 0, vacant: 1 }
  enum branch: { entebbe: 0, makindye: 1 }

  has_many :payments
  belongs_to :user
end
