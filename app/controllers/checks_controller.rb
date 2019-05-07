class ChecksController < ApplicationController
  def index


  end

  def new

    agent = Mechanize.new
    page = agent.get("https://transit.yahoo.co.jp/search/result?flatlon=&fromgid=&from=#{checks_params[:fromstation]}$tlatlon=&togid=&to=#{checks_params[:tostation]}&viacode=&via=&viacode=&via=&viacode=&via=&y=2019&m=03&d=21&hh=20&m2=6&m1=1&type=1&ticket=ic&expkind=1&ws=3&s=1&al=1&shin=1&ex=1&hb=1&lb=1&sr=1&kw=#{checks_params[:tostation]}")
    elements = page.at('.fare .mark')
    @kekka = elements.inner_text
    @kekka =@kekka.delete("円")
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
