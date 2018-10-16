class Task < ApplicationRecord
  belongs_to :list

  def self.tasks_to_complete
    where("completed == 0")
  end

  def task_user?(current_user)
    self.list.user == current_user
  end

  def boss?(current_user)
    current_user.position > self.list.user.position
  end

  def self.task_count
    all.count
  end


end
