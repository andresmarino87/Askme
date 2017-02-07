require 'rails_helper'

RSpec.describe QuestionsController, type: :controller do
	include Devise::Test::ControllerHelpers

	describe "index, show" do
		before(:each) do
			FactoryGirl.create_list(:answer, 5)
		end

		it "returns a successful 200 response" do
    		get :index, format: :json
    		expect(response).to be_success
    	end

		it "returns all the questions" do
    		get :index, format: :json
    		parsed_response = JSON.parse(response.body)
    		expect(parsed_response.length).to eq(5)
	    end

		it "returns a question" do
			get :show, params: { id: 1 }
			parsed_response = JSON.parse(response.body)
    		expect(parsed_response.length).to eq(1)
		end

		it "returns all answers in question" do
			get :show, params: { id: 1 }
			parsed_response = JSON.parse(response.body)
    		expect(parsed_response[0]['answers'].length).to eq(1)
		end


	end

	describe "create" do
		let(:question_attributes) { FactoryGirl.attributes_for :question }
		let(:user) { FactoryGirl.create(:user)}

		context "when logged in" do

			before(:each) do
				sign_in user
				post :create, params: {question: question_attributes}
				@parsed_response = JSON.parse(response.body)
			end

			it "returns a question" do
	    		expect(Question.count).to eq(1)
			end

			it "returns 201 create questions" do
	    		is_expected.to respond_with 201 
			end


			it "when is valid id" do
				 expect(@parsed_response.key?('id')).to be(true)
			end

			it "when is valid user_id" do
				expect(@parsed_response['user_id']).to eq(user[:id])
			end

			it "when is valid question" do
				expect(@parsed_response['question']).to eq(question_attributes[:question])
			end
		end

		context "when is not logged in" do
			before(:each) do
				post :create, params: {question: question_attributes}
				@parsed_response = JSON.parse(response.body)
			end

			it "returns 0 questions" do
	    		expect(Question.count).to eq(0)
			end

			it "returns 401 not created question" do
	    		is_expected.to respond_with 401 
			end

		end
	end
end
