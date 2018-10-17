class TaskSerializer < ActiveModel::Serializer
  attributes :id, :name, :completed, :list_id
  belongs_to :list
end
