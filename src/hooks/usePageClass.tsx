import { useMemo } from 'react';

export default function usePageClass(path: string) {
	return useMemo(() => {
		switch (path) {
			case '/about':
				return 'bg-[var(--background-blue-grey)]';
			case '/skillset':
				return 'bg-[var(--background-orange)]';
			case '/projects':
				return 'bg-[var(--background-wine)]';
			case '/contact':
				return 'bg-[var(--background-brown)]';
			default:
				return '';
		}
	}, [path]);
}
