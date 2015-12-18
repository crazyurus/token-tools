<?php
namespace Tools\Controller;
use Think\Controller;

class MarkdownController extends CommonController {

	public function index() {
		$this->display();
	}

	public function _empty($hash) {
		$this->assign('hash', $hash);
		$this->display('markdown');
	}

	public function editor() {
		$this->display();
	}

	public function save() {
		$data = $_POST['data'];
		if(empty($data)) exit;
		$hash = md5($data);
		file_put_contents('MarkDown/'.$hash.'.md', $data);
		echo $hash;
	}
}