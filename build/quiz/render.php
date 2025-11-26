<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 * @package block-development-examples
 */

$time_limit = $attributes['timeLimit'];
wp_interactivity_state(
	'interactivity-router-region-quiz',
	array(
		'timeLimit' => $time_limit,
	)
);
?>
<div
	<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
	data-wp-interactive="interactivity-router-region-quiz"
	data-wp-watch---log="callbacks.log"
	data-wp-watch---initQuestion="callbacks.initQuestion"
>
	<div 
		data-wp-interactive="interactivity-router-region-quiz"
		data-wp-router-region="region-example-interactivity-router-region-quiz"
	>	
		<?php echo wp_kses_post( $content ); ?>
	</div>
	<hr>
	<p>Time limit: <span data-wp-text="state.timeLimit"></span></p>
	<p>Remaining Time: <span data-wp-text="context.remainingTime"></span></p>
	<template data-wp-each="state.randomQuestionSlugs">
		<a data-wp-on--click="actions.navigate" data-wp-bind--href="context.item" data-wp-text="context.item"></a>
	</template>
	

</div>
