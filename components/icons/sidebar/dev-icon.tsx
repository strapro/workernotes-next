import React from 'react';

import { Svg } from '../../styles/svg';

export const DevIcon = () => {
	return (
		<Svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			css={{
				'& path': {
					fill: '$accents6',
				},
			}}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8.70047 15.9L4.80047 12L8.70047 8.09997C9.09047 7.70997 9.09047 7.08997 8.70047 6.69997C8.31047 6.30997 7.69047 6.30997 7.30047 6.69997L2.71047 11.29C2.32047 11.68 2.32047 12.31 2.71047 12.7L7.30047 17.3C7.69047 17.69 8.31047 17.69 8.70047 17.3C9.09047 16.91 9.09047 16.29 8.70047 15.9V15.9ZM15.3005 15.9L19.2005 12L15.3005 8.09997C14.9105 7.70997 14.9105 7.08997 15.3005 6.69997C15.6905 6.30997 16.3105 6.30997 16.7005 6.69997L21.2905 11.29C21.6805 11.68 21.6805 12.31 21.2905 12.7L16.7005 17.3C16.3105 17.69 15.6905 17.69 15.3005 17.3C14.9105 16.91 14.9105 16.29 15.3005 15.9V15.9Z"
				fill="#969696"
			/>
		</Svg>
	);
};
