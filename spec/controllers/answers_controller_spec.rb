require 'rails_helper'

RSpec.describe AnswersController, type: :controller do
	include Devise::Test::ControllerHelpers

	describe "show" do
		before(:each) do
			FactoryGirl.create(:answer)
		end

		it "returns a answer" do
			get :show, params: { question_id: 1,id: 1 }
			parsed_response = JSON.parse(response.body)
			expect(parsed_response.length).to eq(1)
		end

		it "returns an answer" do
			get :show, params: { question_id: 1, id: 1 }
			parsed_response = JSON.parse(response.body)
			expect(parsed_response.length).to eq(1)
		end
	end

	describe "create" do
		let(:answer_attributes) { FactoryGirl.attributes_for :answer }
		let(:user) { FactoryGirl.create(:user)}
		let(:question) { FactoryGirl.create(:question)}

		context "when logged in" do

			before(:each) do
				sign_in user
				post :create, params: {question_id: question.id, answer: answer_attributes}
				@parsed_response = JSON.parse(response.body)
			end

			it "returns a answer" do
				expect(Answer.count).to eq(1)
			end

			it "when is valid id" do
				 expect(@parsed_response.key?('id')).to be(true)
			end

			it "when is valid user_id" do
				expect(@parsed_response['user_id']).to eq(user[:id])
			end

			it "when is valid question_id" do
				expect(@parsed_response['question_id']).to eq(question[:id])
			end

			it "when is valid answer" do
				expect(@parsed_response['answer']).to eq(answer_attributes[:answer])
			end
		end

		context "when is not logged in" do
			before(:each) do
				post :create, params: {question_id: question.id, answer: answer_attributes}
				@parsed_response = JSON.parse(response.body)
			end

			it "returns 0 answers" do
				expect(Answer.count).to eq(0)
			end

			it "returns 401 not created answer" do
				is_expected.to respond_with 401 
			end
		end
	end
end
