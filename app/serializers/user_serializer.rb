class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :position, :team_id
  has_many :lists, :teams
  belongs_to :team
end
