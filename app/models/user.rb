class User < ApplicationRecord
  has_secure_password

  belongs_to :team, required: false
  has_many :teams
  has_many :users, through: :teams
  has_many :lists
  has_many :tasks, through: :lists

  validates :email, uniqueness: true
  validates :name, presence: true


end
