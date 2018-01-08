client = Twitter::REST::Client.new do |config|
  config.consumer_key        = "TODO: get and add to secret"
  config.consumer_secret     = "TODO: get and add to secret"
  config.access_token        = "TODO: get and add to secret"
  config.access_token_secret = "TODO: get and add to secret"
end

namespace :twitter do

  desc "clear all users and tweets from db"
  task :clear => :environment do
    User.destroy_all
    Tweet.destroy_all
    Rake::Task["twitter:stats"].invoke
  end

  task :stats => :environment do
    puts "Users: #{User.count}"
    puts "Tweets: #{Tweet.count}"
  end

  desc "populates with fake data"
  task :populate, [:user_count] => :environment do |t, args|
    args[:user_count].to_i.times do
      user = User.create :email => Faker::Internet.email
      rand(1..50).times do
        user.tweets.create :content => Faker::Lovecraft.sentence
      end
    end
    Rake::Task['twitter:stats'].invoke
  end

  desc 'populates the tweet table with real live data from twitter'
  task :search, [:query, :count] => :environment do |t, args|
    Tweet.destroy_all
    client.search("#{args[:query]} -rt", {result_type: "recent", lang: "en"}).take(args[:count].to_i).collect do |tweet|
      Tweet.create :content => tweet.text
    end
    p "Tweets: #{Tweet.count}"
  end

  # task :text, [:query] => :environment do |t, args|
  #   client.search("#{args[:query]} -rt", {result_type: "recent", lang: "en"}).take(5).collect do |tweet|
  #     p tweet.text
  #   end
  # end

end
