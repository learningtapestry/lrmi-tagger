require 'yaml'
require 'oauth'

class LearningRegistryClient

  VERIFY_URL = '/auth/oauth_verify'
  PUBLISH_URL = '/publish'
  OBTAIN_URL = '/obtain'

  def initialize
    config = YAML.load_file('./config/learning_registry.yml')
    @publish_location = config['publish_location']
    consumer_key = config['consumer_key']
    consumer_secret = config['consumer_secret']
    token_key = config['token_key']
    token_secret = config['token_secret']

    @consumer=OAuth::Consumer.new consumer_key, consumer_secret, { site: @publish_location }
    @access_token = OAuth::AccessToken.new(@consumer, token_key, token_secret)

  end

  def check_credentials
    @access_token.post("#{VERIFY_URL}", '', {'Content-Type' => 'application/json'})
  end

  def publish(payload)
    if check_credentials.code == '200' then
      @access_token.post("#{PUBLISH_URL}", payload, {'Content-Type' => 'application/json'})
    else
      raise 'Learning Registry credentials did not verify before publish.  Please check learning_registry.yml configuration values.'
    end
  end

  def obtain(doc_id)
    @access_token.get("#{OBTAIN_URL}?by_doc_ID=true&request_ID=#{doc_id}")
  end

  def obtain_url(doc_id)
    "#{@publish_location}#{OBTAIN_URL}?by_doc_ID=true&request_ID=#{doc_id}"
  end

end