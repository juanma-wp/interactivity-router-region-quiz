/**
 * WordPress Dependencies
 */
import { InnerBlocks, useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Edit = ( { attributes, setAttributes } ) => {
	const { timeLimit } = attributes;
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Quiz Settings', 'block-development-examples' ) }>
					<RangeControl
						label={ __( 'Time Limit (minutes)', 'block-development-examples' ) }
						value={ timeLimit }
						onChange={ ( value ) => setAttributes( { timeLimit: value } ) }
						min={ 1 }
						max={ 60 }
						help={ __( 'Set the time limit for completing the quiz in minutes.', 'block-development-examples' ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<InnerBlocks />
			</div>
		</>
	);
};
export default Edit;
