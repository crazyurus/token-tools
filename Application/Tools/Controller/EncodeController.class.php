<?php
namespace Tools\Controller;
use Think\Controller;

class EncodeController extends CommonController {

	public function index() {
		$this->display();
	}

	public function hash() {
		$text = I('post.text');
		$hash = strtolower(I('post.hash'));
		$return = '';
		if(empty($text)) $this->ajaxError('请输入需要计算的文本值');
		else {
			if(in_array($hash, hash_algos())) $this->ajaxSuccess(hash($hash, $text));
			else $this->ajaxError("无效的哈希函数！");
		}
	}

	public function image($url) {
		ob_clean();
		header('Content-type: image/'.end(explode('.', $url)));
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_REFERER, "Token Tools");
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
        curl_exec($ch);
        curl_close($ch);
	}
}