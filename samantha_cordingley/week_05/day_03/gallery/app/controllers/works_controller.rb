class WorksController < ApplicationController
  def index
    @works = Work.all
  end

  def new
    @work = Work.new
  end

  def create
    work = Work.create work_params
    redirect_to work
  end

  def edit
    @work = Work.find params[:id]
  end

  def update
    work = Work.find params[:id]
    work.update work_params
    redirect_to work
  end

  def show
    @work = Work.find params[:id]
  end

  private
  def work_params
    params.required(:work).permit(:title, :material, :image, :artist_id)
  end
end
