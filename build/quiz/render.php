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

?>
<div
	<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
	data-wp-interactive="interactivity-router-region-quiz"
	data-wp-watch="callbacks.log"
>
	<template data-wp-each="state.randomQuestionSlugs">
		<a data-wp-on--click="actions.navigate" data-wp-bind--href="context.item" data-wp-text="context.item"></a>
	</template>
	
	<div class="quiz-content">	
		<?php echo wp_kses_post( $content ); ?>
	</div>

	
	
</div>
