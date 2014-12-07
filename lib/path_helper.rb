module PathHelper

  def self.add_path(response, domain)

    #puts response

    domain = domain[0..domain.index('/',7)-1]
    puts domain

    response = response.gsub(/href="\//, "href=\"#{domain}/")
    response = response.gsub(/href='\//, "href='#{domain}/")
    response = response.gsub(/src="\//, "src=\"#{domain}/")
    response = response.gsub(/src='\//, "src='#{domain}/")
    response = response.gsub(/url\("\//, "url(\"#{domain}/")


    # src="/Contnet"
    #

    response
  end

end