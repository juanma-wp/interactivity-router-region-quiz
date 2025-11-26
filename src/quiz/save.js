/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';


const Save = ({ attributes} ) => {
	const blockProps = useBlockProps.save({
		"data-wp-context": '{"remainingTime":' + attributes.timeLimit + '}',
	});
	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
};
export default Save;
