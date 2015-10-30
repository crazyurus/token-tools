<?php
namespace Tools\Controller;
use Think\Controller;

class DWZController extends CommonController {

	protected $model;

	function _initialize() {
        $this->model = M('shorturl');
    }

	public function index() {
		$this->display();
	}

	public function api() {
		$this->display();
	}

	public function add() {
		$origin_url = I('post.url');
		$title = I('post.title', '');
		if(preg_match('/^[a-zA-z]+:\/\/[^\s]*$/', $origin_url)) {
			$short_url = short_url($origin_url);
			try {
				$record = $this->model;
				$record->create();
				$record->origin_url = $origin_url;
				$record->short_url = $short_url;
				$record->user_ip = get_client_ip();
				$record->title = $title;
				$record->add();
			} catch(\Exception $e) {	

			}
			$this->ajaxSuccess($short_url);
		}
		else $this->ajaxError('Url的格式不正确，请检查是否含有http协议部分。');
	}

    public function url() {
    	$short_url = I('path.0');
    	if(preg_match('/^[A-Za-z0-9]{6}$/', $short_url)) {
    		$origin_url = $this->model->field('origin_url')->where("short_url='%s'", $short_url)->find()['origin_url'];
    		if(!empty($origin_url)) redirect($origin_url);
    		else $this->error('该短网址链接已经失效');
    	}
    	else $this->error('无效的短网址链接');
    }
}