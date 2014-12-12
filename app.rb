require 'sinatra/base'
require 'sinatra'
require 'json'
require './lib/learning_registry_client'
require 'erb'

class MyApp < Sinatra::Base
  enable :sessions
  set :session_secret, 'app00key00change'

  @@lr_client = nil

  configure do
    set :app_file, __FILE__

    if File.exists?('./config/learning_registry.yml')
      @@lr_client = LearningRegistryClient.new
    else
      raise 'File does not exist:  config/learning_registry.yml.  Please copy config/learning_registry-sample.yml to config/learning_registry.yml and add the configuration values.'
    end
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

    ## Helper function to determine if parameter exists and is not empty from form POST
    def param_exists?(param_name)
      params[param_name] and not params[param_name].empty? ? true : false
    end

    ## Helper function to determine if parameter exists and is not empty from form POST
    def select_param?(param_name, value)
      puts session[param_name]
      session[param_name] and session[param_name].include? value ? ' SELECTED ' : ''
    end
  end

  get '/' do
    session.clear if params[:clear] == 'true'
    erb :index
  end

  post '/' do
    erb :index
  end

  post '/rdfa' do
    erb :rdfa
  end

  post '/learning_registry' do
    lr_msg = erb :_lrenvelope_template
    result = @@lr_client.publish lr_msg

    lr_message = 'Unsuccessful publish into the Learning Registry.  Please contact your system administrator or email <a href="mailto:learningregistry@lrmitagger.org">learningregistry@lrmitagger.org</a>.'
    if result.code == '200' then
      body = JSON.parse(result.body)
      if body['OK'] then
        doc_id = body['document_results'][0]['doc_ID']
        lr_message = "Published successfully into the Learning Registry. <a href='#{@@lr_client.obtain_url(doc_id)}' target='_new'>Click here to view the record.</a>"
      end
    end

    erb :learning_registry, :locals => { :lr_message => lr_message }
  end

end
