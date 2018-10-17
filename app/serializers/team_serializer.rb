class TeamSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :users, :lists
  belongs_to :user
end
