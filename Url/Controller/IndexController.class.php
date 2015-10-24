<?php
namespace Url\Controller;
use Think\Controller;

class IndexController extends Controller {
    public function index() {
        dump(I('path.0'));
    }
}