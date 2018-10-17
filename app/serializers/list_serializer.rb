class ListSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :team_id
  belongs_to :team 
  belongs_to :user
  has_many :tasks
end
