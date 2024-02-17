class Property < ApplicationRecord
  enum branch: { entebbe: 0, makindye: 1 }
  enum status: { vacant: 0, occupied: 1 }
end
