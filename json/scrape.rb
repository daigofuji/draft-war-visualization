require 'rubygems'
require 'nokogiri'
require 'httparty'

require 'pp'
require 'ap'


class HtmlParserIncluded < HTTParty::Parser
  def html
    Nokogiri::HTML(body).xpath("//table['stats_table']/tbody/tr").collect do |row|
      {
        'year' => row.at("td[1]").text.strip,
        'round' => row.at("td[2]").text.strip,
        'draft_type' => row.at("td[3]").text.strip,
        'overall_pick' => row.at("td[4]").text.strip,
        'round_pick' => row.at("td[6]").text.strip,
        'team' => row.at("td[7]").text.strip,
        'name' => row.at("td[8]").text.strip,
        'pos' => row.at("td[9]").text.strip,
        'war' => row.at("td[10]").text.strip,
        'g_as_pitcher' => row.at("td[11]").text.strip,
        'ab' => row.at("td[12]").text.strip,
        'hr' => row.at("td[13]").text.strip,
        'ba' => row.at("td[14]").text.strip,
        'ops' => row.at("td[15]").text.strip,
        'g_as_batter' => row.at("td[16]").text.strip,
        'w' => row.at("td[17]").text.strip,
        'l' => row.at("td[18]").text.strip,
        'era' => row.at("td[19]").text.strip,
        'whip' => row.at("td[20]").text.strip,
        'sv' => row.at("td[21]").text.strip,
        'type' => row.at("td[22]").text.strip,
        'drafted_out_of' => row.at("td[23]").text.strip,
      }
    end
  end
end

class Page
  include HTTParty
  parser HtmlParserIncluded
end

# (1999..2014).each do |year|
#   (1..10).each do |round|
#     sleep rand(1..2)
#     open("data/#{year}_mlb_draft_round_#{round}.json", 'w') do |f|
#       f.puts JSON.pretty_generate(Page.get("http://www.baseball-reference.com/draft/?query_type=year_round&year_ID=#{year}&draft_round=#{round}&draft_type=junreg&"))
#     end
#   end
# end

data = []

open("data/mlb_draft_rounds.json", 'w') do |f|
  (1999..2015).each do |year|
    (1..10).each do |round|
      sleep rand(1..2)

      data << Page.get("http://www.baseball-reference.com/draft/?query_type=year_round&year_ID=#{year}&draft_round=#{round}&draft_type=junreg&")
    end
  end
  f.puts JSON.pretty_generate(data.flatten)
end
