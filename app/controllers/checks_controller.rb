class ChecksController < ApplicationController
  def index

  end

  def new

    agent = Mechanize.new
    page = agent.get("https://transit.yahoo.co.jp/")
    yahoo_form = page.form('search')
    yahoo_form.from = params[:fromstation]
    yahoo_form.to = params[:tostation]
    yahoo_form.s = '1'
    page = agent.submit(yahoo_form, yahoo_form.buttons.first)
    @kekka = []
    elements = page.at('.fare .mark')
    kekka = elements.inner_text
    @kekka << kekka.delete("円")
    @kekka << page.uri
    respond_to do |format|
      format.html
      format.json {render json: @kekka}
    end
  end

  def create
  end

  def delete
  end

  def show

    file = params[:file]
    @csv_data = CSV.read(file.path)
    respond_to do |format|
      format.html
      format.json {render json: @csv_data}
    end

  end

  def edit
  end

  def update
  end

     private
  def checks_params
    params.permit(:fromstation, :tostation,:cost)
  end
end
