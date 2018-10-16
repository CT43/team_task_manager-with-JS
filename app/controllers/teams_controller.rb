class TeamsController < ApplicationController

  def show
    @team = Team.find_by(id: params[:id])
  end
end
