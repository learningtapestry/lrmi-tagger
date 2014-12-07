require 'sinatra/base'
require 'sinatra/reloader' 
require 'json'

class MyApp < Sinatra::Base
  #enable :method_override
  enable :sessions
  set :session_secret, 'app00key00change'

  configure do
    set :app_file, __FILE__
    register Sinatra::Reloader
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

  get '/' do
    erb :index
  end

end
