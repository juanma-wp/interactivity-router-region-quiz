<?php
/**
 * Utility functions for the quiz block
 *
 * @package block-development-examples
 */

/**
 * Get random items from an array
 * PHP equivalent of JavaScript's getRandomItems
 *
 * @param array $array The source array
 * @param int $count Number of items to return
 * @return array Random selection of items
 */
function get_random_items( $array, $count ) {
	$copy = $array;
	shuffle( $copy );
	return array_slice( $copy, 0, min( $count, count( $copy ) ) );
}