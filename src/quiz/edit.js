/**
 * WordPress Dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const MY_TEMPLATE = [
	[ 'block-development-examples/interactivity-router-region-question' ],
];

const Edit = () => {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<InnerBlocks template={ MY_TEMPLATE } />
		</div>
	);
};
export default Edit;
