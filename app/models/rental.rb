# frozen_string_literal: true

class Rental < ApplicationRecord
  belongs_to :tenant
  belongs_to :property
  belongs_to :user

  validates :start_date, :end_date, presence: true
end
