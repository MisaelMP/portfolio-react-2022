// App.tsx
import React, { useState, useCallback } from 'react';
import Layout from './Layout';
import Stage from './Stage';

const TypoLandPage: React.FC = () => {
	const [layout, setLayout] = useState({ W: 0, H: 0 });

	const onResize = useCallback(({ W, H }) => {
		setLayout({ W, H });
	}, []);

	return (
		<div>
			<Layout onResize={onResize} />
			<Stage layout={layout} />
		</div>
	);
};

export default TypoLandPage;
