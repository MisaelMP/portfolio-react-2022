import { ContainerProps } from '../../../ts/interfaces/container.interfaces';
import { useLocation } from 'react-router-dom';
import usePageClass from '../../../hooks/usePageClass';

const Container = ({ children }: ContainerProps) => {
	const location = useLocation();
	const pageClass = usePageClass(location.pathname);

	return (
		<div className={`flex justify-center items-center p-4 md:px-16 md:pt-8 h-full w-full ${pageClass} `}>
			{children}
		</div>
	);
};

export default Container;
