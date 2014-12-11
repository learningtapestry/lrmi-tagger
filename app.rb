require 'sinatra/base'
require 'sinatra'
require 'json'

class MyApp < Sinatra::Base
  enable :sessions
  set :session_secret, 'app00key00change'

  configure do
    set :app_file, __FILE__
  end

  configure :development do
    enable :logging, :dump_errors, :raise_errors
  end

  configure :qa do
    enable :logging, :dump_errors, :raise_errors
  end

  configure :production do
    set :raise_errors, false #false will show nicer error page
    set :show_exceptions, false #true will ignore raise_errors and display backtrace in browser
  end

  helpers do
    def h(text)
      Rack::Utils.escape_html(text)
    end
  end

  get '/' do
    erb :index
  end

  post '/rdfa' do
    erb :rdfa
  end

  post '/lr' do
    erb :lr
  end
end
