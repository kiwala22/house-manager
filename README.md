## House-manager  
The setups steps expect following tools installed on the system.

 - Git
 - Ruby [3.2.2](https://www.ruby-lang.org/en/news/2023/03/30/ruby-3-2-2-released/)
 - Rails [7.0.4.3](https://rubygems.org/gems/rails/versions/7.0.4.3)

1. #### Check out the repository(clone)

       https://github.com/kiwala22/house-manager.git

2. #### Install dependencies with the command below
	-using [bundler](https://bundler.io/guides/getting_started.html) and [yarn](https://github.com/yarnpkg/yarn)

       bundle && yarn

4. #### Initialize  the database
       rails db:create db:migrate db:seed
         
 4. #### Start the server
        bin/dev
       And now you can visit the site with the URL [http//localhost:3000](http//localhost:3000)
