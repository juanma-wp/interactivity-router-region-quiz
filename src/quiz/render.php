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
	'question-1',
	'question-2',
	'question-3',
	'question-4',
);

if ( ! function_exists( 'get_random_items' ) ) {
	function get_random_items( $array, $count ) {
		$copy = $array;
		shuffle( $copy );
		return array_slice( $copy, 0, min( $count, count( $copy ) ) );
	}
}
$random_slugs = get_random_items( $question_slugs, 2 );

// Build full URLs from the random slugs
$random_question_slugs = array_map(
	function ( $slug ) {
		return home_url( '/' . $slug );
	},
	$random_slugs
);
$time_limit            = $attributes['timeLimit'];

// Default state for all pages
$state = array(
	'randomQuestionSlugs' => $random_question_slugs,
	'defaultField'        => 'default value',
);

$current_url  = home_url( $_SERVER['REQUEST_URI'] );
$current_slug = trim( parse_url( $current_url, PHP_URL_PATH ), '/' );

// Make state available to JS
wp_interactivity_state(
	'interactivity-router-region-quiz',
	$state
);

$context = array(
	'timeLimit'   => $time_limit,
	'currentSlug' => $current_slug,
);

// Add slug-specific properties
if ( $current_slug === 'question-1' ) {
	error_log( '🔴 current_slug is question-1' );
	$context['newField1'] = 'new field';
	$context['extraData'] = 'question 1 data';
} elseif ( $current_slug === 'question-2' ) {
	$context['customField2'] = 'question 2 specific';
} elseif ( $current_slug === 'question-3' ) {
	$context['customField3'] = 'question 3 specific';
} elseif ( $current_slug === 'question-4' ) {
	$context['customField4'] = 'question 4 specific';

?>

<div
	<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
	data-wp-interactive="interactivity-router-region-quiz"
>
	<div
		data-wp-interactive="interactivity-router-region-quiz"
		data-wp-router-region="region-example-interactivity-router-region-quiz"
		data-wp-watch---initQuestion="callbacks.initQuestion"
		data-wp-watch---log="callbacks.log"
		data-wp-watch--startTimer="callbacks.startTimer"
		<?php echo wp_kses_data( wp_interactivity_data_wp_context( $context ) ); ?>
	>	
		<div>
			<?php echo wp_kses_post( $content ); ?>
		</div>
		<hr>
		<div>
			<p data-wp-text="state.timerText"></p>
		</div>
	</div>
	<!-- <button data-wp-on--click="actions.log">Log</button> -->
	
	<template data-wp-each="state.randomQuestionSlugs">
		<a 
		data-wp-on--click="actions.navigate" 
		data-wp-bind--href="state.questionHref" 
		data-wp-text="state.itemSlug"
		data-wp-class--is-visited="state.questionIsVisited"
		></a>
	</template>
	
	<p>
		<a href="<?php echo home_url( '/quiz' ); ?>">Reset Quiz</a>
	</p>
</div>
