class Team < ApplicationRecord
  belongs_to :user, required: false
  has_many :users
  has_many :lists
  has_many :tasks, through: :lists


end
