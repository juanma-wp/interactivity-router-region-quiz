<?php
// This file is generated. Do not modify it manually.
return array(
	'quiz' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'block-development-examples/interactivity-router-region-quiz',
		'version' => '0.1.0',
		'title' => 'Interactivity Router Region Quiz',
		'category' => 'widgets',
		'icon' => 'media-interactive',
		'description' => 'Interactive quiz example using the Interactivity Router API',
		'example' => array(
			
		),
		'keywords' => array(
			'quiz',
			'router',
			'region',
			'interactivity-api'
		),
		'attributes' => array(
			'timeLimit' => array(
				'type' => 'number',
				'default' => 0
			)
		),
		'supports' => array(
			'interactivity' => true
		),
		'textdomain' => 'block-development-examples',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScriptModule' => 'file:./view.js'
	)
);
