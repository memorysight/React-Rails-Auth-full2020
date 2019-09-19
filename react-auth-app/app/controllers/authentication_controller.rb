class AuthenticationController < ApplicationController

    def login
        handle_login(params[:username], params[:password])
    end
end