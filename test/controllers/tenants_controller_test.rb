# frozen_string_literal: true

require 'test_helper'

class TenantsControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get tenants_index_url
    assert_response :success
  end

  test 'should get show' do
    get tenants_show_url
    assert_response :success
  end

  test 'should get create' do
    get tenants_create_url
    assert_response :success
  end

  test 'should get destroy' do
    get tenants_destroy_url
    assert_response :success
  end

  test 'should get new' do
    get tenants_new_url
    assert_response :success
  end
end
