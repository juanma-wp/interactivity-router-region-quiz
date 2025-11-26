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

$question_slugs = array(
	'https://streams.wp.local/question-1',
	'https://streams.wp.local/question-2',
	'https://streams.wp.local/question-3',
	'https://streams.wp.local/question-4',
);

if ( ! function_exists( 'get_random_items' ) ) {
	function get_random_items( $array, $count ) {
		$copy = $array;
		shuffle( $copy );
		return array_slice( $copy, 0, min( $count, count( $copy ) ) );
	}
}
$random_question_slugs = get_random_items( $question_slugs, 2 );
$time_limit            = $attributes['timeLimit'];

error_log( print_r( $attributes, true ) );

// Make randomQuestionSlugs available to JS state as in view.js registration (see view.js line 13)
wp_interactivity_state(
	'interactivity-router-region-quiz',
	array(
		'randomQuestionSlugs' => $random_question_slugs,
	),
);

$context = array( 'timeLimit' => $time_limit );

?>

<div
	<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
	data-wp-interactive="interactivity-router-region-quiz"
>
	<div 
		data-wp-interactive="interactivity-router-region-quiz"
		data-wp-router-region="region-example-interactivity-router-region-quiz"
		data-wp-watch---initQuestion="callbacks.initQuestion"
		<?php echo wp_kses_data( wp_interactivity_data_wp_context( $context ) ); ?>
	>	
		<div>
			<?php echo wp_kses_post( $content ); ?>
		</div>
		<hr>
		<p>Time limit: <span data-wp-text="context.timeLimit"></span></p>
	</div>
	<!-- <button data-wp-on--click="actions.log">Log</button> -->
	
	<template data-wp-each="state.randomQuestionSlugs">
		<a data-wp-on--click="actions.navigate" data-wp-bind--href="context.item" data-wp-text="context.item"></a>
	</template>
	

</div>
