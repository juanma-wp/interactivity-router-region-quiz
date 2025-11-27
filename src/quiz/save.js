/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';


const Save = ({ attributes } ) => {
  const blockProps = useBlockProps.save()
  console.log( blockProps );
	return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
};
export default Save;
