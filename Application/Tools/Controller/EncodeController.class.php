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
}