# frozen_string_literal: true

class Tenant < ApplicationRecord
  has_many :rentals
  has_many :properties, through: :rentals
  # has_many :payments, through: :rentals
  has_many :payments
  belongs_to :user

  validates :name, presence: true
  validates :phone, presence: true
  validates :ninNumber, presence: true

  enum status: { Active: 0, Inactive: 1 }
  scope :ordered, -> { order(id: :desc) }
end
