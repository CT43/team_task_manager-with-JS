class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :position, :team_id
  has_many :lists
  has_many :teams
  belongs_to :team
end
