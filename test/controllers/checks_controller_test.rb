require 'test_helper'

class ChecksControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get checks_index_url
    assert_response :success
  end

  test "should get new" do
    get checks_new_url
    assert_response :success
  end

  test "should get create" do
    get checks_create_url
    assert_response :success
  end

  test "should get delete" do
    get checks_delete_url
    assert_response :success
  end

  test "should get show" do
    get checks_show_url
    assert_response :success
  end

  test "should get edit" do
    get checks_edit_url
    assert_response :success
  end

  test "should get update" do
    get checks_update_url
    assert_response :success
  end

end
