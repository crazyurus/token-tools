<?php
namespace Tools\Controller;
use Think\Controller;

class DWZController extends Controller {

	public function index() {
		$this->display();
	}

	public function add() {
		$origin_url = I('post.url');
		$title = I('post.title', '')
		dump($origin_url);
		if(preg_match('/^[a-zA-z]+://[^\s]*$/', $origin_url)) {
			$info = array(
				'origin_url' => $origin_url,
				'short_url' => short_url($origin_url),
				'user_ip' => get_client_ip(),
				'title' => $title
			);
			M('shorturl')
		}
		else $this->error('无效的网址，请检查Url格式');
	}

    public function url() {
    	$short_url = I('path.0');
    	if(preg_match('/^[A-Za-z0-9]{6}$/', $short_url)) {
    		$origin_url = M('shorturl')->field('origin_url')->where("short_url='%s'", $short_url)->find()['origin_url'];
    		if(!empty($origin_url)) redirect($origin_url);
    		else $this->error('该短网址链接已经失效');
    	}
    	else $this->error('无效的短网址链接');
    }
}