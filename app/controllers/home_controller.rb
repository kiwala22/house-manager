class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    # this will be the index page to retrieve data
    # TODO: e_e remove this comment
  end
end
